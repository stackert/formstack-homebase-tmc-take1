### Silly little things that may be relevant (ramblings of a madman)

Digging around in the code it looks like its having issues with the file field, fieldId(133346871).
It looks like that field does not have any kind of configuration in the database (that may be how it is supposed to be).
When we have the impersonation consent, that field is probably a good place to start.

### Sumo Logic

We found a related error in Sumo
https://formstack.us2.sumologic.com/ui/#/search/create?id=CIUv2l7og93l4ZarsGgjLhkKOGsfaESA3g3Up4ys

```json
{
  "message": "Throwable 500 error in onError",
  "context": {
    "submissionId": 1307660269,
    "isPartialSubmission": false,
    "code": 500,
    "orig_code": 0,
    "message": "strpos(): Argument #1 ($haystack) must be of type string, array given",
    "trace": "#0 /opt/formstack-deployments/current/lib/Formstack/Model/SubmitAction/Salesforce.php(1963): strpos(Array, 'https://s3.amaz...')\n#1 /opt/formstack-deployments/current/lib/Formstack/Model/SubmitAction/Salesforce.php(1613): Formstack\\Model\\SubmitAction\\Salesforce->isUrlInAmazon(Array)\n#2 /opt/formstack-deployments/current/lib/Formstack/Model/SubmitAction/Salesforce.php(1398): Formstack\\Model\\SubmitAction\\Salesforce->getValueForValueTypeField(Array, Array, Object(stdClass), NULL, Object(stdClass))\n#3 /opt/formstack-deployments/current/lib/Formstack/Model/SubmitAction/Salesforce.php(801): Formstack\\Model\\SubmitAction\\Salesforce->getObjectsAndLinks(Array, Array, Array)\n#4 /opt/formstack-deployments/current/lib/Formstack/Service/SharedSubmitActionService.php(185): Formstack\\Model\\SubmitAction\\Salesforce->run(Object(Formstack\\Model\\Form), Array, Array, 1307660269, false, Array, NULL)\n#5 /opt/formstack-deployments/current/lib/Formstack/Controller/PublicFormController.php(2020): Formstack\\Service\\SharedSubmitActionService->runPredefinedSubmitActions(Object(Formstack\\Model\\Form), Array, Array, Array, 1307660269)\n#6 /opt/formstack-deployments/current/lib/Formstack/Controller/PublicFormController.php(471): Formstack\\Controller\\PublicFormController->runBlockingIntegrations(Object(Formstack\\Model\\Form), Array, Array, Array, 1307660269)\n#7 [internal function]: Formstack\\Controller\\PublicFormController->submitAction()\n#8 /opt/formstack-deployments/current/lib/Framework/Application.php(589): ReflectionMethod->invokeArgs(Object(Formstack\\Controller\\PublicFormController), Array)\n#9 /opt/formstack-deployments/current/lib/Framework/Application.php(417): Framework\\Application->route()\n#10 /opt/formstack-deployments/current/www/forms/index.php(9): Framework\\Application->run()\n#11 {main}",
    "event": "temp_500_errors",
    "sessionId": "",
    "errorId": "aeb8795cc417939b46c2",
    "accountId": 363309,
    "hipaaAccount": false,
    "organizationId": "dbbae65a-a40b-11ea-9f25-0ead3d3be847"
  },
  "level": 200,
  "level_name": "INFO",
  "channel": "formstackAppLog",
  "datetime": "2025-01-22T10:17:49.163719-05:00",
  "extra": {
    "hostname": "ip-172-22-0-57.ec2.internal",
    "uid": "dc8e43e",
    "url": "/forms/index.php",
    "ip": "112.198.45.10",
    "http_method": "POST",
    "server": "formstack.com",
    "referrer": "https://atlantajcc.formstack.com/forms/program_and_facility_request",
    "memory_usage": "34.38 MB"
  },
  "dd": {
    "trace_id": "137663612217637679151486869261293177758",
    "span_id": "16811280098434730910",
    "trace_url": "https://app.datadoghq.com/apm/trace/137663612217637679151486869261293177758"
  }
}
```
