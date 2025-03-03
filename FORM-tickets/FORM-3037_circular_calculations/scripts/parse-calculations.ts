import * as fs from "fs";
import * as path from "path";

interface FormField {
  id: string;
  type: string;
  label: string;
  calculation?: string;
  calculation_category?: string;
  field_one_calculation?: string;
  field_two_calculation?: string;
  calculation_units?: string;
  calculation_operator?: string;
  calculation_type?: string;
}

interface OutputField {
  fieldType: string;
  labelText: string;
  calculation: string | null;
  calculation_category: string | null;
}

interface OutputFormat {
  [key: string]: OutputField;
}

function standardizeDateCalculation(field: FormField): string | null {
  if (
    field.calculation_type === "date" &&
    field.field_one_calculation &&
    field.field_two_calculation
  ) {
    const operator = field.calculation_operator || "plus";
    const units = field.calculation_units || "Months";

    // Create a standardized date calculation string
    return `date_${operator}([${field.field_one_calculation}], [${field.field_two_calculation}], '${units}')`;
  }

  return field.calculation || null;
}

async function parseFormFields(): Promise<void> {
  try {
    // Read the source JSON file
    const jsonContent = await fs.promises.readFile(
      path.join(__dirname, "../artifacts/form6097356.0001.json"),
      "utf8"
    );
    const formData = JSON.parse(jsonContent);

    // Create the output object
    const output: OutputFormat = {};
    let totalFields = 0;
    let fieldsWithCalculations = 0;
    let dateCalculations = 0;
    let regularCalculations = 0;

    console.log("\nProcessing fields...");

    // Process each field
    if (Array.isArray(formData.fields)) {
      totalFields = formData.fields.length;
      formData.fields.forEach((field: FormField) => {
        // Debug output for each field
        console.log(`\nField ${field.id} (${field.label}):`);
        console.log(`  Type: ${field.type}`);
        console.log(`  Calculation Type: ${field.calculation_type || "none"}`);
        console.log(`  Regular Calculation: ${field.calculation || "none"}`);
        if (field.calculation_type === "date") {
          console.log(
            `  Date Field 1: ${field.field_one_calculation || "none"}`
          );
          console.log(
            `  Date Field 2: ${field.field_two_calculation || "none"}`
          );
          console.log(`  Units: ${field.calculation_units || "none"}`);
          console.log(`  Operator: ${field.calculation_operator || "none"}`);
        }

        const hasCalculation =
          (field.calculation && field.calculation.trim() !== "") ||
          (field.calculation_type === "date" &&
            field.field_one_calculation &&
            field.field_two_calculation);

        if (hasCalculation) {
          fieldsWithCalculations++;
          if (field.calculation_type === "date") {
            dateCalculations++;
            console.log("  → Counted as date calculation");
          } else {
            regularCalculations++;
            console.log("  → Counted as regular calculation");
          }
        } else {
          console.log("  → No calculation detected");
        }

        const standardizedCalculation = standardizeDateCalculation(field);
        if (standardizedCalculation) {
          console.log(
            `  → Standardized calculation: ${standardizedCalculation}`
          );
        }

        if (hasCalculation || standardizedCalculation) {
          output[`fieldId${field.id}`] = {
            fieldType: field.type,
            labelText: field.label,
            calculation: standardizedCalculation,
            calculation_category: field.calculation_category || null,
          };
        }
      });
    }

    // Write the output to a new file
    await fs.promises.writeFile(
      path.join(__dirname, "../artifacts/form6097356.calculation.json"),
      JSON.stringify(output, null, 2),
      "utf8"
    );

    console.log("\n=== Summary ===");
    console.log(`Total fields processed: ${totalFields}`);
    console.log(`Fields with calculations: ${fieldsWithCalculations}`);
    console.log(`- Regular calculations: ${regularCalculations}`);
    console.log(`- Date calculations: ${dateCalculations}`);
    console.log(`Fields in output: ${Object.keys(output).length}`);

    console.log("\nSuccessfully created form6097356.calculation.json");
  } catch (error) {
    console.error("Error processing form fields:", error);
  }
}

// Run the parser
parseFormFields();
