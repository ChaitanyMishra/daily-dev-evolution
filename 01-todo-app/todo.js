document.addEventListener('DOMContentLoaded', () => {
    const inputBar = document.querySelector('#inputBox');
    const actionBtn = document.querySelector('#button');
    const ulList = document.querySelector('#taskList');

    let taskLi = JSON.parse(localStorage.getItem('task')) || [];

    taskLi.forEach(task => renderTask(task));
    updateButtonState();

    function addTask() {
        const input = inputBar.value.trim();

        if (input === "") {
            alert("Please enter a task");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: input,
            completed: false,
            selected: false
        };

        taskLi.push(newTask);
        saveTask();
        renderTask(newTask);
        inputBar.value = "";
    }

    function saveTask() {
        localStorage.setItem('task', JSON.stringify(taskLi));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.setAttribute('data-id', task.id);

        if (task.selected) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="deleteTask">Delete</button>
        `;

        const deleteBtn = li.querySelector('.deleteTask');

        deleteBtn.addEventListener('click', () => {
            task.selected = !task.selected;
            li.classList.toggle('selected');
            li.style.color = task.selected ? 'gray' : '';
            li.style.textDecoration = task.selected ? 'line-through' : '';
            updateButtonState();
        });

        ulList.appendChild(li);
    }

    function updateButtonState() {
        const selectedTasks = taskLi.filter(task => task.selected);

        
        if (selectedTasks.length > 0) {
            actionBtn.textContent = "Delete task";

        } else {
            actionBtn.textContent = "Add Task";
        }
    }

    actionBtn.addEventListener('click', () => {
        const selectedTasks = taskLi.filter(task => task.selected);
        if (selectedTasks.length > 0) {
            taskLi = taskLi.filter(task => !task.selected);
            saveTask();
            ulList.innerHTML = '';
            taskLi.forEach(task => renderTask(task));
            updateButtonState();
        } else {
            addTask();
        }
    });

    inputBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    
});
