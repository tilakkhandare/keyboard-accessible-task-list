const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const statusAnnouncer = document.getElementById('status-announcer');

let tasks = [
  { id: 1, text: 'Review ARIA attributes and keyboard roles', completed: true },
  { id: 2, text: 'Test navigation using only Tab, Enter, and Space', completed: false },
  { id: 3, text: 'Submit keyboard accessibility project', completed: false }
];

function announce(message) {
  statusAnnouncer.textContent = '';
  setTimeout(() => {
    statusAnnouncer.textContent = message;
  }, 50);
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No tasks available. Type above and press Enter to add one.';
    taskList.appendChild(emptyItem);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `${task.text}, ${task.completed ? 'completed' : 'incomplete'}`);

    // Toggle area with keyboard support
    const toggleSpan = document.createElement('span');
    toggleSpan.className = 'task-toggle';
    toggleSpan.setAttribute('role', 'checkbox');
    toggleSpan.setAttribute('aria-checked', String(task.completed));
    toggleSpan.setAttribute('tabindex', '0');

    const checkboxBox = document.createElement('span');
    checkboxBox.className = 'checkbox-indicator';
    checkboxBox.setAttribute('aria-hidden', 'true');
    checkboxBox.textContent = task.completed ? '✓' : '';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    toggleSpan.appendChild(checkboxBox);
    toggleSpan.appendChild(textSpan);

    // Click and Keydown (Enter / Space) listeners for toggling
    toggleSpan.addEventListener('click', () => toggleTask(task.id));
    toggleSpan.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTask(task.id);
      }
    });

    // Also allow pressing Enter or Space directly when focused on the list item
    li.addEventListener('keydown', (e) => {
      if (e.target === li && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        toggleTask(task.id);
      }
    });

    // Delete action button with explicit tabindex and Enter/Space handlers
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('tabindex', '0');
    deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    deleteBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        deleteTask(task.id);
      }
    });

    li.appendChild(toggleSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTask = {
    id: Date.now(),
    text: trimmed,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  announce(`Added task: ${trimmed}`);
}

function toggleTask(id) {
  const target = tasks.find((t) => t.id === id);
  if (!target) return;

  target.completed = !target.completed;
  renderTasks();
  announce(`Marked "${target.text}" as ${target.completed ? 'completed' : 'incomplete'}`);
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return;

  const [removed] = tasks.splice(index, 1);
  renderTasks();
  announce(`Deleted task: ${removed.text}`);

  // Keep keyboard focus smooth after deletion
  const remainingItems = taskList.querySelectorAll('.task-item');
  if (remainingItems.length > 0) {
    const nextFocusIndex = Math.min(index, remainingItems.length - 1);
    remainingItems[nextFocusIndex].focus();
  } else {
    taskInput.focus();
  }
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

renderTasks();
