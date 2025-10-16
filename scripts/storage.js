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


export async function initializeSeedJson() {
    const seedData = localStorage.getItem(STORAGE_NAME);

    if (!seedData || seedData === '[]') {
        try {
            const response = await fetch('../seed.json');
            if (!response.ok) {
                console.warn("could not find seed data");
                return [];
            }
            const seedTasks = await response.json();

            saveTasks(seedTasks);
            return seedTasks;

        } catch (error) {
            console.error("Error loading the seed data", error);
            return [];
        }
    }
    return loadTasks();
}

export function generateUniqueId() {
    return 'task_' + Date.now() + Math.floor(Math.random() * 1000);
}