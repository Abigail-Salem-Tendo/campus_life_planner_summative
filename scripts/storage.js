//creating the storage module that manages the saving, loading and initialization of task data
const STORAGE_NAME = 'campusLifeData';

// creating a function that loads all saved tasks
export function loadTasks() {
    try {
        const data = localStorage.getItem(STORAGE_NAME); // get the stored data as a string from local storage

        //return a javascript list of an empty list if no data has been saved
        return data ? JSON.parse(data) : [];
    } catch (error) {
        // log any unexpected errors
        console.error(error);
        return [];
    }
}

// A function that saves all the tasks
export function saveTasks(tasks) {
    try {
        //converting the javascript list to JSON format
        localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks));
    } catch (error) {
        // catch any errors
        console.log("There as an error saving to local storage:", error);
    }
}

// initialize app with seed data
export async function initializeSeedJson() {
    // first check if there is data in the local storage
    const seedData = localStorage.getItem(STORAGE_NAME);

    // if theres no data, load from the seed.json
    if (!seedData || seedData === '[]') {
        try {
            // get the default seed data from the json file
            const response = await fetch('/seed.json');
            // handle missing JSON files gracefully
            if (!response.ok) {
                console.warn("could not find seed data");
                return [];
            }

            // convert the JSON to JavaScript objects
            const seedTasks = await response.json();
            // save the seed data to local storage
            saveTasks(seedTasks);
            // return the initialized task list
            return seedTasks;

        } catch (error) {
            // log errors that might occur
            console.error("Error loading the seed data", error);
            return [];
        }
    }
    // load tasks if it already exists
    return loadTasks();
}

// generat a unique ID for each task
// use a timestamp and unique number
export function generateUniqueId() {
    return 'task_' + Date.now() + Math.floor(Math.random() * 1000);
}