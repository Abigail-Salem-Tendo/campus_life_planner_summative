//This file will handle saving a new task and display a success message

import { loadTasks, saveTasks, generateUniqueId } from "./storage.js";// import helper functions from storage.js
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

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent the page from reload after submission

        const formData = { // creating an object with the input values
            title: taskTitle.value.trim(),
            dueDate: dueDate.value,
            duration: duration.value,
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

        const tasks = loadTasks(); // getting the existing tasks
        tasks.push(newTask); // adds the new task
        saveTasks(tasks); // saves all the tasks

        //reset the form
        taskForm.reset();
    });
})