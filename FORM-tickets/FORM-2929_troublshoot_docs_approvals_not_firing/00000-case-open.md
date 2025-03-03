Form ID: 4742610| Account ID/Org ID: 611399
Browser Info:

Expected Behavior: Form has three approval steps for each submission. Once all steps are approved, docs integration is expected to run.
Actual Behavior: On submission 1298223112, docs integration stayed in "Pending" status despite all approval steps being completed.
Steps to Recreate: Example submissions:
1298223112 - did NOT work as expected (2024-12-18) routes through approver: Mike Parks: mparks@smithtec.org
1303110531 - worked as expected (2025-01-07) routes through approver: Melanie Chartier: mchartier@smithtec.org

\*both submissions have been manually pushed to completion since
Steps to Resolve: - suggested a full refresh of the integration, still doesn't work and already suggested by previous agents.

tried the same setup of the customer's Forms and Documents, can't replicate issue

did another setup by copying the customer's form and document, still can't replicate issue

checked SUMO and shows broken-looking logs after the approval logs for related submission IDs.

checked if customer reached max merges, but it didn't.
Error Message:
