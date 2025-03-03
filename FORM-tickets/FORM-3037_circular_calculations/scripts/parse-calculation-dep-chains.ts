import * as fs from "fs";
import * as path from "path";

interface CalculationField {
  fieldType: string;
  labelText: string;
  calculation: string | null;
  calculation_category: string | null;
}

interface CalculationFieldWithDeps extends CalculationField {
  depChain: string[];
}

interface InputFormat {
  [key: string]: CalculationField;
}

interface OutputFormat {
  [key: string]: CalculationFieldWithDeps;
}

interface FormField {
  id: number;
  label: string;
  calculation: string;
  type: string;
}

interface DependencyInfo {
  fieldId: number;
  label: string;
  calculation: string;
  dependsOn: number[];
  isTerminal: boolean;
  circularReference: boolean;
}

interface CalculationDependencies {
  [key: number]: DependencyInfo;
}

const MAX_CHAIN_LENGTH = 100;

function formatChain(chain: string[]): string {
  return chain.join(" -> ");
}

function extractFieldIdsAndConstants(calculation: string): {
  fieldIds: number[];
  constants: number[];
} {
  const fieldIds: number[] = [];
  const constants: number[] = [];

  // Extract field IDs from [XXXXX] references
  const fieldMatches = calculation.match(/\[(\d+)\]/g);
  if (fieldMatches) {
    fieldMatches.forEach((match) => {
      const id = parseInt(match.replace(/[\[\]]/g, ""));
      if (!isNaN(id)) {
        fieldIds.push(id);
      }
    });
  }

  // Extract numeric constants
  const constantMatches = calculation.match(/(?<!\[)\b\d+(?:\.\d+)?\b(?!\])/g);
  if (constantMatches) {
    constantMatches.forEach((match) => {
      const num = parseFloat(match);
      if (!isNaN(num)) {
        constants.push(num);
      }
    });
  }

  return { fieldIds, constants };
}

function analyzeCalculationDependencies(
  fields: FormField[]
): CalculationDependencies {
  const dependencies: CalculationDependencies = {};
  const MAX_CHAIN_LENGTH = 100; // Prevent infinite loops

  // Initialize dependencies for each field
  fields.forEach((field) => {
    if (field.calculation) {
      const { fieldIds } = extractFieldIdsAndConstants(field.calculation);
      dependencies[field.id] = {
        fieldId: field.id,
        label: field.label,
        calculation: field.calculation,
        dependsOn: fieldIds,
        isTerminal: fieldIds.length === 0,
        circularReference: false,
      };
    }
  });

  // Check for circular dependencies
  Object.values(dependencies).forEach((dep) => {
    const visited = new Set<number>();
    const stack = new Set<number>();

    function checkCircular(currentId: number): boolean {
      if (stack.has(currentId)) {
        return true;
      }
      if (visited.has(currentId)) {
        return false;
      }

      visited.add(currentId);
      stack.add(currentId);

      const currentDep = dependencies[currentId];
      if (!currentDep) {
        return false;
      }

      for (const dependencyId of currentDep.dependsOn) {
        if (checkCircular(dependencyId)) {
          return true;
        }
      }

      stack.delete(currentId);
      return false;
    }

    dep.circularReference = checkCircular(dep.fieldId);
  });

  return dependencies;
}

