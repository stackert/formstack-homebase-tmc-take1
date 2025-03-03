### formId: 5956001, submissionId 1311902823

formId: 5956001 has Saleseforce Ingration and Sharepoint (Power Automate) webhook.
Webhook can be identified with 'https://prod-36.southeastasia.logic.azure.com/workflows/4be4199500b941efbebcefaa7e07ad4a/triggers/Triggers_when_a_form_is_submitted/versions/08584711145357907532/run?'

In the past 30 days there are 11 instance of that webhook being called
In the past 30 days there are 11 submissions created
I do not see anything to suggest there is an issue.
Most currently February 5, 2025. SubmissionId: 1311902823 -
Submission created and webhook triggered

02/05/2025 1:39:37.327 AM -0500 - submission 1311902823 created
02/05/2025 1:39:40.194 AM -0500 - webhook triggered (3 seconds after submission creation)
02/05/2025 1:39:52.632 AM -0500 - webhook finishes (`jobDurationSeconds:12.448933839797974`) 12 seconds is explained.

Webhook is configured to send file content (not link or other method of file transfer)

### formId: 5956001, submissionId 1296175091

No submission for this form with submissionId 1296175091, past 30 days
12/12/2024 9:29:36.105 AM -0500 - submission created
12/16/2024 8:35:34.267 PM -0500 - at/about we see several 'Rejecting queue message over retry count'

December 16, 2024 - this submission had several errors with 'Rejecting queue message over retry count'

### Discovered Sumo Message suggesting error(s)

```
{
  "message": "Rejecting queue message over retry count",
  "context": {
    "workerName": "submitaction_webhook:submitaction_webhook8",
    "formId": "5956001",
    "submissionId": "1305170744",
    "submitActionId": "7276909",
    "jobQueueStart": 1736875265.756309,
    "jobQueueName": "submitaction_webhook",
    "jobPriority": "normal",
    "jobDelay": 1.982145071029663,
    "isRedelivered": true,
    "messageId": null,
    "error": "",
    "queue": "submitaction_webhook",
    "backend": "RabbitMQ",
    "event": "worker_generic",
    "sessionId": "178c58f3ca8ce6fa01355887fdf506ba",
    "errorId": "5cac6251aa17eb61330c"
  },
  "level": 400,
  "level_name": "ERROR",
  "channel": "formstackAppLog",
  "datetime": "2025-01-14T12:21:07.738486-05:00",
  "extra": {
    "hostname": "ip-172-22-3-204.ec2.internal",
    "process_id": 1971517,
    "memory_usage": "44 MB"
  },
  "dd": {
    "trace_id": "0",
    "span_id": "0"
  }
}
```

### formId: 5956001, "Rejecting queue message over retry count"

Sumo Query:

```
"Rejecting queue message over retry count"
| json field=\_raw "context.formId" as formId
| where formId = 5956001
```

Most recent occurrence for this form January 23, 2025.

** We are sending files via webhook ** so the file links internally remain the same (Formstack Bucket).

### File Uploads for SubmissionId: 1296175091, (total 51MB)

tchambers@T FORM-3024*sharepoint_files_not_sending$ grep -rin 1296175091 s3_audit_accountId_1143838.csv | cut -f2
s3_audit_accountId_1143838.csv:353:files-private.formstack.com,uploads/5956001/174416735/1296175091/174416735*.pdf,2024-12-12T14:29:38+00:00,229940
s3*audit_accountId_1143838.csv:380:files-private.formstack.com,uploads/5956001/174416736/1296175091/174416736_r88.pdf,2024-12-12T14:29:38+00:00,320071
s3_audit_accountId_1143838.csv:400:files-private.formstack.com,uploads/5956001/174416737/1296175091/174416737_2023.pdf,2024-12-12T14:29:38+00:00,442281
s3_audit_accountId_1143838.csv:422:files-private.formstack.com,uploads/5956001/174416738/1296175091/174416738*.docx,2024-12-12T14:29:38+00:00,13997
s3*audit_accountId_1143838.csv:450:files-private.formstack.com,uploads/5956001/174416739/1296175091/174416739*.docx,2024-12-12T14:29:39+00:00,13997
s3*audit_accountId_1143838.csv:475:files-private.formstack.com,uploads/5956001/174416740/1296175091/174416740_2023.pdf,2024-12-12T14:29:39+00:00,442281
s3_audit_accountId_1143838.csv:499:files-private.formstack.com,uploads/5956001/174416741/1296175091/174416741_2023.pdf,2024-12-12T14:29:39+00:00,442281
s3_audit_accountId_1143838.csv:527:files-private.formstack.com,uploads/5956001/174416765/1296175091/174416765*.pdf,2024-12-12T14:29:39+00:00,51536772
s3_audit_accountId_1143838.csv:550:files-private.formstack.com,uploads/5956001/174416767/1296175091/174416767_img_1033.pdf,2024-12-12T14:29:40+00:00,141995

Size in MB:
0.2192878723
0.3052434921
0.4217920303
0.01334857941
0.01334857941
0.4217920303
0.4217920303
49.14929581
0.1354169846

### File Uploads for SubmissionId: 1305170744, (total 78MB)

s3*audit_accountId_1143838.csv:362:files-private.formstack.com,uploads/5956001/174416735/1305170744/174416735*.pdf,2025-01-14T17:21:02+00:00,229940
s3*audit_accountId_1143838.csv:388:files-private.formstack.com,uploads/5956001/174416736/1305170744/174416736_r88.pdf,2025-01-14T17:21:02+00:00,320071
s3_audit_accountId_1143838.csv:406:files-private.formstack.com,uploads/5956001/174416737/1305170744/174416737_2023.pdf,2025-01-14T17:21:03+00:00,442281
s3_audit_accountId_1143838.csv:431:files-private.formstack.com,uploads/5956001/174416738/1305170744/174416738*.docx,2025-01-14T17:21:03+00:00,13997
s3*audit_accountId_1143838.csv:459:files-private.formstack.com,uploads/5956001/174416739/1305170744/174416739*.docx,2025-01-14T17:21:03+00:00,13997
s3_audit_accountId_1143838.csv:482:files-private.formstack.com,uploads/5956001/174416740/1305170744/174416740_2023.pdf,2025-01-14T17:21:03+00:00,442281
s3_audit_accountId_1143838.csv:508:files-private.formstack.com,uploads/5956001/174416741/1305170744/174416741_2023.pdf,2025-01-14T17:21:04+00:00,442281
s3_audit_accountId_1143838.csv:536:files-private.formstack.com,uploads/5956001/174416765/1305170744/174416765_2025-20271-10.pdf,2025-01-14T17:21:04+00:00,16331982
s3_audit_accountId_1143838.csv:556:files-private.formstack.com,uploads/5956001/174416767/1305170744/174416767_2025-20276.1.pdf,2025-01-14T17:21:04+00:00,24200452
s3_audit_accountId_1143838.csv:570:files-private.formstack.com,uploads/5956001/174416769/1305170744/174416769_2025-20276.2.pdf,2025-01-14T17:21:05+00:00,15772666
s3_audit_accountId_1143838.csv:577:files-private.formstack.com,uploads/5956001/174416771/1305170744/174416771_2025-20276.3-6.4.pdf,2025-01-14T17:21:06+00:00,23973825

Size in MB:
0.2192878723
0.3052434921
0.4217920303
0.01334857941
0.01334857941
0.4217920303
0.4217920303
15.57539177
23.07934952
15.04198647
22.86322117
