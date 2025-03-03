#fsApi Script copy odd/even values

## Objective

Customer needs a fsApi script embed field script that will read value from one Short Answer, if the value is even, it will set a different Short Answer value, likewise for Odd numbers.

## Objective - Detailed

Basically the script will need to soft code fieldId for three fields:

- Source Field (FIELD_ID_SOURCE)
- Target Even Field (FIELD_ID_TARGET_EVEN)
- Destination Field (FIELD_ID_TARGET_ODD)

## Provided Resources

- organization-wide-resources/ai-generated-descriptions/fsFeApi
  **IMPORTANT** This directory contains the contexts, documentation, examples, to base our script.
- formstack-forms-misc-minor-scripts/embed-code-fsapi-copy-even-values/artifacts/embed-code.html
  **IMPORTANT** This is where the output example should go. We'll copy and paste the code snippet
  from '<script> ... </script>' tags from this file into the embed field content. This is a friction point for me so make it easy as possible.

### Notes

Our fieldIds should be soft-coded, but for our purposes will use

- FormId:6113001
- FormUrl
- Source Field Id: 180770306
- Even Field Id: 180770343
- Odd Field Id: 180770330
