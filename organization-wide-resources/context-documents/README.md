# Context Documents

## Overview

This directory contains context documents that are used to help the AI understand various aspects our Organization.

There really isn't a specific format or any particular structure to these documents. They are used mostly to create background about how the systems interact with each other. Over time, it is expected that both breadth and depth of knowledge of contexts documents will grow and this project will become the HAL 9000 of our knowledge base.

## Examples of Depth and Breadth

### Depth

Formstack Forms has a special field type 'embed' field that allows our customers to embed custom javascript.
Any javascript will run in the field but to interact with the rendered form the javascript must interact with the fsApi (Forms Frontend API). To write a simple script from scratch with zero knowledge of fsApi, could take a capable person a full day to acquire knowledge, test, revise, etc. A Formstack Employee with little knowledge of the Forms Product and zero knowledge of fsApi, could acquire that same day's knowledge by importing the [fsApi context document], into Cursor/Composer-Agent. Then the process of building the simple script takes 10 minutes and Zero knowledge user to Power User Knowledge in seconds.

### Breadth

An individual could quickly gain insight and understanding into all of Formstack's Products and how they interact with each other simply by referencing the entire context document directory and engage in a conversation with AI.

Practical example: A new hire onboarding exercise of "Find answers to specific questions" using context documents could be used to train new employees. This could lead to more in depth understanding because they're able to interact, ask questions, and explore all of our products in totality.

## Naming Conventions

Naming Conventions:

formstack-[product]-[sub-context]-[sequence-number].mdg

There is very little guidelines for naming conventions at this stage. Currently we used fixed 'formstack-{product}-[ANYTHING GOES]`
Where product is one of the following:

- copilot
- docs
- f4fs
- forms
- fsid
- sign
- thor (streamline)

This author's styling preference to group related is to use fixed length numbers (00001, 00002, 01001, 01001). These number merely suggest the files are related. I tend to name root files with '00000', This usually suggests the file services as 'index' or similar.
