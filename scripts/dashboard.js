import { loadTasks } from "./storage.js";
import { initializeSeedJson } from "./storage.js";

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await initializeSeedJson();

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
        totalTasks: tasks.length
    };
}

function renderStats(stats) {

    const settings = loadSettings();
    const maxTasks = settings.taskCap;
    //create the following ids in the index.html file
    const completed = document.getElementById('completedTasks').textContent = stats.tasksCompleted;
    const overdue = document.getElementById('overdueTasks').textContent = stats.overdueTasks;
    const frequent = document.getElementById('frequentTag').textContent = stats.frequentTag.toUpperCase();


    const totalTasks = stats.totalTasks;
    const capmessage = document.getElementById('capmessage');

    if (capmessage) {
        capmessage.style.display = 'block';

        if (totalTasks > maxTasks) {
            capmessage.textContent = `Congratulations, you have passed your weekly goal of ${maxTasks}`;
            capmessage.style.color = 'green';
            capmessage.style.fontWeight = 'bold';
        } else {
            capmessage.textContent = `You were not able to meet your target of ${maxTasks}`;
            capmessage.style.color = 'red';
            capmessage.style.fontWeight = 'normal';
        }
    }
    //target cap set in settings goes here
    console.log("Dashboard stats claculated", stats);
}