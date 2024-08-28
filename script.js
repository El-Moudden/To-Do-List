let tasks = [
    {
        "title": "football",
        "date": "03/07/2024",
        "iscompleted": true
    },
    {
        "title": "shopping",
        "date": "03/07/2024",
        "iscompleted": false
    },
    {
        "title": "gaming",
        "date": "05/07/2024",
        "iscompleted": true
    },
    {
        "title": "coding",
        "date": "04/07/2024",
        "iscompleted": false
    }
];

function getTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = storedTasks ?? [];
}

function addTasks() {
    let tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";
    
    tasks.forEach((task, i) => {
        let content = `
        <div class="task ${task.iscompleted ? "done" : ""}">
            <div>
                <p>${task.title}</p>
                <span>${task.date}</span>
            </div>
            <div class="task-tools">
                ${task.iscompleted ? `<i class="fa-solid fa-x" onclick="endTask(${i})" style="color: red;"></i>` : `<i class="fa-solid fa-check" onclick="endTask(${i})"></i>`}
                <i class="fa-solid fa-pen-to-square" onclick="editTask(${i})"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(${i})"></i>
            </div>
        </div>`;
        tasksContainer.innerHTML += content;
    });
}

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector(".add-btn").addEventListener("click", () => {
    let taskName = prompt("Please enter a task");
    if (taskName) {
        let today = new Date();
        let date = today.getDate().toString().padStart(2, '0') + "/" + (today.getMonth() + 1).toString().padStart(2, '0') + "/" + today.getFullYear() + " | " + today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0');
        let taskObj = {
            "title": taskName,
            "date": date,
            "iscompleted": false
        };
        tasks.push(taskObj);
        storeTasks();
        addTasks();
    }
});

function deleteTask(i) {
    if (confirm("Delete task: " + tasks[i].title)) {
        tasks.splice(i, 1);
        storeTasks();
        addTasks();
    }
}

function editTask(i) {
    let newTitle = prompt("Edit task", tasks[i].title);
    if (newTitle !== null) {
        tasks[i].title = newTitle;
        let today = new Date();
        tasks[i].date = "Edited " + today.getDate().toString().padStart(2, '0') + "/" + (today.getMonth() + 1).toString().padStart(2, '0') + "/" + today.getFullYear() + " | " + today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0');
        storeTasks();
        addTasks();
    }
}

function endTask(i) {
    tasks[i].iscompleted = !tasks[i].iscompleted;
    storeTasks();
    addTasks();
}

// Initial call to populate the tasks on page load
getTasks();
addTasks();





   
    


    

    



