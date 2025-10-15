//this file contains the regex patterns

const regexTitle = /^[A-Za-z]+(?:[\s-][A-Za-z]+){0,4}$/;
const regexDuration = /^\d+\s*(min(ute)?s?|hr|hour|hours)?$/i;
const regexTag = /^[a-zA-Z]{3,15}$/;
const regexAdvancedUrgent = /^(?!.*urgent.*)/i;

export function validateTaskForm(formData) {
    let errors = [];

    if (!regexTitle.test(formData.title)) {
        errors.push("Task title must be 5-50 characters.");
    }
    if (!regexDuration.test(formData.duration)) {
        errors.push("Duration must be less than 4 hours.");
    }
    if (!regexTag.test(formData.tag)) {
        errors.push("Please select a category");
    }

    if (!regexAdvancedUrgent.test(formData.title)) {
        errors.push("Task title should not include the word 'urgent'.")
    }

    return errors;
}