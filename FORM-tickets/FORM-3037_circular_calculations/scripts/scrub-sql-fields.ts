import * as fs from "fs";
import * as path from "path";

interface FormField {
  id: number;
  label: string;
  type: string;
  field_one_calculation: string | null;
  field_two_calculation: string | null;
  calculation_units: string | null;
  calculation_operator: string | null;
  calculation_type: string | null;
}

interface IssueCount {
  missingUnits: number;
  wrongCalculationType: number;
  incompleteCalculationPairs: number;
}

interface ValidationCounts {
  missingOperator: number;
  missingOperands: number;
  missingUnits: number;
  mismatchedTypes: number;
}

function parseAttributes(attributesStr: string): any {
  try {
    if (/^\d+$/.test(attributesStr)) {
      return {};
    }

    const cleanStr = attributesStr.replace(/\\"/g, '"');
    const result: any = {};

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

function extractFieldInfo(sqlValues: string): FormField {
  const values = sqlValues.split(",").map((v) => v.trim());
  const id = parseInt(values[0].replace("(", ""));
  const label = values[2].replace(/^'|'$/g, "");
  const type = values[6].replace(/^'|'$/g, "");
  const propsString = values[17].replace(/^'|'$/g, "");
  const attributes = parseAttributes(propsString);

  return {
    id,
    label,
    type,
    field_one_calculation: attributes.field_one_calculation || null,
    field_two_calculation: attributes.field_two_calculation || null,
    calculation_units: attributes.calculation_units || null,
    calculation_operator: attributes.calculation_operator || null,
    calculation_type: attributes.calculation_type || null,
  };
}

function analyzeField(field: FormField, issueCount: IssueCount) {
  // Show any field that has date calculation related attributes
  if (
    field.field_one_calculation ||
    field.field_two_calculation ||
    field.calculation_operator ||
    field.calculation_units
  ) {
    console.log(`\nField ${field.id}: ${field.label}`);
    console.log(`Type: ${field.type}`);
    console.log(`Field One: ${field.field_one_calculation || "null"}`);
    console.log(`Field Two: ${field.field_two_calculation || "null"}`);
    console.log(`Operator: ${field.calculation_operator || "null"}`);
    console.log(`Units: ${field.calculation_units || "null"}`);
    console.log(`Calculation Type: ${field.calculation_type || "null"}`);
  }
}

function validateField(field: FormField): string[] {
  const issues: string[] = [];

  // Check for missing operator when operands exist
  if (
    (field.field_one_calculation || field.field_two_calculation) &&
    !field.calculation_operator
  ) {
    issues.push("Missing operator");
  }

  // Check for missing operands when operator exists
  if (
    field.calculation_operator &&
    (!field.field_one_calculation || !field.field_two_calculation)
  ) {
    issues.push("Missing operands");
  }

  // Check for missing units when operands and operator exist
  if (
    field.field_one_calculation &&
    field.field_two_calculation &&
    field.calculation_operator &&
    !field.calculation_units
  ) {
    issues.push("Missing units");
  }

  // Check for type mismatches (datetime field with number calc type or vice versa)
  if (field.type === "datetime" && field.calculation_type === "date") {
    issues.push("Type mismatch - datetime field with date calculation type");
  }

  return issues;
}

async function main() {
  try {
    const sqlContent = await fs.promises.readFile(
      path.join(__dirname, "../../goof/0001-fields-form-6097213.sql"),
      "utf8"
    );

    console.log("Analyzing fields with date calculation attributes...\n");

    const fields = sqlContent
      .split("INSERT INTO")[1]
      .split("VALUES")
      .slice(1)[0]
      .split("),\n(")
      .map((values) => extractFieldInfo(values));

    // Track different types of fields
    let totalDateFields = 0;
    let dateTimeFields = 0;
    let numberFields = 0;
    let dateTypeFields = 0;
    let numberTypeFields = 0;
    let monthsUnits = 0;
    let daysUnits = 0;
    let yearsUnits = 0;

    // Track validation issues
    const validationCounts: ValidationCounts = {
      missingOperator: 0,
      missingOperands: 0,
      missingUnits: 0,
      mismatchedTypes: 0,
    };

    fields.forEach((field) => {
      if (
        field.field_one_calculation ||
        field.field_two_calculation ||
        field.calculation_operator ||
        field.calculation_units
      ) {
        totalDateFields++;

        // Count field types
        if (field.type === "datetime") dateTimeFields++;
        if (field.type === "number") numberFields++;

        // Count calculation types
        if (field.calculation_type === "date") dateTypeFields++;
        if (field.calculation_type === "number") numberTypeFields++;

        // Count units
        if (field.calculation_units === "Months") monthsUnits++;
        if (field.calculation_units?.toLowerCase().includes("day")) daysUnits++;
        if (field.calculation_units === "Years") yearsUnits++;

        // Validate field and count issues
        const issues = validateField(field);
        issues.forEach((issue) => {
          switch (issue) {
            case "Missing operator":
              validationCounts.missingOperator++;
              break;
            case "Missing operands":
              validationCounts.missingOperands++;
              break;
            case "Missing units":
              validationCounts.missingUnits++;
              break;
            case "Type mismatch - datetime field with date calculation type":
              validationCounts.mismatchedTypes++;
              break;
          }
        });

        // Display field info
        console.log(`\nField ${field.id}: ${field.label}`);
        console.log(`Type: ${field.type}`);
        console.log(`Field One: ${field.field_one_calculation || "null"}`);
        console.log(`Field Two: ${field.field_two_calculation || "null"}`);
        console.log(`Operator: ${field.calculation_operator || "null"}`);
        console.log(`Units: ${field.calculation_units || "null"}`);
        console.log(`Calculation Type: ${field.calculation_type || "null"}`);
        if (issues.length > 0) {
          console.log("Issues found:", issues.join(", "));
        }
      }
    });

    console.log("\n=== Summary ===");
    console.log(
      `Total fields with date calculation attributes: ${totalDateFields}`
    );

    console.log("\nField Types:");
    console.log(`- datetime fields: ${dateTimeFields}`);
    console.log(`- number fields: ${numberFields}`);

    console.log("\nCalculation Types:");
    console.log(`- date type: ${dateTypeFields}`);
    console.log(`- number type: ${numberTypeFields}`);

    console.log("\nUnits Used:");
    console.log(`- Months: ${monthsUnits}`);
    console.log(`- Days: ${daysUnits}`);
    console.log(`- Years: ${yearsUnits}`);

    console.log("\nValidation Issues Found:");
    console.log(`- Missing operators: ${validationCounts.missingOperator}`);
    console.log(`- Missing operands: ${validationCounts.missingOperands}`);
    console.log(`- Missing units: ${validationCounts.missingUnits}`);
    console.log(`- Type mismatches: ${validationCounts.mismatchedTypes}`);
    console.log(
      `Total issues: ${Object.values(validationCounts).reduce(
        (a, b) => a + b,
        0
      )}`
    );
  } catch (error) {
    console.error("Error processing SQL file:", error);
  }
}

main();
