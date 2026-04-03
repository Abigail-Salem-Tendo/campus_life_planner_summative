//this script will load the data and display it on the taskpage

import { loadTasks, saveTasks } from "./storage.js";
import { searchTasks } from "./search.js";
const statusMessage = document.getElementById("statusMessage");
// Hold the current loaded tasks
let currentTasks = [];

// Update the displayed tasks based on sort or search
function updateTasks() {
    const sortBy = document.getElementById("sortBy");
    const searchInput = document.getElementById("searchTasks");
    const searchText = searchInput ? searchInput.value : "";

    let displayList = searchTasks(currentTasks, searchText);
    // sort the filtered tasks (title, tag, due date)
    sortTasks(sortBy.value, displayList);
// display the final sorted list on the page
    displayTasks(displayList);
    //update the aria live region
    if (statusMessage) {
        statusMessage.textContent = `${displayList.length} tasks found,`;
    }
}

// a function that deletes a task by its id and updates the storage
function deleteTask(id) {
    // filter out tasks that match the id
    currentTasks = currentTasks.filter(task => task.id !== id);
    // save the new task list
    saveTasks(currentTasks);

    updateTasks();

    //Update the aria live region
    if (statusMessage) {
        statusMessage.textContent = 'Task deleted successfully.';
    }
}
 // function to handle the click actions on the edit and delete buttons
function handleAction(e) {
    const target = e.target;
    const taskId = target.getAttribute("data-id");

    if (!taskId) return; // ignore clicks that are not to tasks
    // if user clicks the delete button
    if (target.classList.contains('deleteBtn')) {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(taskId);
        }
    }
    // if user clicks the edit button
    else if (target.classList.contains('editBtn')) {
        window.location.href = `addForm.html?id=${taskId}`;
    }
}

function completionToggle(e) {
    if (!e.target.classList.contains('taskComplete')) return

    const taskId = e.target.getAttribute('data-id');
    const task = currentTasks.find(t => t.id === taskId);

    if (task) {
        task.completed = e.target.checked;
        saveTasks(currentTasks);
        updateTasks();

        //Update ARIA live
        if (statusMessage) {
            statusMessage.textContent = task.completed
                ? `Task "${task.title}" marked complete.`
                : `Task "${task.title}" marked incomplete.`;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const taskTable = document.getElementById('taskTable')
    const sortBy = document.getElementById('sortBy')
    const searchInput = document.getElementById('searchTasks');
    //load existing tasks
    currentTasks = loadTasks();

    //display tasks when the page loads
    updateTasks()
    // display tasks again each time the user changes the sorting
    sortBy.addEventListener('change', updateTasks);

    // filter tasks live as user types
    if (searchInput) {
        searchInput.addEventListener('input', updateTasks);
    } // listen for click in the task table
    if (taskTable) {
        taskTable.addEventListener('click', handleAction);
        taskTable.addEventListener('change', completionToggle);
    }
});
// sort list of tasks by title, tag, or due date
function sortTasks(key, tasksList) {
    tasksList.sort((a, b) => {
        if (key === 'dueDate') {
            // earlier first
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (key === 'title' || key === 'tag') {
            // sort alphabetically
            return a[key].localeCompare(b[key]);
        }
        return 0;
    });
}

// display the html of all the tasks
function displayTasks(tasks) {
    const taskTable = document.getElementById('taskTable')
    // show a message if there are no tasks
    if (tasks.length === 0) {
        taskTable.innerHTML = '<p class="infoMessage">No tasks found. Add a new one!</p>';
        return;
    }
// creating the html for each task but is it necessary in the javascript file
    const taskHtml = tasks.map(task => `
        <div class="taskCard" data-id="${task.id}">
            <div class="taskInfo">
                <input type="checkbox" class="taskComplete" data-id="${task.id}" ${task.completed ? 'checked' : ''}> 
                <div class="taskDetails">
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