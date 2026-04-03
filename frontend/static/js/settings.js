// this module manages saving and updating the app settings via API
import { loadSettings, saveSettings } from "./storage.js";

// save the settings using the API
document.addEventListener('DOMContentLoaded', async () => {
    const taskCap = document.getElementById('taskCap');
    const durationUnits = document.getElementById('durationUnits');
    const saveButton = document.getElementById('saveBtn');
    const statusMessage = document.getElementById('statusMessage');

    if (!taskCap || !durationUnits || !saveButton || !statusMessage) {
        console.error("Error loading missing html element");
        return;
    }

    // Load settings from API
    try {
        const settings = await loadSettings();
        taskCap.value = settings.taskCap ?? 15;
        durationUnits.value = settings.durationUnits ?? 'minutes';
    } catch (error) {
        console.error("Error loading settings:", error);
        // Use defaults if loading fails
        taskCap.value = 15;
        durationUnits.value = 'minutes';
    }

    saveButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const newSettings = {
            taskCap: Number(taskCap.value),
            durationUnits: durationUnits.value,
        }

        try {
            // Save to backend API
            await saveSettings(newSettings);
            statusMessage.textContent = "Settings saved successfully.";
            statusMessage.style.display = 'block';
            statusMessage.style.color = 'green';
        } catch (error) {
            console.error("Error saving settings:", error);
            statusMessage.textContent = "Failed to save settings.";
            statusMessage.style.display = 'block';
            statusMessage.style.color = 'red';
        }
    });
})