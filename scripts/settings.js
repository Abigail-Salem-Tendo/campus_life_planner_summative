const settings = 'appSettings';

export function loadSettings() {
    try{
        const storedSettings = localStorage.getItem(settings);
        if (storedSettings) {
            return JSON.parse(storedSettings);
        }
    } catch (e) {
        console.error("Error loading settings:", e);
    }

    return {
        taskCap: 15,
        durationUnits: 'minutes'
    };
}

export function saveSettings(settings) {
    try {
        localStorage.setItem(settings, JSON.stringify(settings));
        console.log("Settings saved", settings)
    } catch (e) {
        console.error("Error saving settings:", e);
    }
}

saveSettings(settings);