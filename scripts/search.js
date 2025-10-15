//this module will handle the logic of searching for different tasks

export function searchTasks(tasks, searchText) {
    const safeSearch = searchText || "";
    const text = safeSearch.trim().toLowerCase();

    if (text === '') {
        return tasks;
    }

    return tasks.filter((task) => {
        const title = task.title.toLowerCase();
        const tag = task.tag.toLowerCase();

        return title.includes(text) || tag.includes(text);
    });
}