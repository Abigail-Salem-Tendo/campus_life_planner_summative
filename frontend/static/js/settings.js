// this module manages saving and updating the app settings in local storage
const settingsKey = 'appSettings'; // this is the key name for storing the settings

// a function to load saved settings
export function loadSettings() {
    try{
        //get the settings stored in local storage
        const storedSettings = localStorage.getItem(settingsKey);
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
        localStorage.setItem(settingsKey, JSON.stringify(Newsettings));
        console.log("Settings saved", Newsettings)
    } catch (e) {
        console.error("Error saving settings:", e);
    }
}


// save the default settings
document.addEventListener('DOMContentLoaded', () => {
    const taskCap = document.getElementById('taskCap');
    const durationUnits = document.getElementById('durationUnits');
    const saveButton = document.getElementById('saveBtn');
    const statusMessage = document.getElementById('statusMessage');

    if (!taskCap || !durationUnits || !saveButton || !statusMessage) {
        console.error("Error loading missing html element");
        return;
    }

    const settings = loadSettings();
    taskCap.value = settings.taskCap ?? 15;
    durationUnits.value = settings.durationUnits ?? 'minutes';

    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        const newSettings = {
            taskCap: Number(taskCap.value),
            durationUnits: durationUnits.value,
        }
        saveSettings(newSettings);
        //localStorage.setItem('appSettings', JSON.stringify(newSettings));
        statusMessage.textContent = "Settings saved successfully.";
        statusMessage.style.display = 'absolute';

    });
})