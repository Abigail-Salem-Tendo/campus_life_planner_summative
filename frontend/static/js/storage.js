/**
 * Storage module - now communicates with Flask backend API
 * Manages task data through API calls instead of localStorage
 */

import api from './api.js';

/**
 * Load all tasks from the backend
 * @returns {Promise<Array>} Array of task objects
 */
export async function loadTasks() {
    try {
        const tasks = await api.getTasks();
        return tasks || [];
    } catch (error) {
        console.error("Error loading tasks from API:", error);
        // Return empty array if backend is unavailable
        return [];
    }
}

/**
 * Create a new task in the backend
 * @param {Object} taskData - Task object to create
 * @returns {Promise<Object>} Created task object
 */
export async function createTask(taskData) {
    try {
        const newTask = await api.createTask(taskData);
        return newTask;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

/**
 * Update an existing task
 * @param {string} taskId - ID of task to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated task object
 */
export async function updateTask(taskId, updates) {
    try {
        const updatedTask = await api.updateTask(taskId, updates);
        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

/**
 * Delete a task from the backend
 * @param {string} taskId - ID of task to delete
 * @returns {Promise<Object>} Success message
 */
export async function deleteTask(taskId) {
    try {
        const result = await api.deleteTask(taskId);
        return result;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

/**
 * Toggle task completion status
 * @param {string} taskId - ID of task to toggle
 * @param {boolean} completed - New completion status
 * @returns {Promise<Object>} Updated task object
 */
export async function toggleTaskCompletion(taskId, completed) {
    try {
        const updatedTask = await api.toggleTaskCompletion(taskId, completed);
        return updatedTask;
    } catch (error) {
        console.error("Error toggling task completion:", error);
        throw error;
    }
}

/**
 * Load application settings from backend
 * @returns {Promise<Object>} Settings object
 */
export async function loadSettings() {
    try {
        const settings = await api.getSettings();
        return settings;
    } catch (error) {
        console.error("Error loading settings:", error);
        // Return default settings if backend unavailable
        return { taskCap: 15, durationUnits: 'minutes' };
    }
}

/**
 * Save application settings to backend
 * @param {Object} settings - Settings object to save
 * @returns {Promise<Object>} Updated settings object
 */
export async function saveSettings(settings) {
    try {
        const updatedSettings = await api.updateSettings(settings);
        return updatedSettings;
    } catch (error) {
        console.error("Error saving settings:", error);
        throw error;
    }
}

/**
 * Generate a unique ID for each task
 * Uses timestamp and random number
 * @returns {string} Unique task ID
 */
export function generateUniqueId() {
    return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}