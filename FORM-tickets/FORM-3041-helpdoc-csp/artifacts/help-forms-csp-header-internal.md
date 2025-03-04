# Formstack CSP Header Internal Documentation

url: https://formstack.atlassian.net/wiki/spaces/DEV/pages/4167729155/Forms+Content-Security-Policy+Header+changes

This is copy/pasted from our internal documentation.
This serves as a good explanation of Formstack's CSP headers.

## Document Content

The inclusion of the new Content-Security-Policy header was delivered to production behind a beta flag on Monday, March 25th, 2024. With this change, scripts, styles, images, audio, videos, and iframes must have their origin declared in this header so that they can be loaded correctly. Our security scanning software (Acunetix) has been activated and the results indicate this work satisfied the original security concern.

The header is dynamically generated within the Forms application and must include form customizations.

Tests were carried out on fields such as Description and Embedded to ensure that all content loads correctly. Tests were also carried out on the headers and footers of custom themes.

This change is currently behind a Beta Flag in FCP so the support team can also have a way to trigger it. You should see it as:

`Add Content Security Policy Header`

[Graphic of FCP Beta Flag]

**In any eventual problem, deactivating this flag should solve the issue for the customer.**

### How to confirm a Content-Security-Policy issue

If some content is not loading, you can check the browser inspector on the console tab and look for a message like this:
[Graphic
Refused to [load|execute]the [resource] [url] because it violates the following Content Security Policy directive [csp directive: image-src [others?...]]
]

Any message saying that some resource wasn’t loaded because it violates the Content Security Policy needs to be reported to the forms team to investigate the reason that content wasn’t included.

Some variations of that message also can be like Refused to execute inline script.

Customers may report an issue with their Content Security Policy, typically when they embed our forms on their website. This is a different issue and must be solved on their site to allow all the right resources.

#Customer’s CSP Blocking Forms
It is possible that a customer’s CSP will block the loading of embedded forms on their website. This is a problem we have seen in the past, and it is unrelated to our implementation of the CSP on Formstack.

To explore this issue, here is a Slack thread [link](https://formstack.slack.com/archives/C3LQ7KNFN/p1718740997133829) of an example where the customer’s CSP is blocking the rendering of a live form in their website.

### Implicit Sources Managed in the Live Form

We are actively scanning content in the customer’s header/footer and embed code fields on the live form.

When we see a data source not in the explicit sources list (below), we add a NONCE to allow that data source for that one form.

This means that any external data source a customer has embedded into their live form will be allowed when the form is loaded.

### Explicit Sources Identified in our Content Security Policy

#### Default Source:

- ".stripe.com",
- "dev.visualwebsiteoptimizer.com",
- ".wistia.com",
- ".pusher.com",
- "wss://.pusher.com",
- "wss://.drift.com",
- ".segment.com",
- ".segment.io",
- ".litix.io",
- ".1drv.ms",
- ".google.com",
- "\*.dropbox.com"

#### Style Source

- "fonts.googleapis.com"

#### Script Source

- "dev.visualwebsiteoptimizer.com",
- "js.driftt.com",
- "js.stripe.com",
- "http://ajax.googleapis.com ",
- "www.googletagmanager.com",
- "browser-intake-datadoghq.com",
- "http://code.jquery.com ",
- "fast.wistia.com",
- ".litix.io",
- ".akamaihd.net",
- ".truendo.com",
- "http://app.pendo.io ",
- ".pusher.com",
- "\*.segment.com",

#### Image SRC

- ".amazonaws.com"
- ".visualwebsiteoptimizer.com"
- "http://www.gravatar.com "
- "data: http://w3.org/2000/svg "
- "fast.wistia.com"
- "embed-ssl.wistia.com"
- ".1drv.ms"
- ".google.com"
- ".dropbox.com"

#### Font SRC

- ".cdn-formstack.com"
- "fonts.gstatic.com"
- "fast.wistia.com"
- "data: application/x-font-woff"

#### Frame SRC

- "js.stripe.com"
- "js.driftt.com"
