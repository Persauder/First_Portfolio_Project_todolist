const taskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${taskText}
        <button class="delete">Delete</button>
    `;

    listItem.querySelector('.delete').addEventListener('click', () => {
        listItem.remove();
        saveTasks();
    });

    taskList.appendChild(listItem);
    taskInput.value = '';

    saveTasks();
}

if (addTaskButton) {
    addTaskButton.addEventListener('click', addTask);
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((item) => {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${task}
            <button class="delete">Delete</button>
        `;

        listItem.querySelector('.delete').addEventListener('click', () => {
            listItem.remove();
            saveTasks();
        });

        taskList.appendChild(listItem);
    });
}

// Call loadTasks to populate the task list when the page loads
loadTasks();
