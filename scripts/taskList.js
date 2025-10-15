//this script will load the data and display it on the taskpage

import { loadTasks } from "./storage.js";

let currentTasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.getElementById('taskTable')
    const sortBy = document.getElementById('sortBy')

    //load and render
    currentTasks = loadTasks();
    sortTasks('dueDate');
    renderTasks(currentTasks);

    sortBy.addEventListener('change', () => {
        sortTasks(sortBy.value);
        renderTasks(currentTasks);
    });
});

function sortTasks(key) {
    currentTasks.sort((a, b) => {
        if (key === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (key === 'title' || key === 'tag') {
            return a[key].localeCompare(b[key]);
        }
        return 0;
    });
}

function renderTasks(tasks) {
    const taskTable = document.getElementById('taskTable')

    if (tasks.length === 0) {
        taskTable.innerHTML = '<p class="info-message">No tasks found. Add a new one!</p>';
        return;
    }

    const taskHtml = tasks.map(task => `
        <div class="taskCard" data-id="${task.id}">
            <div class="taskInfo">
                <input type="checkbox" class="taskComplete"> 
                <div class="task-details">
                    <h3>${task.title}</h3>
                    <p>Due: ${task.dueDate} | Duration: ${task.duration} min</p>
                </div>
            </div>
            <div class="taskActions">
                <span class="tag">${task.tag}</span>
                <button class="btn editBtn" data-id="${task.id}">Edit</button>
                <button class="btn deleteBtn" data-id="${task.id}">Delete</button>
            </div>
        </div>
    `).join('');

    taskTable.innerHTML = taskHtml;
}