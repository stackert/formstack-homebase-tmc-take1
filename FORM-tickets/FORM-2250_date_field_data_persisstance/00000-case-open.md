https://formstack.atlassian.net/browse/FORM-2621

Description
Form ID: 5909344 | Account ID/Org ID: 1002275 / OrgId: 23430cd8-bda5-11eb-9ad3-12f3ae0ace47
Browser Info:

Expected Behavior: When a HIPAA account using SMTP, creates/edits and notification email, and adds multiple recipients, the setting should save ran redirect back to the email settings page.
Actual Behavior: Recently, we have observed when a HIPAA SMTP enable account adds recipients to a notification emails, the users gets an error after saving. If the page is refreshed, the email setting is saved.
Steps to Recreate: 1. Enable the HIPAA account flag in Forms CP, and the Allow SMTP flag 2. Add SMTP to the account and enable 3. Go to notification email settings, add a email, and add multiple recipients using the dropdown 4. Save email setting

Steps to Resolve: 1. Tested in house 2. Tested on non HIPAA account 3. Tested without SMTP
Error Message:

Links:
Slack Convo: https://formstack.slack.com/archives/C3LQ7KNFN/p1728073801193699
Screen Recording:
Files:
