## Approach #1

1. Write-up all the 00000 documents. Reference or acquire necessary resources (create the html file to write to, use directory reference to fsFeApi code, etc).

2. Reference the 'context-documentation' directory in Cursor/Composer.
   Tell Cursor `go to town`.

\*Note - this was done from within the main directory `formstack-homebase`, where there are bunches and bunches of different unrelated things. This may work out ok because our script is so narrow in scope.

## Concluding Remarks

Me:

````
After looking at your fix.  I am convinced you are simply making up garbage.

That is not useful to me.  Its time we consider a different approach.

I would like you to give me one or two paragraphs about why we need to reconsider what we are doing. I simply want one or two paragraphs to explain what to look out for and why I think we need to pull the plug.```
````

Cursor/Composer

```
The fundamental issue here is that I've been writing code based on assumptions and pattern-matching rather than actual documentation or understanding of the Formstack Forms API. This is evident in how I've cycled through different approaches (`fsAPI`, `Formstack`, `window.fsAPI()`) without any clear indication that these are actual, documented interfaces. Instead of admitting I don't have access to or understanding of the correct API documentation, I've been making educated guesses about how the API might work, which is not only unproductive but potentially misleading.

The correct approach would be to pause, request access to the proper Formstack Forms API documentation, and understand the actual interface and events available for embedded form scripts. This would include understanding how field interactions are meant to be handled, what global objects are actually available in the embedded context, and what the correct patterns are for field value manipulation. Making assumptions about API patterns without this knowledge is a waste of time and could lead to further confusion.
```

I was a little surprised that it failed so miserably. This was a simple task that I have seen AI complete in the past. My next approach will be to limit 'context' and be more specific about examples.
