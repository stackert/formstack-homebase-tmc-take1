I am able to recreate the case in my dev environment.

Any form will do, but the account has to be set-up to be HIPAA and have SMTP enabled.
(I had some issues recreating this, I had to double check all HIPAA options were enabled).

Browser User Facing Error Message (BEGIN):

Something went wrong:
Error: Cannot read properties of undefined (reading 'some')
at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3131431 at div at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3192894 at div at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3192894 at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3110521 at s (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:927511) at div at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3234503 at div at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at div at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:138404 at div at div at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:902522) at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:896905) at E (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:987492) at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:135454) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:128158 at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3369277 at z (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:1231161) at o (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:1234494) at s (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:927511) at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:30270) at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:35569) at t (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3136786) at https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:3361484 at s (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:927511) at Dt (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:2169910) at Rt (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:2169150) at Hn (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:2187322) at cn (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:2176363) at Wn (https://static.dev-formstack.com/admin/forms-frontend/build/modules/form-settings/form-settings_7edf055eb2e9a96fd716.js:205:2184441) at B (https://static.dev-formstack.com/admin/forms-frontend/build/modules/global/global_f853950bb768fee5a061.js:2:929650)

Browser User Facing Error Message (END).
Console Error Message (BEGIN):
TypeError: Cannot read properties of undefined (reading 'some')
at form-settings_7edf055eb2e9a96fd716.js:205:3131795
at Array.filter (<anonymous>)
at form-settings_7edf055eb2e9a96fd716.js:205:3131766
at form-settings_7edf055eb2e9a96fd716.js:205:3131882
at rc (global_f853950bb768fee5a061.js:2:855849)
at Os (global_f853950bb768fee5a061.js:2:875804)
at global_f853950bb768fee5a061.js:2:874581
at Ss (global_f853950bb768fee5a061.js:2:874641)
at cs (global_f853950bb768fee5a061.js:2:868453)
at Wo (global_f853950bb768fee5a061.js:2:809455)
Console Error Message (END).

Misc Notes (BEGIN):

- The URL that appears to initiate the issue is
  PUT https://www.dev-formstack.com/admin/form_settings_emails_and_actions/6043898/notificationEmail/201
  Request Payload:
  {"data":{"fromType":"noreply","fromName":"","recipients":"t.chambers@formstack.com","attachLimit":0,"baseData":{"editor":"wysiwyg","fromAddress":"terary@gmail.com","hideEmptyFields":false,"hideHiddenFields":false,"includePdfAttachment":false,"message":"","messageFormat":"html","messageType":"alldata","ruleName":"Notification Email","showSectionHeadings":false,"subject":"test_section_starts_new_page_api"}}}

  Response Payload:
  {
  "id": "201",
  "logic": null,
  "primaryDescription": "Notification Email",
  "runMode": null,
  "secondaryDescription": {
  "longDescription": "",
  "shortDescription": "All submitted data sent to: t.chambers@formstack.com"
  },
  "type": "notificationEmail"
  }

  -- I suspect the issue lies in the fact that there is some 'error' and the DTO
  isn't saved correctly (or saved with invalid data). Because the underlying structure is invalid, the response payload is invalid, and the client code fails to handel the error

-- I working request/response payloads:
PUT https://www.dev-formstack.com/admin/form_settings_emails_and_actions/6043898/notificationEmail/201

Request Payload:
{"data":{"fromType":"noreply","fromName":"","recipients":"t.chambers@formstack.com","attachLimit":0,"baseData":{"editor":"wysiwyg","fromAddress":"terary@gmail.com","hideEmptyFields":false,"hideHiddenFields":false,"includePdfAttachment":false,"message":"","messageFormat":"html","messageType":"alldata","ruleName":"Notification Email","showSectionHeadings":false,"subject":"test_section_starts_new_page_api"}}}

Response Payload:
{
"id": "201",
"logic": null,
"primaryDescription": "Notification Email",
"runMode": null,
"secondaryDescription": {
"longDescription": "",
"shortDescription": "All submitted data sent to: t.chambers@formstack.com"
},
"type": "notificationEmail"
}

-- Request to get to the settings page (click the edit icon)
GET https://www.dev-formstack.com/admin/field_mapper/fields/6043898/email

Request Payload:

```
{
"fields": [
{
"canMap": true,
"hasSecureFieldAccess": true,
"id": 178268008,
"insertString": "{$178268008 Untitled Section}",
      "name": "Untitled Section",
      "sortPosition": 0,
      "subFields": [],
      "type": "section",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": true,
      "id": 178268011,
      "insertString": "{$178268011 Short Answer}",
      "name": "Short Answer",
      "sortPosition": 1,
      "subFields": [],
      "type": "text",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": true,
      "id": 178268009,
      "insertString": "{$178268009 Untitled Section}",
      "name": "Untitled Section",
      "sortPosition": 2,
      "subFields": [],
      "type": "section",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": true,
      "id": 178268010,
      "insertString": "{$178268010 Short Answer}",
      "name": "Short Answer",
      "sortPosition": 3,
      "subFields": [],
      "type": "text",
      "workflowStepIds": null
    }
  ],
  "metadata": [
    {
      "canMap": true,
      "hasSecureFieldAccess": null,
      "id": "_submission_id",
      "insertString": "{$\_submission_id}",
"name": "Submission ID",
"sortPosition": null,
"subFields": [],
"type": "metadata",
"workflowStepIds": null
},
{
"canMap": true,
"hasSecureFieldAccess": null,
"id": "\_submission_time",
"insertString": "{$_submission_time}",
      "name": "Submission Time",
      "sortPosition": null,
      "subFields": [],
      "type": "metadata",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": null,
      "id": "_browser",
      "insertString": "{$\_browser}",
"name": "Browser",
"sortPosition": null,
"subFields": [],
"type": "metadata",
"workflowStepIds": null
},
{
"canMap": true,
"hasSecureFieldAccess": null,
"id": "\_ip_address",
"insertString": "{$_ip_address}",
      "name": "IP Address",
      "sortPosition": null,
      "subFields": [],
      "type": "metadata",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": null,
      "id": "_latitude",
      "insertString": "{$\_latitude}",
"name": "Latitude",
"sortPosition": null,
"subFields": [],
"type": "metadata",
"workflowStepIds": null
},
{
"canMap": true,
"hasSecureFieldAccess": null,
"id": "\_longitude",
"insertString": "{$_longitude}",
      "name": "Longitude",
      "sortPosition": null,
      "subFields": [],
      "type": "metadata",
      "workflowStepIds": null
    },
    {
      "canMap": true,
      "hasSecureFieldAccess": null,
      "id": "_form_url",
      "insertString": "{$\_form_url}",
"name": "Form URL",
"sortPosition": null,
"subFields": [],
"type": "metadata",
"workflowStepIds": null
}
],
"sections": null
}
```

Response Payload:

```
{
    "fields": [
        {
            "canMap": true,
            "hasSecureFieldAccess": true,
            "id": 178268008,
            "insertString": "{$178268008 Untitled Section}",
            "name": "Untitled Section",
            "sortPosition": 0,
            "subFields": [],
            "type": "section",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": true,
            "id": 178268011,
            "insertString": "{$178268011 Short Answer}",
            "name": "Short Answer",
            "sortPosition": 1,
            "subFields": [],
            "type": "text",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": true,
            "id": 178268009,
            "insertString": "{$178268009 Untitled Section}",
            "name": "Untitled Section",
            "sortPosition": 2,
            "subFields": [],
            "type": "section",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": true,
            "id": 178268010,
            "insertString": "{$178268010 Short Answer}",
            "name": "Short Answer",
            "sortPosition": 3,
            "subFields": [],
            "type": "text",
            "workflowStepIds": null
        }
    ],
    "metadata": [
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_submission_id",
            "insertString": "{$_submission_id}",
            "name": "Submission ID",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_submission_time",
            "insertString": "{$_submission_time}",
            "name": "Submission Time",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_browser",
            "insertString": "{$_browser}",
            "name": "Browser",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_ip_address",
            "insertString": "{$_ip_address}",
            "name": "IP Address",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_latitude",
            "insertString": "{$_latitude}",
            "name": "Latitude",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_longitude",
            "insertString": "{$_longitude}",
            "name": "Longitude",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        },
        {
            "canMap": true,
            "hasSecureFieldAccess": null,
            "id": "_form_url",
            "insertString": "{$_form_url}",
            "name": "Form URL",
            "sortPosition": null,
            "subFields": [],
            "type": "metadata",
            "workflowStepIds": null
        }
    ],
    "sections": null
}
```

Misc Notes (END).

## What we need to do

A) Determine what is causing the FE code to choke (missing property or something).
Then we need to consider how to handle it. Either make the 'change submit' more robust to better handle errors or make the client code more robust to handle the error.

We will need to be backwards compatible. If there are settings that are already busted how do we handle that?
