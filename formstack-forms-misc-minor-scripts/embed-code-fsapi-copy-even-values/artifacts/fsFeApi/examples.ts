/**
 * Example usage of the Formstack Forms Renderer API
 */

// Basic form initialization
function initializeForm() {
    FSForm.render({
        id: "123456",
        target: "form-container",
        baseUrl: "https://www.formstack.com"
    });
}

// Form event handling
function setupFormEventListeners() {
    const form = window.fsApi().getForm("123456");

    form.registerFormEventListener({
        type: FormEvents.Submit,
        onFormEvent: async (data) => {
            console.log("Form submitted:", data);
            return Promise.resolve();
        }
    });
}

// Setting form values
async function setFormValues() {
    const form = window.fsApi().getForm("123456");

    await form.setValues({
        "field123": { value: "Test Value" },
        "field456": { 
            first: "John",
            last: "Doe"
        }
    });
}

// Form validation and submission
async function handleFormSubmission() {
    const form = window.fsApi().getForm("123456");

    if (!form.isWithErrors()) {
        const submissionData = form.getSubmissionJSON();
        
        try {
            await submitForm(submissionData);
        } catch (error) {
            console.error("Submission failed:", error);
        }
    }
}

// Multi-page form handling
function handleMultiPageForm() {
    const form = window.fsApi().getForm("123456");

    const pageContext = form.getPagingContext();
    console.log(`Current page: ${pageContext.currentPage} of ${pageContext.totalPages}`);

    form.registerFormEventListener({
        type: FormEvents.ChangePage,
        onFormEvent: async (data) => {
            console.log("Page changed:", data);
            return Promise.resolve();
        }
    });
} 