# Kanban Board

A simple drag-and-drop Kanban board built with HTML, CSS, and JavaScript. Use it to create tasks, move them between columns, delete tasks, and keep task data stored in the browser.

## Features

- Add new tasks through a modal form
- Drag and drop tasks between `To Do`, `In Progress`, and `Done`
- Delete individual tasks with a Delete button
- Persist tasks using `localStorage`
- Dynamic task counts for each column

## How it works

### HTML

- `index.html` defines the board layout with three columns:
  - `#todo`
  - `#progress`
  - `#done`
- The modal form contains inputs for task title and description and an Add Task button.

### CSS

- `styles.css` styles the board, columns, tasks, and modal.
- Hover state styling highlights columns when a draggable task is over them.
- The modal overlay and panel are centered and styled for better UX.

### JavaScript

- `script.js` initializes DOM references and loads saved tasks from `localStorage`.
- When a task is created or moved, the script:
  - reads task title and description
  - renders a `.task` element with `draggable="true"`
  - attaches drag and delete event handlers
  - updates the task counts in each column
  - saves the current board state to `localStorage`
- The modal closes when clicking outside the form, and form clicks are prevented from closing it.

## Usage

1. Open `index.html` in a browser.
2. Click **Add New Task** to open the modal.
3. Enter task title and description, then click **Add Task**.
4. Drag a task card between columns.
5. Click **Delete** on a task card to remove it.

## File structure

- `index.html` — HTML layout and modal structure
- `styles.css` — board styling and modal appearance
- `script.js` — task creation, drag/drop, delete logic, and persistence
