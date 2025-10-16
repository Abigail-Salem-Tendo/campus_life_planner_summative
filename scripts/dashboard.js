// this file contains the logic of the dashboard and statistics page
import { loadTasks } from "./storage.js";
import { initializeSeedJson } from "./storage.js";
import { loadSettings } from "./settings.js";

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await initializeSeedJson(); // gets tasks from the seed.json file
    const stats = calculatedStats(tasks); // calculates the completed, overdue, and most frequent tags
    // display the stats on the dashboard
    displayStats(stats);
});

//function the returns the date of one week ago
function oneWeekAgoDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return weekAgo;
}

// a function to calculate various statistics from the tasks
function calculatedStats(tasks) {
    const weekAgo = oneWeekAgoDate();
    const startToday = new Date(new Date().setHours(0, 0, 0, 0));

    const overdueTasks = tasks.filter((task) => { // finds all the overdue tasks
        const dueDate = new Date(task.dueDate);
        return !task.completed && startToday > dueDate;
    });
    // finds all the tasks completed in the last week
    const completedWeekly = tasks.filter((task) => {
        return task.completed && new Date(task.updatedAt) >= weekAgo;
    });

    // counts how many times a tag(category) appears in all tasks
    const tagCount = tasks.reduce((counts, task) => {
        const tag = task.tag.toLowerCase();
        counts[tag] = (counts[tag] || 0) + 1;
        return counts;
    }, {});

    // this bloack of code is to find out the tag that appears most frequent
    let frequentTag = 'N/A';
    let maxcount = 0;
    for (const tag in tagCount) {
        if (tagCount[tag] > maxcount) {
            maxcount = tagCount[tag];
            frequentTag = tag;
        }
    }

    return { // return all calculated stats as an object
        tasksCompleted: completedWeekly.length,
        overdueTasks: overdueTasks.length,
        frequentTag: frequentTag,
        totalTasks: tasks.length
    };
}

// A function that displays that stats on the dashboard
function displayStats(stats) {
    // load the users settings
    const settings = loadSettings();
    const maxTasks = settings.taskCap;
    // ids in html?
    //dashboard elements should be updated with calculated stats
    const completed = document.getElementById('completedTasks').textContent = stats.tasksCompleted;
    const overdue = document.getElementById('overdueTasks').textContent = stats.overdueTasks;
    const frequent = document.getElementById('frequentTag').textContent = stats.frequentTag.toUpperCase();

// checking the total tasks with the target tasks
    const totalTasks = stats.totalTasks;
    const capmessage = document.getElementById('capmessage');

    if (capmessage) {
        capmessage.style.display = 'block';

        if (totalTasks > maxTasks) { // if the user has surpassed their weekly goal
            capmessage.textContent = `Congratulations, you have passed your weekly goal of ${maxTasks}`;
            capmessage.style.color = 'green';
            capmessage.style.fontWeight = 'bold';
        } else { // inform the user they were not able to hit thier weekly target
            capmessage.textContent = `You were not able to meet your target of ${maxTasks}`;
            capmessage.style.color = 'red';
            capmessage.style.fontWeight = 'normal';
        }
    }
    //target cap set in settings goes here
    console.log("Dashboard stats claculated", stats);
}