CX Raises concern that that our S3 Storage Audit Reports is not very user friendly.

In this exercise we want to demonstrated shared context with time + user + Cursor/Composer.

The S3 Audit Report is known to be difficult to manage. It often has 10,000's of rows, each row has files specific information but nothing
to tie back to better understand the data (We can tell you about the file but we can't tell you how it got there).

Much of the report can be summarized to present a snapshot of the data.
The file is too big for AI to be trusted so we'll need to build a typescript to parse and collect the data.

Our objective is to create a script that will do the above, mostly. The end product should be sufficiently complete and documented that it can easily be extended to suite other needs.

Currently, I think it will only report the top file forms by file storage usage size. This script can easily be extended to report all forms, or only forms with usage above a certain threshold. Because dates are provided we could use it to determine date ranges of most usage.
