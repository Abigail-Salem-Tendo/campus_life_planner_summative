// this module manages saving and updating the app settings in local storage
const settings = 'appSettings'; // this is the key name for storing the settings

// a function to load saved settings
export function loadSettings() {
    try{
        //get the settings stored in local storage
        const storedSettings = localStorage.getItem(settings);
        // if they exist parse them to JSON format
        if (storedSettings) {
            return JSON.parse(storedSettings);
        }
    } catch (e) { // catch any errors
        console.error("Error loading settings:", e);
    }

    return { // return default settings if an error occurs
        taskCap: 15,
        durationUnits: 'minutes'
    };
}
// function to save the users settings to local storage
export function saveSettings(Newsettings) {
    try {
        localStorage.setItem('appSettings', JSON.stringify(Newsettings));
        console.log("Settings saved", Newsettings)
    } catch (e) {
        console.error("Error saving settings:", e);
    }
}
// set the default settings
const defaultSettings = {
    taskCap: 15,
    durationUnits: 'minutes'
}

// save the default settings
document.addEventListener('DOMContentLoaded', () => {
    const taskCap = document.getElementById('taskCap');
    const durationUnits = document.getElementById('durationUnit');
    const saveButton = document.querySelector('.saveBtn');

    if (!taskCap || !durationUnits || !saveButton) {
        console.error("Error loading missing html element");
        return;
    }

    const settings = loadSettings();
    taskCap.value = settings.taskCap ?? 15;
    durationUnits.value = settings.durationUnit ?? 'minutes';

    saveButton.addEventListener('click', () => {
        const newSettings = {
            taskCap: Number(taskCap.value),
            durationUnits: durationUnits.value,
        }
        saveSettings(newSettings);
        //localStorage.setItem('appSettings', JSON.stringify(newSettings));
        alert("Settings saved successfully")
    });
})