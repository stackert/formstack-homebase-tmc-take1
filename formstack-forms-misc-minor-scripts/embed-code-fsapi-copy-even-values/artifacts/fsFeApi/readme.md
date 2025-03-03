# Formstack Forms Renderer Documentation

## Purpose

This documentation package provides comprehensive information about the Formstack Forms Renderer API, including interfaces, types, and practical code examples. It's designed to help developers integrate and interact with Formstack forms in their applications without needing direct access to the source codebase.

## File Structure

### 1. FormstackAPI.ts

This file contains the core TypeScript interfaces and types used by the Forms Renderer API. It includes:

- `TFSForm`: Main form renderer interface
- `FormRenderOptions`: Configuration options for form rendering
- `IFormApi`: Core API interface for form manipulation
- `FormEvents`: Enum of available form events
- Field value interfaces for different field types (text, name, address, etc.)

Use this file as a reference for type checking and understanding the API structure.

### 2. examples.ts

Contains functional TypeScript examples demonstrating common use cases:

- Basic form initialization
- Event listener setup
- Form value manipulation
- Form validation and submission
- Multi-page form handling

These examples are written as functions that can be imported and used in TypeScript projects.

### 3. code-snippets.html

Provides ready-to-use JavaScript code snippets that can be copied directly into HTML pages. Includes examples for:

- Form initialization with HTML container
- Submit event handling with custom endpoints
- Auto-populating form fields
- Field change listeners
- Multi-page form navigation
- Form validation handling

Each snippet is self-contained and includes necessary comments for implementation.

## Getting Started

1. Review `FormstackAPI.ts` to understand available interfaces and types
2. Check `examples.ts` for TypeScript implementation examples
3. Use `code-snippets.html` for quick copy-paste solutions

## Usage Example

Basic form initialization:

```javascript
window.FSForm.render({
  id: "YOUR_FORM_ID",
  target: "form-container",
  baseUrl: "https://www.formstack.com",
});
```

## Form Events

The Forms Renderer provides several events you can listen for:

- `ready`: Fired when the form is fully loaded
- `submit`: Fired when form is submitted
- `calculations-complete`: Fired after field calculations
- `validation-complete`: Fired after form validation
- `next-page`/`prev-page`: Fired during multi-page navigation
- `error`: Fired when an error occurs
- `change`: Fired when field values change
- `change-page`: Fired when switching between pages

## Field Types and Values

Different field types require different value structures:

```javascript
// Text field
{ value: "Some text" }

// Name field
{
    first: "John",
    last: "Doe",
    middle: "A"
}

// Address field
{
    address: "123 Main St",
    city: "Boston",
    state: "MA",
    zip: "02108"
}
```

## Best Practices

1. Always wait for the 'ready' event before manipulating forms
2. Handle form submission errors gracefully
3. Return Promise.resolve() from all event listeners
4. Use type definitions for better code completion
5. Test form interactions in multiple browsers

## Additional Resources

- [Live API Documentation](https://live-form-api.formstack.com)
- [Formstack Developer Documentation](https://developers.formstack.com)

## Notes

- Replace "YOUR_FORM_ID" with your actual form ID in all examples
- All event listeners should return a Promise
- Form API is accessible through `window.fsApi()`
- Field IDs can be found in the form builder or through the API
- The API supports both single-page and multi-page forms
