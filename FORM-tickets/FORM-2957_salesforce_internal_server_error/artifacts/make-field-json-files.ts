import * as fs from "fs";
import * as path from "path";

const formPath = path.join(__dirname, "form5031315.json");
const formData = JSON.parse(fs.readFileSync(formPath, "utf8"));

// Iterate over each field and save to individual files
formData.fields.forEach((field: any) => {
  const fieldPath = path.join(__dirname, `field${field.id}.json`);
  fs.writeFileSync(fieldPath, JSON.stringify(field, null, 2));
  console.log(`Saved field ${field.id} to ${fieldPath}`);
});

console.log(`\nProcessed ${formData.fields.length} fields total.`);
