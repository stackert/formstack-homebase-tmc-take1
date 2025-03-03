import * as fs from "fs";
import * as path from "path";

interface FormFieldData {
  id: string;
  name: string;
  label: string;
  type: string;
  calculation: string | null;
  logic: any;
}

interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  calculation: string;
  logic: any;
}

interface CalculationDependency {
  fieldId: string;
  name: string;
  calculation: string;
  dependencies: string[]; // Array of field IDs this calculation depends on
  allDependencies: Set<string>; // All dependencies including nested ones
}

class FormCalculationAnalyzer {
  private fields: FormField[] = [];
  private calculationDependencies: Map<string, CalculationDependency> =
    new Map();
  private fieldNameMap: Map<string, string> = new Map();
  private dependencyChains: Map<string, Set<string>> = new Map(); // Tracks all dependency chains

  constructor(private jsonFilePath: string) {}

  public async analyze(): Promise<void> {
    const jsonContent = await fs.promises.readFile(this.jsonFilePath, "utf8");
    const formData = JSON.parse(jsonContent);

    if (Array.isArray(formData.fields)) {
      this.fields = formData.fields.map((field: FormFieldData) => {
        this.fieldNameMap.set(field.id, field.name);
        return {
          id: field.id,
          name: field.name,
          label: field.label,
          type: field.type,
          calculation: field.calculation || "",
          logic: field.logic,
        };
      });
    }

    this.buildCalculationDependencies();
    this.buildDependencyChains();
    this.printAnalysis();
  }

  private buildCalculationDependencies(): void {
    for (const field of this.fields) {
      if (field.calculation) {
        const dependencies = this.extractFieldReferences(field.calculation);
        this.calculationDependencies.set(field.id, {
          fieldId: field.id,
          name: field.name,
          calculation: field.calculation,
          dependencies,
          allDependencies: new Set(dependencies),
        });
      }
    }
  }

  private buildDependencyChains(): void {
    // Initialize dependency chains
    for (const [fieldId, dep] of this.calculationDependencies) {
      this.dependencyChains.set(fieldId, new Set());
      this.buildChainForField(fieldId, new Set([fieldId]));
    }
  }

  private buildChainForField(fieldId: string, visited: Set<string>): void {
    const dep = this.calculationDependencies.get(fieldId);
    if (!dep) return;

    for (const depId of dep.dependencies) {
      // Add to all dependencies
      dep.allDependencies.add(depId);

      // Check for circular reference
      if (visited.has(depId)) {
        console.log(`\n🚨 Potential circular reference detected:`);
        console.log(
          `Field ${fieldId} (${this.fieldNameMap.get(
            fieldId
          )}) depends on ${depId} (${this.fieldNameMap.get(depId)})`
        );
        console.log(
          `Current chain: ${Array.from(visited)
            .map((id) => `${id} (${this.fieldNameMap.get(id)})`)
            .join(" -> ")}`
        );
        continue;
      }

      // Add to dependency chain
      const chain = this.dependencyChains.get(fieldId);
      if (chain) {
        chain.add(depId);
      }

      // Recursively build chain
      const newVisited = new Set(visited);
      newVisited.add(depId);
      this.buildChainForField(depId, newVisited);

      // Add nested dependencies
      const nestedDep = this.calculationDependencies.get(depId);
      if (nestedDep) {
        for (const nestedId of nestedDep.allDependencies) {
          dep.allDependencies.add(nestedId);
        }
      }
    }
  }

  private extractFieldReferences(calculation: string): string[] {
    const fieldRefs = new Set<string>();
    const fieldRefRegex = /\[(\d+)\]/g;
    let match;

    while ((match = fieldRefRegex.exec(calculation)) !== null) {
      fieldRefs.add(match[1]);
    }

    return Array.from(fieldRefs);
  }

  private printAnalysis(): void {
    console.log("\n=== Form Calculation Analysis ===\n");

    // Print all fields with calculations and their dependencies
    console.log("Fields with Calculations:");
    for (const [fieldId, dep] of this.calculationDependencies) {
      console.log(`\nField ID: ${fieldId}`);
      console.log(`Name: ${dep.name}`);
      console.log(`Calculation: ${dep.calculation}`);

      // Direct dependencies
      console.log(
        `Direct Dependencies: ${
          dep.dependencies
            .map(
              (id) => `${id} (${this.fieldNameMap.get(id) || "Unknown Field"})`
            )
            .join(", ") || "None"
        }`
      );

      // All nested dependencies
      console.log(
        `All Dependencies (including nested): ${
          Array.from(dep.allDependencies)
            .map(
              (id) => `${id} (${this.fieldNameMap.get(id) || "Unknown Field"})`
            )
            .join(", ") || "None"
        }`
      );

      // Check for self-reference
      if (dep.allDependencies.has(fieldId)) {
        console.log(
          `⚠️ WARNING: This field depends on itself through its calculation chain!`
        );
      }
    }

    // Print dependency chains that might indicate issues
    console.log("\n=== Complex Dependency Chains ===\n");
    for (const [fieldId, chain] of this.dependencyChains) {
      if (chain.size > 2) {
        // Show chains with more than 2 dependencies
        console.log(
          `\nField ${fieldId} (${this.fieldNameMap.get(
            fieldId
          )}) has a complex dependency chain:`
        );
        console.log(
          `Chain: ${Array.from(chain)
            .map(
              (id) => `${id} (${this.fieldNameMap.get(id) || "Unknown Field"})`
            )
            .join(" -> ")}`
        );
      }
    }

    // Check for fields that are both dependencies and dependent
    console.log("\n=== Bidirectional Dependencies ===\n");
    for (const [fieldId, dep] of this.calculationDependencies) {
      for (const depId of dep.allDependencies) {
        const otherDep = this.calculationDependencies.get(depId);
        if (otherDep && otherDep.allDependencies.has(fieldId)) {
          console.log(`\n⚠️ Bidirectional dependency found between:`);
          console.log(`- ${fieldId} (${this.fieldNameMap.get(fieldId)})`);
          console.log(`- ${depId} (${this.fieldNameMap.get(depId)})`);
        }
      }
    }
  }
}

// Usage
const analyzer = new FormCalculationAnalyzer(
  path.join(__dirname, "../artifacts/form6097356.0001.json")
);

analyzer
  .analyze()
  .then(() => console.log("\nAnalysis complete."))
  .catch((error) => console.error("Error during analysis:", error));
