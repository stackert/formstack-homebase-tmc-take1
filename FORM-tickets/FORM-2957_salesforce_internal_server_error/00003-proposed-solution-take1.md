# Proposed Solution Take 1, Multiple File Upload support for Salesforce Submit Action

## Initial Approach

[We didn't really have an 'approach' we started by "looking" at the problem and "see what if.."]

We attempted an iterative debugging approach focused on the Salesforce integration's attachment handling, specifically targeting the issue of multiple file uploads. The initial strategy was to modify the URL handling logic to properly split concatenated URLs (whether pipe or space-delimited) and ensure each file was processed as a separate Salesforce Attachment record. We started by addressing the `getValueForAttachment` method to handle the immediate symptoms of incorrect file processing.

As issues emerged, we expanded our scope to include the `createObject` method to properly handle multiple attachments, and then to the `getDataOfS3Object` method when S3 retrieval errors surfaced. Each fix revealed new interconnected issues, leading to a cascade of related changes across multiple methods. We introduced a new `splitUrls` helper function to standardize URL parsing across the codebase, attempting to create a single source of truth for URL handling.[Retrospective - this is where we start to see the cycles]

The approach proved problematic as it revealed deep interdependencies in the codebase's file handling logic. What started as a seemingly straightforward fix for URL concatenation evolved into a complex refactoring effort touching multiple aspects of the Salesforce integration: file name extraction, attachment creation, S3 object retrieval, and link handling. The cyclic nature of the issues we encountered - fixing one area only to break another - demonstrated the limitations of this incremental approach when dealing with tightly coupled legacy code.

This experience highlighted the need for a more systematic approach, one that starts with a comprehensive understanding of the form configuration, field mappings, and API interactions rather than addressing symptoms as they appear. The complexity of the file handling logic and its integration with Salesforce's attachment system required a more holistic solution than our initial strategy could provide.

## Concluding Remarks

### User/Developer Remarks

Feedback for you. ONLY. Make no more changes

```
Undefined variable $found
Extra Debugging Information:
Framework\WebRequestException: Undefined variable $found in /opt/formstack/lib/Formstack/Controller/PublicFormController.php:547
Stack trace:
#0 [internal function]: Formstack\Controller\PublicFormController->submitAction()
#1 /opt/formstack/lib/Framework/Application.php(589): ReflectionMethod->invokeArgs(Object(Formstack\Controller\PublicFormController), Array)
#2 /opt/formstack/lib/Framework/Application.php(417): Framework\Application->route()
#3 /opt/formstack/www/forms/index.php(9): Framework\Application->run()
#4 {main} (Error ID: 8adf9c75e49bc3e839c7)
```

This is also an error we've seen in our efforts to improve Submit Action.

Ultimately, I consider our efforts a waste of time because of the 'cycles' of repeated errors. I recognized those cycles early on and mentioned it. You addressed it but we continued our repetitive errors. I should have pulled the plug sooner. I wonder if there are ways you could have better identified the cycles? I wonder if there is a metric we could use, or some sort of automation we could use to verify we're not going around in circles.

I recognize the need for a different approach. This approach was only the first. It was more of 'throw it against the wall and see if it sticks'. It didn't work but we learned some insights.

In our next approach I will provide for you

- json Form definition (API GET form/id)
- database SubmitAction definition for this submit actions
- I will map two fields:
  1. control File field. The ideal set-up we know to work (configured for single file only)
  2. a field that we will work on/with (configured to allow configured data)
- I will provide the Salesforce API and perhaps references to any other Salesforce Integration files (those should have already been discovered and only useful for reference).

### AI Remarks

Thank you for this thoughtful feedback. You're absolutely right about the cycles of errors, and I see several ways I could have done better:

1. Error Pattern Recognition:

- I should have maintained a "seen errors" list and tracked when we started seeing similar patterns
- The fact that we kept hitting file/attachment handling issues in different methods was a red flag
- When we started making changes to fix one issue only to uncover related issues, that was another signal

2. Systematic Analysis:

- Instead of jumping to fix each error, I should have stepped back to map the entire attachment handling flow
- A proper dependency graph of the methods involved would have shown the cyclic nature of our fixes
- We could have identified all the places where URL/file handling occurs and seen the inconsistencies

3. Testing Strategy:

- We could have created a test matrix of different file upload scenarios
- This would have helped identify all the edge cases upfront rather than discovering them one by one
- It would have also shown where our fixes might break other scenarios

4. Metrics for Detecting Cycles:

- Count of similar error types/locations
- Number of times we modify the same method/area of code
- Tracking if fixes in one area consistently break another area
- Mapping of dependencies between changed methods

Your proposed next approach sounds much more structured:

- Having the form definition will show the exact field configurations
- The working control case provides a baseline to compare against
- Having the complete API context will help understand the full flow

This is a much better way to tackle the problem systematically rather than the reactive approach we took.

The undefined `$found` variable is yet another symptom of our piecemeal approach - we fixed `$foundLink` but missed the related `$found` variable, showing how interconnected these issues are.
