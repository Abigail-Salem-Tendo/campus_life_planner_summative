//This file will handle saving a new task and display a success message

import { createTask, generateUniqueId } from "./storage.js";// import helper functions from storage.js
//import the validation function to validate user input
import { validateTaskForm } from "./validators.js";

//This wait for the page to load completely before running the code
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('taskForm');

    // get the form input html elements
    const taskTitle = document.getElementById('taskTitle');
    const dueDate = document.getElementById('dueDate');
    const duration = document.getElementById('duration');
    const tag = document.getElementById('tag');

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent the page from reload after submission

        const formData = { // creating an object with the input values
            title: taskTitle.value.trim(),
            dueDate: dueDate.value,
            duration: parseInt(duration.value),
            tag: tag.value.trim(),
        };

        if (!validateTaskForm(formData)) return


        // creating a new object with all the required values
        const newTask = {
            id: generateUniqueId(),
            title: formData.title,
            dueDate: formData.dueDate,
            duration: formData.duration,
            tag: formData.tag,
            completed: false, //adding a new field
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            // Save the new task to the backend API
            await createTask(newTask);

            //reset the form
            taskForm.reset();

            // Show success message (optional)
            alert('Task created successfully!');

            // Redirect to tasks page to see the new task
            window.location.href = 'tasks.html';
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }
    });
})