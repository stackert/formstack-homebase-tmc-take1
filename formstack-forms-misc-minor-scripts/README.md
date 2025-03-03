Each directory represents a "project" or isolated script. Most will included any dependencies in the directory (package.json - yes, node_modules - no).

Each directory will also contain a directory 'context-documentation' that contains the initial context for the project, any other discussions (things tried, things we MUST NOT DO, etc.).

Each file within in the 'context-documentation' directory uses a naming conventions that reflects sequence of events and reduces 'merge conflicts'.
00000-000999 - Set-up, Do's and Don'ts, references to external resources, references of internal resources ([PROJECT-ROOT]/artifacts). **Most Importantly** it will contain a basic (or detailed) description of our objectives. This description should also be reflected in the 009xxx series, concluding remarks.

00100-000899 - Work Notes.
Any comments that may be useful for others. Things tried and why they wont work. Why we had to do things a certain way. Anything you think may be useful to you (and others) in the future when trying to understand the 'why' of what we did. (This because useful in other projects).

00900-000999 - Concluding Remarks
How to use the script. How to extend the script. Anything else you think is important to know.
Why we didn't complete the script. (We found a better way, the requirement changes)

'00xxx' prefix is because this is AI + Human, we are expecting to 'grow' in ways unforeseen.

Directory Structure - In General
[Project-Root/Project Name] <-- Root Directory
[Project-Root/Project Name]/artifacts <-- Any files we want to keep for references or to work on, but are not code.
[Project-Root/Project Name]/context-documentation <-- Any discussions, notes, etc.
[Project-Root/Project Name]/context-documentation/scripts <-- Any scripts we want to keep for references or to work on, but are not code.

formstack-forms-misc-minor-scripts/_TEMPLATE_ <-- Template for new projects.
