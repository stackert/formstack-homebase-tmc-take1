# Brief Objective

Write a typescript script to help us determine the five forms with the most storage allocation and how storage is allocated for each.

Determine how much storage is used in public buckets and how much storage is used in private buckets.

# Prerequisites

We will treat .personal/misc-tasks/S3-audit-misaligneded as project root (node_modules, package.json, etc. are in this directory). I will relaunch the IDE once we have the project started.

# Data

formstack-forms-misc-minor-scripts/S3-audit-misaligned/artifacts/s3_audit_accountId_917641.csv
Contains a report of all items for this account in our S3 buckets.

### The fields are:

Bucket,Key,Last Modified,Size (bytes)

### 'Key' is in the form of:

uploads/{formId}/{fieldId}/{submissionId}/{fieldId}\_16611691082495673246844705714789.jpg

Real Example
uploads/3852364/107157250/1000384575/107157250_16611691082495673246844705714789.jpg

# Be careful

Customer should be charged for storage in the private bucket only.

# Script

The output script should be: formstack-forms-misc-minor-scripts/S3-audit-misaligned/scripts/audit-s3-storage.ts
