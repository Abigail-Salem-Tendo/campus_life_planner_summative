//This file will handle saving a new task and display a success message

import { createTask, updateTask, loadTask, generateUniqueId } from "./storage.js";// import helper functions from storage.js
//import the validation function to validate user input
import { validateTaskForm } from "./validators.js";

//This wait for the page to load completely before running the code
document.addEventListener("DOMContentLoaded", async () => {
    const taskForm = document.getElementById('taskForm');
    const formTitle = document.querySelector('.formSection h2');
    const submitBtn = taskForm.querySelector('button[type="submit"]');
    const params = new URLSearchParams(window.location.search);
    const editTaskId = params.get('id');

    // get the form input html elements
    const taskTitle = document.getElementById('taskTitle');
    const dueDate = document.getElementById('dueDate');
    const duration = document.getElementById('duration');
    const tag = document.getElementById('tag');

    // Prefill the form when editing an existing task
    if (editTaskId) {
        try {
            const existingTask = await loadTask(editTaskId);
            taskTitle.value = existingTask.title || '';
            dueDate.value = existingTask.dueDate || '';
            duration.value = existingTask.duration ?? '';
            tag.value = existingTask.tag || '';

            if (formTitle) formTitle.textContent = 'Edit Task';
            if (submitBtn) submitBtn.textContent = 'Update Task';
        } catch (error) {
            console.error('Error loading task for editing:', error);
            alert('Could not load the selected task. Redirecting to tasks page.');
            window.location.href = 'tasks.html';
            return;
        }
    }

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent the page from reload after submission

        const formData = { // creating an object with the input values
            title: taskTitle.value.trim(),
            dueDate: dueDate.value,
            duration: parseInt(duration.value),
            tag: tag.value.trim(),
        };

        if (!validateTaskForm(formData)) return


        try {
            if (editTaskId) {
                // Update an existing task
                await updateTask(editTaskId, {
                    title: formData.title,
                    dueDate: formData.dueDate,
                    duration: formData.duration,
                    tag: formData.tag,
                });
                alert('Task updated successfully!');
            } else {
                // Create a new task
                const newTask = {
                    id: generateUniqueId(),
                    title: formData.title,
                    dueDate: formData.dueDate,
                    duration: formData.duration,
                    tag: formData.tag,
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                await createTask(newTask);
                alert('Task created successfully!');
            }

            //reset the form
            taskForm.reset();

            // Redirect to tasks page to see the new task
            window.location.href = 'tasks.html';
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Failed to save task. Please try again.');
        }
    });
})