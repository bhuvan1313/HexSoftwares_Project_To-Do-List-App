document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText, false);
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
        }
    });

    function addTaskToDOM(taskText, completed) {
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.classList.add("task-text");

        if (completed) {
            taskSpan.classList.add("completed");
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        editBtn.addEventListener("click", () => {
            const newTaskText = prompt("Edit Task", taskText);
            if (newTaskText) {
                taskSpan.textContent = newTaskText;
                updateTaskInStorage(taskText, newTaskText);
                taskText = newTaskText; // Update for future reference
            }
        });

        removeBtn.addEventListener("click", () => {
            li.remove();
            removeTaskFromStorage(taskText);
        });

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function removeTaskFromStorage(taskText) {
        const updatedTasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    function updateTaskInStorage(oldText, newText) {
        const updatedTasks = tasks.map(task => {
            if (task.text === oldText) {
                task.text = newText;
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
});
