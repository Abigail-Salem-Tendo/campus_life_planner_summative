//creating the storage module
const STORAGE_NAME = 'campusLifeData';

export function loadTasks() {
    try {
        const data = localStorage.getItem(STORAGE_NAME);
        //return a javascript list of an empty list if no data has been saved
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function saveTasks(tasks) {
    try {
        //converting the javascript list to JSON format
        localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks));
    } catch (error) {
        console.log("There as an error saving to local storage:", error);
    }
}

export function generateUniqueId() {
    return 'task_' + Date.now() + Math.floor(Math.random() * 1000);
}