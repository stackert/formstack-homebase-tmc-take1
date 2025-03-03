case Status: On Hold
Case Number: 00743731
FormId: 5985600 (prod, customer's)
formId 6089749 (prod, Trudie's)
Customer complains webhook/webmerge are firing incorrectly

From the Jira:
Uk : Webhook is not sending to endpoint which is Docs. This is causing a pending error in the submission table. Once the action is ran again from the submission table it is then successful, but it has to be ran manually.

This issue is bourne from separate issue. Originally, there was an issue
with webhook logic settings page throwing an ugly javascript error. That
was caused by faulty copy operation where the stepId from the original from
where copies to the new webhook logic settings page. That issue was fixed.
