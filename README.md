# Campus Life Planner
   
**Purpose**

The Campus Life Planner helps students organize their academic and social life by tracking tasks, events, and goals in one place.
Users can add, edit, and search through their activities using regex-powered filters, visualize progress in a dashboard,
and manage their productivity through accessible, responsive interfaces.

**Planned Features**
- Add, edit, delete tasks and events
- Sort and search tasks using regex patterns
- Dashboard with weekly trend chart and total tasks completed
- Local storage(auto-save)
- Settings for time units (minutes ↔ hours)
- Responsive layout for mobile and desktop

**The Data Model**
This is an example of how the data would look like

Each record will have an ID, a title, duration, due date,
a timestamp and date of when each task was created and updated.
```
{
"id": "task_001",
"title": "Attend AI Club meeting",
"duration": 90,
"tag": "Extracurricular",
"dueDate": "2025-10-09",
"createdAt": "2025-10-07T08:00:00Z",
"updatedAt": "2025-10-07T08:00:00Z"
}
```

**Accessibility Plan**

***Goals***

- Use proper semantic HTML tags to structure my pages, helping assistive technologies navigate content correctly.
- Make sure interactive elements are usable with the keyboard
- Use aria-live for status updates
- Write meaningful alt text for all images, especially for profile and project images.
