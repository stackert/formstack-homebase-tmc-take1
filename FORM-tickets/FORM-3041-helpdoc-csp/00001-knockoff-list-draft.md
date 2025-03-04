# Objective

This is a task to create a help documentation article about Content Security Policy (CSP) settings for Forms V4, **specifically to help customers who want to embed forms on their websites that have CSP enabled**.

Key objectives:

1. Document the correct CSP settings needed for Forms V4
2. Create a customer-facing help article similar to the existing Salesforce article[md format, simple sections]
3. Include future settings for new Analytics endpoint [see gabriel about this]
4. Work with Ryan Jorgensen on the documentation process [when complete give final draft to Ryan for review]

Let me check if there are any additional details in the case review files.

### Action Plan (knockoff list)

- Primary output document: `FORM-3041-helpdoc-csp/artifacts/help-forms-csp-header.md`
- Internal documentation: `FORM-3041-helpdoc-csp/artifacts/help-forms-csp-header-internal.md`

Here's what I suggest we do:

1. **Research Phase**:

   > We need to identify all domains and resources that Forms V4 needs access to

Formstack hosts forms at https://[_ACCOUNT_ALIAS_].formstack.com, where [_ACCOUNT_ALIAS_] changes based on the account but is known to use at the time we render the pages.

- Document the specific CSP directives required for:
  - Form embedding
  - Script execution
  - Style loading
  - Image/media resources
  - API endpoints
  - Analytics endpoints (including future ones)

2. **Information Gathering**:

> - Connect with Gabriel regarding CSP requirements

We need to determine this for ourselves and ask Gabriel to verify.

> - Review the existing Salesforce article for structure and format reference
> - Identify any Forms V4-specific requirements that differ from other implementations

3. **Documentation Structure**:
   > - Create a clear, step-by-step guide
   > - Include example CSP headers
   > - Document common issues and troubleshooting steps
   > - Provide separate sections for different use cases (basic embedding, analytics, etc.)

See `FORM-3041-helpdoc-csp/artifacts/Updating-Your-Content-Security-Policy-for-Forms.md`
We are soft on this requirement. We need an effective document that is informative and easy to understand.
Sections should be coherent and label appropriately.

To proceed effectively, I would need:

> 1. Access to Forms V4 technical documentation or codebase to identify all required domains and resources

See `FORM-3041-helpdoc-csp/artifacts/Updating-Your-Content-Security-Policy-for-Forms.md`

> 2. Information about the new Analytics endpoint that needs to be included

Leave to Gabriel to provide this information, after we're complete

> 3. Any existing CSP-related support tickets or common issues that customers have faced

This is a good idea but a little out of scope for our task.

> 4. Contact information for Gabriel to discuss CSP requirements

Gabriel is an internal employee and we'll submit all of our work via Jira for his review.

> 5. Any specific formatting requirements or templates for help documentation

We'll use the `Updating-Your-Content-Security-Policy-for-Forms.md` as a template.

Would you like me to:

1. Start researching the Forms V4 codebase to identify CSP requirements?
2. Draft an outline for the help documentation?
3. Reach out to specific team members for information?

Please let me know which direction you'd like to pursue first, and I'll help coordinate the effort.
