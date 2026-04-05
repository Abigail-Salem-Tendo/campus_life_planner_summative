// this module manages saving and updating the app settings via API
import { loadSettings, saveSettings } from "./storage.js";

// save the settings using the API
document.addEventListener('DOMContentLoaded', async () => {
    const settingsForm = document.getElementById('settingsForm');
    const taskCap = document.getElementById('taskCap');
    const durationUnits = document.getElementById('durationUnits');
    const statusMessage = document.getElementById('statusMessage');

    if (!taskCap || !durationUnits || !settingsForm || !statusMessage) {
        console.error("Error loading missing html element");
        return;
    }

    // Load settings from API
    try {
        const settings = await loadSettings();
        taskCap.value = settings.taskCap ?? 15;
        durationUnits.value = settings.durationUnits ?? 'minutes';
        console.log('Settings loaded:', settings);
    } catch (error) {
        console.error("Error loading settings:", error);
        // Use defaults if loading fails
        taskCap.value = 15;
        durationUnits.value = 'minutes';
    }

    // Listen for form submit event instead of button click
    settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newSettings = {
            taskCap: Number(taskCap.value),
            durationUnits: durationUnits.value,
        }

        console.log('Saving settings:', newSettings);

        try {
            // Save to backend API
            const result = await saveSettings(newSettings);
            console.log('Settings saved successfully:', result);
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