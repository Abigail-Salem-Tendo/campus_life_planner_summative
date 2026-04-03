//this module will handle the logic of searching for different tasks

// I am exporting this function so that other modules can use it too
export function searchTasks(tasks, searchText) {

    const safeSearch = searchText || ""; // making sure the search test is a string to prevent null errors
    // trim the white spaces and convert it to lowercase
    const text = safeSearch.trim().toLowerCase();

    if (text === '') { // if the search box is empty show all tasks
        return tasks
    }
    // filtering the tasks to those with title or tag in the search bar
    return tasks.filter((task) => {
        const title = task.title.toLowerCase();
        const tag = task.tag.toLowerCase();

        return title.includes(text) || tag.includes(text);
    })
}