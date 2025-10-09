# Campus Life Planner
   
**Purpose**

The Campus Life Planner helps students organize their academic and social life by tracking tasks, events, and goals in one place.
Users can add, edit, and search through their activities using regex-powered filters, visualize progress in a dashboard,
and manage their productivity through accessible, responsive interfaces.

**Planned Features**
- Add, edit, delete tasks and events
- Sort and search tasks using regex patterns
- Dashboard with weekly trend chart and totals
- Local storage persistence (auto-save)
- Import/export tasks in JSON
- Settings for time units (minutes ↔ hours)
- Keyboard-friendly and accessible design
- Responsive layout for mobile, tablet, desktop

**The Data Model**
This is an example of how the data would look like
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
- Test navigation using only the Tab key and make sure every interactive element (buttons, links, inputs) is reachable and usable.
- Use ARIA labels where needed to make interactive icons and buttons understandable for screen reader users.
- Use accessible color palettes with a contrast ratio of at least 4.5:1 for text. Buttons and links will be visually distinct.
- Write meaningful alt text for all images, especially for profile and project images.

