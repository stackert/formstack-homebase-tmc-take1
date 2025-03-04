## INCOMPLETE ARTICLE

This document demonstrates style of a document that describes how to set up a CSP for a Salesforce Digital Experience.
We like the style/structure of the document. The content of the document is **ABSOLUTELY IRRELEVANT** to Formstack or our current task.

### Updating Your Content Security Policy for Forms

One of the challenges admins can face when setting up a new experience cloud site is configuring the sites Content Security Policy, or CSP. CSP is an added layer of security that helps to detect and mitigate certain types of attacks. Salesforce Digital Experiences are often public-facing, so maintaining a Content Security Policy is a good way to improve your community's security. While very basic forms will work out-of-the-box in experiences, more advanced forms may require some updates to your CSP in order to function. In this article, we will cover the different places where you can configure your CSP in Salesforce, and how to enable the third-party domains required to get advanced forms working inside an experience.

### CSP Security Settings

To allow third-party resources in your experience cloud site, the first thing you will have to update is your experience cloud sites CSP Security Level. You can do this by going to the Builder for your site under:

**Setup > Feature Settings > Digital Experiences > All Sites**

Once you are on this page, click on "Builder" next to the site where your form is hosted:

[Graphic of Salesforce Admin Console - in salesforce.com](./images/csp-security-settings-1.png)

From here, you will need to update the CSP Security level to "Relaxed CSP" by clicking on the gear icon on the left-hand side and navigating to:

**Security > CSP > Security Level**
[Graphic of Salesforce Admin Console - in salesforce.com](./images/csp-security-settings-1.png)

A Strict CSP security level will always block all external resources, and does not allow for allowed of specific URLs. Relaxed CSP security allows you to allow external URLs for use in your community.

**Images and CSS blocked by CSP**

Our forms allow you to embed images on them. Most commonly, we see images used as a header for the form, or to provide additional context to a specific field or section. Because your experience cloud site will be hosted in its own domain that is different than your Salesforce organization's domain, those images are technically coming from a third-party domain. As an example, I might have a site hosted at https://mycustomercommunity.force.com but uploaded images are hosted inside my Salesforce instance at https//mycompany.my.salesforce.com. because these two URLs are different, our CSP needs to be updated to allow images from my Salesforce domain.

The first indication you will notice when your CSP needs to be updated is this helpful message that should appear when viewing your form inside the experience cloud builder:

[Graphic of Salesforce Admin Console - in salesforce.com](./images/csp-security-settings-1.png)

### INCOMPLETE ARTICLE

This document demonstrates style of a document that describes how to set up a CSP for a Salesforce Digital Experience.
We like the style/structure of the document. The content of the document is **ABSOLUTELY IRRELEVANT** to Formstack or our current task
