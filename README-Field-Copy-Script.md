# Formstack Field Copy Script

This script uses the Formstack fsApi (Embed field API) to copy values from one field to another with console logging.

## Features

- Monitors a source field for changes
- Console.logs all values for debugging
- Automatically copies values to a target field
- Handles initial values when the form loads
- Soft-coded field IDs for reuse across multiple forms

## How to Use

### Step 1: Get Your Field IDs

1. Open your Formstack form in the form builder
2. Click on the source field you want to monitor
3. Look at the URL or inspect the field to get its ID
4. Repeat for the target field

### Step 2: Configure the Script

Replace these placeholder values in the script:

```javascript
const FORM_ID = "YOUR_FORM_ID";           // Replace with your form ID
const SOURCE_FIELD_ID = "SOURCE_FIELD";   // Replace with source field ID  
const TARGET_FIELD_ID = "TARGET_FIELD";   // Replace with target field ID
```

### Step 3: Add to Your Form

1. In the Formstack form builder, add an "Embed" field
2. Copy the content inside the `<script>` tags from `embed-field-copy-script.html`
3. Paste it into the embed field content area
4. Save your form

### Example Configuration

```javascript
const FORM_ID = "6113001";
const SOURCE_FIELD_ID = "180770306";
const TARGET_FIELD_ID = "180770343";
```

## Console Output

The script will log the following information to the browser console:

- Script initialization confirmation
- Field change detection
- Source field values
- Actual values being copied
- Copy completion confirmation
- Initial value handling

## Compatible Field Types

This script works with most Formstack field types including:
- Short Answer (Text)
- Long Answer (Textarea)  
- Email
- Phone
- Number
- Select/Dropdown
- And more

## Troubleshooting

1. **Check the browser console** for error messages and debug output
2. **Verify field IDs** are correct by inspecting the form fields
3. **Ensure the form ID** matches your actual form
4. **Test with simple text fields** first before using with complex field types

## Important Notes

- Formstack cannot provide support for custom JavaScript
- Test thoroughly before deploying to production forms
- The script handles both change events and initial form load
- Console logging helps with debugging field value issues