function buildDependencyChain(
  fieldId: string,
  allFields: InputFormat,
  currentChain: string[] = [],
  processedFields: Set<string> = new Set(),
  depth: number = 0
): string[] {
  const indent = "  ".repeat(depth);
  console.log(`\n${indent}Analyzing field: ${fieldId}`);

  // Safety check for max chain length
  if (currentChain.length >= MAX_CHAIN_LENGTH) {
    console.log(`${indent}⚠️ Max chain length reached!`);
    console.log(
      `${indent}Current chain: ${formatChain([
        ...currentChain,
        `${fieldId}-max-depth-reached`,
      ])}`
    );
    return [...currentChain, `${fieldId}-max-depth-reached`];
  }

  // Check if field exists in the chain
  if (processedFields.has(fieldId)) {
    console.log(
      `${indent}🚨 Circular reference detected! Field ${fieldId} already processed`
    );
    const finalChain = [...currentChain, `${fieldId}-redundant`];
    console.log(`${indent}Dependency chain: ${formatChain(finalChain)}`);
    return finalChain;
  }

  // Add field to processed set and chain
  processedFields.add(fieldId);
  currentChain.push(fieldId);
  console.log(`${indent}Current chain: ${formatChain(currentChain)}`);

  // Get the field's calculation
  const field = allFields[`fieldId${fieldId}`];
  if (!field?.calculation) {
    const finalChain = [...currentChain, "_TERMINAL_"];
    console.log(`${indent}Field has no calculation - marking as terminal`);
    console.log(`${indent}Final chain: ${formatChain(finalChain)}`);
    return finalChain;
  }

  console.log(`${indent}Calculation: ${field.calculation}`);

  // Extract dependent field IDs
  const dependentFields = extractFieldIdsAndConstants(
    field.calculation
  ).fieldIds;
  console.log(
    `${indent}Dependencies found: ${dependentFields.join(", ") || "none"}`
  );

  // If no dependencies found, mark as terminal
  if (dependentFields.length === 0) {
    const finalChain = [...currentChain, "_TERMINAL_"];
    console.log(`${indent}No dependencies - marking as terminal`);
    console.log(`${indent}Final chain: ${formatChain(finalChain)}`);
    return finalChain;
  }

  // Process each dependent field
  for (const depFieldId of dependentFields) {
    console.log(`\n${indent}Processing dependency: ${depFieldId}`);

    // Check if this would create an immediate circular reference
    if (currentChain.includes(depFieldId.toString())) {
      console.log(`${indent}🚨 Direct circular reference detected!`);
      const finalChain = [...currentChain, `${depFieldId}-redundant`];
      console.log(`${indent}Final chain: ${formatChain(finalChain)}`);
      return finalChain;
    }

    // Check if dependent field has a calculation
    const depField = allFields[`fieldId${depFieldId}`];
    if (depField?.calculation) {
      console.log(`${indent}Dependency has calculation - recursing...`);
      // Recursively process the dependent field
      const subChain = buildDependencyChain(
        depFieldId.toString(),
        allFields,
        [...currentChain],
        new Set(processedFields),
        depth + 1
      );

      if (
        subChain[subChain.length - 1].includes("-redundant") ||
        subChain[subChain.length - 1].includes("-max-depth-reached")
      ) {
        console.log(`${indent}Circular reference found in subchain!`);
        console.log(`${indent}Final chain: ${formatChain(subChain)}`);
        return subChain;
      }
      currentChain = subChain;
    } else {
      console.log(
        `${indent}Dependency has no calculation - marking as terminal`
      );
      currentChain.push(depFieldId.toString());
      currentChain.push("_TERMINAL_");
      console.log(`${indent}Current chain: ${formatChain(currentChain)}`);
    }
  }

  console.log(
    `${indent}Final chain for ${fieldId}: ${formatChain(currentChain)}`
  );
  return currentChain;
}

async function main() {
  try {
    // Read the calculation JSON file
    const calculationJson = await fs.promises.readFile(
      path.join(__dirname, "../artifacts/form6097213.calculation.json"),
      "utf8"
    );
    const calculationData = JSON.parse(calculationJson);
    const fields = calculationData.fields;

    console.log("\n=== Starting Dependency Analysis ===\n");

    // Analyze dependencies
    const dependencies = analyzeCalculationDependencies(fields);

    // Print dependency chains
    console.log("\n=== Dependency Chains ===\n");
    Object.values(dependencies).forEach((dep: DependencyInfo) => {
      console.log(`\nField ${dep.fieldId} (${dep.label}):`);
      console.log(`Calculation: ${dep.calculation}`);
      if (dep.dependsOn.length > 0) {
        console.log("Depends on:");
        dep.dependsOn.forEach((depId: number) => {
          const depField = dependencies[depId];
          console.log(
            `  - Field ${depId}${depField ? ` (${depField.label})` : ""}`
          );
        });
      } else {
        console.log("No dependencies (terminal field)");
      }
      if (dep.circularReference) {
        console.log("⚠️ WARNING: This field is part of a circular reference");
      }
    });

    // Count circular references
    const circularRefs = Object.values(dependencies).filter(
      (dep) => dep.circularReference
    );

    console.log("\n=== Analysis Summary ===");
    console.log(`Total fields processed: ${fields.length}`);
    console.log(`Circular references found: ${circularRefs.length}`);

    // Write the dependency chain to a new file
    await fs.promises.writeFile(
      path.join(
        __dirname,
        "../artifacts/form6097213.calculation-dep-chain.json"
      ),
      JSON.stringify(dependencies, null, 2),
      "utf8"
    );

    console.log(
      "\nSuccessfully created form6097213.calculation-dep-chain.json"
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
