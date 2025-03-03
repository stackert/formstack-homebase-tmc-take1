import { createReadStream } from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import * as fs from "fs-extra";

interface S3Record {
  Bucket: string;
  Key: string;
  "Last Modified": string;
  "Size (bytes)": string;
}

interface FormStorage {
  formId: string;
  totalSize: number;
  publicSize: number;
  privateSize: number;
  fileCount: number;
}

const PUBLIC_BUCKET = "files.formstack.com";
const PRIVATE_BUCKET = "files-private.formstack.com";

async function main() {
  const formStorageMap = new Map<string, FormStorage>();
  let recordCount = 0;
  let skippedRecords = 0;

  const parser = createReadStream(
    path.join(__dirname, "../artifacts/s3_audit_accountId_917641.csv")
  ).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  for await (const record of parser) {
    recordCount++;
    const { Bucket, Key, "Size (bytes)": sizeStr } = record as S3Record;

    if (recordCount <= 3) {
      console.log("\nSample Record:", {
        Bucket,
        Key,
        "Size (bytes)": sizeStr,
      });
    }

    // Extract formId from the key (uploads/{formId}/...)
    const match = Key.match(/^uploads\/(\d+)\//);
    if (!match) {
      skippedRecords++;
      if (skippedRecords <= 3) {
        console.log(`Skipped record - Invalid key format: ${Key}`);
      }
      continue;
    }

    const formId = match[1];
    const size = parseInt(sizeStr, 10);
    if (!sizeStr || sizeStr.trim() === "") {
      console.log(`Warning: Empty size for record:`, { Bucket, Key, sizeStr });
      continue;
    }

    let storage = formStorageMap.get(formId);
    if (!storage) {
      storage = {
        formId,
        totalSize: 0,
        publicSize: 0,
        privateSize: 0,
        fileCount: 0,
      };
      formStorageMap.set(formId, storage);
    }

    storage.fileCount++;

    if (Bucket === PUBLIC_BUCKET) {
      storage.publicSize += size;
      storage.totalSize += size;
    } else if (Bucket === PRIVATE_BUCKET) {
      storage.privateSize += size;
      storage.totalSize += size;
    } else {
      console.log(`Warning: Unknown bucket: ${Bucket}`);
    }
  }

  console.log(`\nProcessed ${recordCount} total records`);
  console.log(`Skipped ${skippedRecords} records due to invalid key format\n`);

  // Convert to array and sort by total size
  const sortedForms = Array.from(formStorageMap.values()).sort(
    (a, b) => b.totalSize - a.totalSize
  );

  // Get top 5 forms by storage
  const top5Forms = sortedForms.slice(0, 5);

  // Calculate total storage by bucket type
  const totalPublicStorage = sortedForms.reduce(
    (sum, form) => sum + form.publicSize,
    0
  );
  const totalPrivateStorage = sortedForms.reduce(
    (sum, form) => sum + form.privateSize,
    0
  );

  console.log("\nTop 5 Forms by Storage Usage:");
  console.log("============================");
  top5Forms.forEach((form, index) => {
    console.log(`\n${index + 1}. Form ID: ${form.formId}`);
    console.log(`   Total Storage: ${formatBytes(form.totalSize)}`);
    console.log(`   Public Storage: ${formatBytes(form.publicSize)}`);
    console.log(`   Private Storage: ${formatBytes(form.privateSize)}`);
    console.log(`   File Count: ${form.fileCount}`);
  });

  console.log("\nOverall Storage Summary:");
  console.log("=======================");
  console.log(`Total Public Storage: ${formatBytes(totalPublicStorage)}`);
  console.log(`Total Private Storage: ${formatBytes(totalPrivateStorage)}`);
  console.log(
    `Total Combined Storage: ${formatBytes(
      totalPublicStorage + totalPrivateStorage
    )}`
  );
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

main().catch(console.error);
