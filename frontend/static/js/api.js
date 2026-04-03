/**
 * API Client for Campus Life Planner
 * Handles all communication with the Flask backend
 */

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * API Client object with methods for all backend operations
 */
const api = {
    /**
     * Generic fetch wrapper with error handling
     */
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            // Handle non-OK responses
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    },

    // ============ TASK OPERATIONS ============

    /**
     * Get all tasks from the backend
     * @returns {Promise<Array>} Array of task objects
     */
    async getTasks() {
        return await this.request('/tasks');
    },

    /**
     * Get a specific task by ID
     * @param {string} taskId - The task ID
     * @returns {Promise<Object>} Task object
     */
    async getTask(taskId) {
        return await this.request(`/tasks/${taskId}`);
    },

    /**
     * Create a new task
     * @param {Object} taskData - Task data (id, title, dueDate, duration, tag, completed)
     * @returns {Promise<Object>} Created task object
     */
    async createTask(taskData) {
        return await this.request('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    },

    /**
     * Update an existing task
     * @param {string} taskId - The task ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated task object
     */
    async updateTask(taskId, updates) {
        return await this.request(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    },

    /**
     * Delete a task
     * @param {string} taskId - The task ID
     * @returns {Promise<Object>} Success message
     */
    async deleteTask(taskId) {
        return await this.request(`/tasks/${taskId}`, {
            method: 'DELETE'
        });
    },

    /**
     * Toggle task completion status
     * @param {string} taskId - The task ID
     * @param {boolean} completed - New completion status
     * @returns {Promise<Object>} Updated task object
     */
    async toggleTaskCompletion(taskId, completed) {
        return await this.updateTask(taskId, { completed });
    },

    // ============ SETTINGS OPERATIONS ============

    /**
     * Get application settings
     * @returns {Promise<Object>} Settings object (taskCap, durationUnits)
     */
    async getSettings() {
        return await this.request('/settings');
    },

    /**
     * Update application settings
     * @param {Object} settingsData - Settings to update (taskCap, durationUnits)
     * @returns {Promise<Object>} Updated settings object
     */
    async updateSettings(settingsData) {
        return await this.request('/settings', {
            method: 'PUT',
            body: JSON.stringify(settingsData)
        });
    },

    // ============ HEALTH CHECK ============

    /**
     * Check if the backend is healthy
     * @returns {Promise<Object>} Health status
     */
    async healthCheck() {
        const response = await fetch('http://localhost:5000/health');
        return await response.json();
    }
};

// Export for use in other modules
export default api;
