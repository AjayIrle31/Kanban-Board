let TaskData = {}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector("#done");
const columns = [todo, progress, done];

const tasks = document.querySelectorAll('.task');
let dragitem = null

function saveTaskData() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        TaskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector('h2').innerText,
            description: t.querySelector('p').innerText
        }));
    });
    localStorage.setItem('tasks', JSON.stringify(TaskData));
}

function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelector('.right');
        if (count) count.innerText = col.querySelectorAll('.task').length;
    });
}

function attachTaskActions(task) {
    const deleteButton = task.querySelector('button');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            task.remove();
            saveTaskData();
            updateCounts();
        });
    }

    task.addEventListener('drag', () => {
        dragitem = task;
    });
}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement("div")

            div.classList.add("task")
            div.setAttribute("draggable", "true")

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button>Delete</button>
            `

            column.appendChild(div)
            attachTaskActions(div);
        })
    }
    updateCounts();
}

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log("dragging",e);
        dragitem = task;
    })
})

function dragevents(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragitem);
        column.classList.remove("hover-over");



        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
    
            TaskData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    description: t.querySelector("p").innerText
                }
            })
    
            localStorage.setItem("tasks", JSON.stringify(TaskData));
            count.innerText = tasks.length;
        })


    })


}

dragevents(todo);
dragevents(progress);
dragevents(done);

const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const modalCenter = document.querySelector(".modal .center");
const addTaskButton = document.querySelector("#add-new-task");

modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

modalCenter.addEventListener("click", (e) => {
    e.stopPropagation();
})

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active")
})

addTaskButton.addEventListener("click", () => {
    const Title = document.querySelector("#title").value
    const Description = document.querySelector("#description").value
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${Title}</h2>
        <p>${Description}</p>
        <button>Delete</button>
    `

    todo.appendChild(div)
    attachTaskActions(div);

    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');

        TaskData[col.id] = Array.from(tasks).map(t => ({
            title: t.querySelector('h2').innerText,
            description: t.querySelector('p').innerText
        }));

        localStorage.setItem('tasks', JSON.stringify(TaskData));
        count.innerText = tasks.length;
    })

    modal.classList.remove('active')

})