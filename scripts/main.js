import { loadTasks } from "./storage.js";

document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', (e) => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    const tasks = loadTasks();

    const stats = calculatedStats(tasks);

    renderStats(stats);
});

function oneWeekAgoDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return weekAgo;
}

function calculatedStats(tasks) {
    const weekAgo = oneWeekAgoDate();
    const startToday = new Date(new Date().setHours(0, 0, 0, 0));

    const overdueTasks = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);

        return !task.completed && dueDate < startToday;
    });
    const completedWeekly = tasks.filter((task) => {
        return task.completed && new Date(task.updatedAt) >= weekAgo;
    });

    const tagCount = tasks.reduce((counts, task) => {
        const tag = task.tag.toLowerCase();
        counts[tag] = (counts[tag] || 0) + 1;
        return counts;
    }, {});

    let frequentTag = 'N/A';
    let maxcount = 0;
    for (const tag in tagCount) {
        if (tagCount[tag] > maxcount) {
            maxcount = tagCount[tag];
            frequentTag = tag;
        }
    }

    return {
        tasksCompleted: completedWeekly.length,
        overdueTasks: overdueTasks.length,
        frequentTag: frequentTag,
        tagCount: tagCount
    };
}

function renderStats(stats) {
    //create the following ids in the index.html file
    document.getElementById('completedTasks').textContent = stats.tasksCompleted;
    document.getElementById('overdueTasks').textContent = stats.overdueTasks;
    document.getElementById('frequentTag').textContent = stats.frequentTag.toUpperCase();

    //target cap set in settings goes here
    console.log("Dashboard stats claculated", stats);
}
