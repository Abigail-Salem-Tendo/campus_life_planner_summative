//this file contains the regex patterns to validate user input

// the task title can include letters only both upper and lower case,
//include spaces and hyphens between words
const regexTitle = /^[A-Za-z]+(?:[\s-][A-Za-z]+){0,4}$/;

// the task duration should be a number and can include a unit (min, minutes, hr, hour hours
const regexDuration = /^\d+\s*(min(ute)?s?|hr|hour|hours)?$/i;

// the tag must be between 3 to 25 letters
const regexTag = /^[a-zA-Z]{3,15}$/;

//do not allow the word urgent
const regexAdvancedUrgent = /^(?!.*urgent.*)/i;

export function validateTaskForm(formData) {
    // start by validating the task title
    if (!regexTitle.test(formData.title)) {
        alert("Task title must be 5-50 characters.");
        return false;
    }
    // validate the duration input
    if (!regexDuration.test(formData.duration)) {
        alert("Duration must be less than 4 hours.");
        return false;
    }
    // validate tag/category input
    if (!regexTag.test(formData.tag)) {
        alert("Please type one word for the tag.");
        return false;
    }
    // the word urgent not allowed
    if (!regexAdvancedUrgent.test(formData.title)) {
        alert("Task title should not include the word 'urgent'.")
        return false;
    }
    // all validations passed
    return true;
}