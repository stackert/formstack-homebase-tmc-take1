This is what we see in dev when submitting to Salesforce with multiple file uploads (Only happens if there are actually more than one file).

```
Error executing "GetObject" on "https://s3.amazonaws.com/files-private-dev.formstack.com/uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg%7Chttps%3A//s3.amazonaws.com/"; AWS HTTP error: Client error: `GET https://s3.amazonaws.com/files-private-dev.formstack.com/uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg%7Chttps%3A//s3.amazonaws.com/` resulted in a `404 Not Found` response: NoSuchKeyThe specified key does not exist. (truncated...) NoSuchKey (client): The specified key does not exist. - NoSuchKeyThe specified key does not exist.uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg|https://s3.amazonaws.com/V4GDW9MVY5X67QB4j7aOTlWwoLcdRZN3b/Qji9oaGs99gPuzPMhlh3GHrYkzga93L1cqt7wcHRxGknWfFQFZhvZ8pBA=

```

and

```
Extra Debugging Information:
Framework\WebRequestException: Error executing "GetObject" on "https://s3.amazonaws.com/files-private-dev.formstack.com/uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg%7Chttps%3A//s3.amazonaws.com/"; AWS HTTP error: Client error: `GET https://s3.amazonaws.com/files-private-dev.formstack.com/uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg%7Chttps%3A//s3.amazonaws.com/` resulted in a `404 Not Found` response:

NoSuchKeyThe specified key does not exist. (truncated...)
 NoSuchKey (client): The specified key does not exist. -
NoSuchKeyThe specified key does not exist.uploads/6097217/180022380/19790/180022380_strawberry-stuff.jpg|https://s3.amazonaws.com/V4GDW9MVY5X67QB4j7aOTlWwoLcdRZN3b/Qji9oaGs99gPuzPMhlh3GHrYkzga93L1cqt7wcHRxGknWfFQFZhvZ8pBA= in /opt/formstack/lib/Formstack/Controller/PublicFormController.php:547
Stack trace:
#0 [internal function]: Formstack\Controller\PublicFormController->submitAction()
#1 /opt/formstack/lib/Framework/Application.php(589): ReflectionMethod->invokeArgs(Object(Formstack\Controller\PublicFormController), Array)
#2 /opt/formstack/lib/Framework/Application.php(417): Framework\Application->route()
#3 /opt/formstack/www/forms/index.php(9): Framework\Application->run()
#4 {main} (Error ID: 6e67e110f9a5669e405a)

```

In Production I get the same error as above.
I think either the original issue has been fixed or changed.
