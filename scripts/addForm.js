//This file will handle saving a new task and display a success message

import { loadTasks, saveTasks, generateUniqueId } from "./storage.js";
import { validateTaskForm } from "./validators.js";

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('taskForm');
    const statusMessage = document.getElementById('statusMessage');

    if (!taskForm) return;

    const taskTitle = document.getElementById('taskTitle');
    const dueDate = document.getElementById('dueDate');
    const duration = document.getElementById('duration');
    const tag = document.getElementById('tag');

    statusMessage.style.display = 'none';

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            title: taskTitle.value.trim(),
            dueDate: dueDate.value,
            duration: duration.value,
            tag: tag.value.trim(),
        };

        const validationErrors = validateTaskForm(formData);

        if (validationErrors.length > 0) {

            statusMessage.style.backgroundColor = '#fce3e6';
            statusMessage.style.color = '#cc0033';

            statusMessage.textContent = validationErrors.join('\n');
            statusMessage.style.display = 'block';

            return;
        }

        const newTask = {
            id: generateUniqueId(),
            title: taskTitle.value.trim(),
            dueDate: dueDate.value.trim(),
            duration: duration.value.trim(),
            tag: tag.value.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        //save the new task
        const tasks = loadTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        //displaying the success message
        statusMessage.style.backgroundColor = '#a8d39b';
        statusMessage.style.color = 'green';
        statusMessage.textContent = "Successfully added a new task";
        statusMessage.style.display = 'block';

        //reset the form
        taskForm.reset();
        setTimeout(() => {
            statusMessage.style.display = 'none';
            statusMessage.textContent = '';
        }, 4000);
    });

})