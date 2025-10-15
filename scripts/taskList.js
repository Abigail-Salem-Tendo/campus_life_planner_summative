//this script will load the data and display it on the taskpage

import { loadTasks, saveTasks } from "./storage.js";
import { searchTasks } from "./search.js";

let currentTasks = [];

function updateTasks() {
    const sortBy = document.getElementById("sortBy");
    const searchInput = document.getElementById("searchTasks");
    const searchText = searchInput ? searchInput.value : "";

    let displayList = searchTasks(currentTasks, searchText);

    sortTasks(sortBy.value, displayList);

    renderTasks(displayList);
}

function deleteTask(id) {
    currentTasks = currentTasks.filter(task => task.id !== id);

    saveTasks(currentTasks);

    updateTasks();
}

function handleAction(e) {
    const target = e.target;
    const taskId = target.getAttribute("data-id");

    if (!taskId) return;

    if (target.classList.contains('deleteBtn')) {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(taskId);
        }
    }
    else if (target.classList.contains('editBtn')) {
        window.location.href = `addForm.html?id=${taskId}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.getElementById('taskTable')
    const sortBy = document.getElementById('sortBy')
    const searchInput = document.getElementById('searchTasks');
    //load and render
    currentTasks = loadTasks();
    //sortTasks('dueDate');
    //renderTasks(currentTasks);
    updateTasks()

    sortBy.addEventListener('change', updateTasks);

    if (searchInput) {
        searchInput.addEventListener('input', updateTasks);
    }
    if (taskTable) {
        taskTable.addEventListener('click', handleAction);
    }
});

function sortTasks(key, tasksList) {
    tasksList.sort((a, b) => {
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