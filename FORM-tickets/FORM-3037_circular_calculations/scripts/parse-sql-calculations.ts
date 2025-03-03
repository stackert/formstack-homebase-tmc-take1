import * as fs from "fs";
import * as path from "path";

interface FormField {
  id: number;
  form: number;
  label: string;
  type: string;
  calculation: string;
  field_one_calculation: string | null;
  field_two_calculation: string | null;
  calculation_units: string | null;
  calculation_operator: string | null;
  calculation_type: string | null;
  props_string: string | null;
}

interface OutputField {
  fieldType: string;
  labelText: string;
  calculation: string;
  field_one_calculation: string | null;
  field_two_calculation: string | null;
  calculation_units: string | null;
  calculation_operator: string | null;
  calculation_type: string | null;
}

interface OutputFormat {
  [key: string]: OutputField;
}

function parseAttributes(attributesStr: string): any {
  try {
    // Handle numeric props string (special case)
    if (/^\d+$/.test(attributesStr)) {
      return {};
    }

    // Remove escaped quotes and clean up the string
    const cleanStr = attributesStr.replace(/\\"/g, '"');
    const result: any = {};

    // Extract field IDs and other attributes using regex
    const matches = {
      field_one_calculation: cleanStr.match(
        /field_one_calculation";[si]:\d+:"?(\d+)"?/
      ),
      field_two_calculation: cleanStr.match(
        /field_two_calculation";[si]:\d+:"?(\d+)"?/
      ),
      calculation_units: cleanStr.match(/calculation_units";s:\d+:"([^"]+)"/),
      calculation_operator: cleanStr.match(
        /calculation_operator";s:\d+:"([^"]+)"/
      ),
      calculation_type: cleanStr.match(/calculation_type";s:\d+:"([^"]+)"/),
    };

    // Extract values from matches
    if (matches.field_one_calculation) {
      result.field_one_calculation = matches.field_one_calculation[1];
    }
    if (matches.field_two_calculation) {
      result.field_two_calculation = matches.field_two_calculation[1];
    }
    if (matches.calculation_units) {
      result.calculation_units = matches.calculation_units[1];
    }
    if (matches.calculation_operator) {
      result.calculation_operator = matches.calculation_operator[1];
    }
    if (matches.calculation_type) {
      result.calculation_type = matches.calculation_type[1];
    }

    return result;
  } catch (e) {
    console.error("Error parsing attributes:", e);
    return {};
  }
}

function isDateCalculation(field: FormField): boolean {
  // A date calculation is any field that has field calculations
  return (
    field.field_one_calculation !== null || field.field_two_calculation !== null
  );
}

function isValidCalculation(calculation: string): boolean {
  if (!calculation) return false;
  if (calculation.trim() === "") return false;
  if (calculation === "NULL") return false;
  if (calculation === "undefined") return false;

  // Skip PHP serialized arrays
  if (
    calculation.startsWith("a:") ||
    calculation.includes('";s:') ||
    calculation.includes("s:")
  ) {
    return false;
  }

  // Skip obvious PHP serialized array content
  if (
    calculation.includes("label") &&
    calculation.includes("value") &&
    calculation.includes("imageUrl")
  ) {
    return false;
  }

  // Skip simple text values that aren't calculations
  if (["Yes", "No", "I Opt Out", "NOW", "360", "8"].includes(calculation)) {
    return false;
  }

  // It's valid if it:
  // 1. Contains field references [...]
  // 2. Contains mathematical operators
  const hasFieldRefs = calculation.includes("[");
  const hasMathOps = /[\+\-\*\/]/.test(calculation);

  return hasFieldRefs || hasMathOps;
}

function extractCalculationInfo(sqlValues: string): FormField {
  const values = sqlValues.split(",").map((v) => v.trim());

  // Extract base values
  const id = parseInt(values[0].replace("(", ""));
  const form = parseInt(values[1]);
  const label = values[2].replace(/^'|'$/g, "");
  const type = values[6].replace(/^'|'$/g, "");
  const calculation = values[9].replace(/^'|'$/g, "");

  // Extract attributes from the props string
  const propsString = values[17].replace(/^'|'$/g, "");
  const attributes = parseAttributes(propsString);

  // Convert string IDs to numbers where needed
  const field_one_calculation = attributes.field_one_calculation
    ? parseInt(attributes.field_one_calculation)
    : null;
  const field_two_calculation = attributes.field_two_calculation
    ? parseInt(attributes.field_two_calculation)
    : null;

  return {
    id,
    form,
    label,
    type,
    calculation,
    field_one_calculation: field_one_calculation?.toString() || null,
    field_two_calculation: field_two_calculation?.toString() || null,
    calculation_units: attributes.calculation_units || null,
    calculation_operator: attributes.calculation_operator || null,
    calculation_type: attributes.calculation_type || null,
    props_string: propsString,
  };
}

function standardizeDateCalculation(field: FormField): string | null {
  if (field.field_one_calculation && field.field_two_calculation) {
    const operator = field.calculation_operator || "plus";
    const units = field.calculation_units || "Months";
    return `date_${operator}([${field.field_one_calculation}], [${field.field_two_calculation}], '${units}')`;
  }
  return field.calculation || null;
}

async function parseFormFields(): Promise<void> {
  try {
    // Read the SQL file
    const sqlContent = await fs.promises.readFile(
      path.join(__dirname, "../../goof/0001-fields-form-6097213.sql"),
      "utf8"
    );

    console.log("\nAnalyzing SQL values:");
    const fields = sqlContent
      .split("INSERT INTO")[1]
      .split("VALUES")
      .slice(1)[0]
      .split("),\n(")
      .map((values) => {
        const field = extractCalculationInfo(values);

        console.log(`ID: ${field.id}`);
        console.log(`Label: ${field.label}`);
        console.log(`Type: ${field.type}`);
        console.log(`Calculation: ${field.calculation}`);
        console.log(`Field One Calc: ${field.field_one_calculation}`);
        console.log(`Field Two Calc: ${field.field_two_calculation}`);
        console.log(`Calc Units: ${field.calculation_units}`);
        console.log(`Calc Operator: ${field.calculation_operator}`);
        console.log(`Calc Type: ${field.calculation_type}`);
        console.log(`Props String: ${field.props_string}`);

        if (field.calculation && !isValidCalculation(field.calculation)) {
          console.log(`Skipping invalid calculation: ${field.calculation}`);
        }

        return field;
      });

    // Process all fields
    const calculationFields = fields
      .map((field) => {
        // If it's a date calculation, standardize it
        if (isDateCalculation(field)) {
          return {
            id: field.id,
            label: field.label,
            type: field.type,
            calculation: standardizeDateCalculation(field),
          };
        }
        // If it's a regular calculation, keep it
        else if (isValidCalculation(field.calculation)) {
          return {
            id: field.id,
            label: field.label,
            type: field.type,
            calculation: field.calculation,
          };
        }
        return null;
      })
      .filter((field) => field !== null);

    console.log("\n=== Calculation Summary ===");
    console.log(`Total fields processed: ${fields.length}`);
    const dateCalcs = calculationFields.filter((f) =>
      f.calculation?.startsWith("date_")
    );
    const formulaCalcs = calculationFields.filter(
      (f) => !f.calculation?.startsWith("date_")
    );
    console.log(`Number of date calculations: ${dateCalcs.length}`);
    console.log(`Number of formula calculations: ${formulaCalcs.length}`);
    console.log(`Total fields with calculations: ${calculationFields.length}`);

    // Create calculation object
    const calculationObject = {
      fields: calculationFields,
    };

    // Write the output to a new file
    await fs.promises.writeFile(
      path.join(__dirname, "../artifacts/form6097213.calculation.json"),
      JSON.stringify(calculationObject, null, 2),
      "utf8"
    );

    console.log("\nSuccessfully created form6097213.calculation.json");
  } catch (error) {
    console.error("Error processing form fields:", error);
  }
}

// Run the parser
parseFormFields();
