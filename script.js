const columns = [...document.querySelectorAll(".column")];
const btn = document.querySelector("#theme");
const themeLink = document.querySelector("#theme-link");
const todo = document.querySelector("#todo");
const modal = document.querySelector(".modal");

let draggedElement = null;

// function updateButtonText(theme){
//     btn.innerText = theme.includes("style-light.css")? 'Dark Mode' : 'Light Mode';
// }

btn.addEventListener("click", () => {
    const current = themeLink.getAttribute("href");

    const newTheme =
        current === "style-light.css"
            ? "style-dark.css"
            : "style-light.css";

    themeLink.setAttribute("href", newTheme);
    localStorage.setItem("theme", newTheme);

    // Change icon
    const icon = btn.querySelector("i");

    if (newTheme === "style-dark.css") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
});
const saved = localStorage.getItem("theme");

if (saved) {
    themeLink.setAttribute("href", saved);

    const icon = btn.querySelector("i");

    if (saved === "style-dark.css") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

// btn.addEventListener("click", () => {
//     const current = themeLink.getAttribute('href');


//     const newTheme = current === 'style-light.css'? 'style-dark.css': 'style-light.css';
//     themeLink.setAttribute('href', newTheme);


//     localStorage.setItem('theme', newTheme);
//     // updateButtonText(newThemetheme);
// });

// const saved = localStorage.getItem('theme');

// if(saved){
//     themeLink.setAttribute('href', saved)
//     // updateButtonText(saved)
// }

// btn.addEventListener("click", function(){
// if(theme.textContent == "Dark"){
//         theme.innerText = "Light Mode";
//     }else{
//         theme.innerText = "Dark Mode";
//     }
// })


// =========================
// CREATE TASK
// =========================

function createTask(title, desc) {
    const div = document.createElement("div");

    div.className = "task";
    div.draggable = true;

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    return div;
}


// =========================
// UPDATE COUNTS
// =========================

function updateTaskCount() {
    columns.forEach(column => {
        const count = column.querySelector(".left");
        const tasks = column.querySelectorAll(".task");

        count.textContent = tasks.length;
    });
}


// =========================
// SAVE TASKS
// =========================

function saveTasks() {
    const tasksData = {};

    columns.forEach(column => {
        tasksData[column.id] = [...column.querySelectorAll(".task")].map(task => ({
            title: task.querySelector("h2").textContent,
            desc: task.querySelector("p").textContent
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}


// =========================
// LOAD TASKS
// =========================

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!savedTasks) return;

    Object.entries(savedTasks).forEach(([columnId, tasks]) => {
        const column = document.querySelector(`#${columnId}`);

        if (!column) return;

        tasks.forEach(task => {
            column.appendChild(
                createTask(task.title, task.desc)
            );
        });
    });

    updateTaskCount();
}

loadTasks();


// =========================
// DRAG TASK
// =========================

document.addEventListener("dragstart", e => {
    if (e.target.classList.contains("task")) {
        draggedElement = e.target;
    }
});


// =========================
// DELETE TASK
// =========================

document.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".task").remove();

        updateTaskCount();
        saveTasks();
    }
});


// =========================
// DRAG & DROP COLUMNS
// =========================

columns.forEach(column => {

    column.addEventListener("dragover", e => {
        e.preventDefault();
    });


    column.addEventListener("dragenter", e => {
        e.preventDefault();

        column.classList.add("drag");
    });


    column.addEventListener("dragleave", () => {
        column.classList.remove("drag");
    });


    column.addEventListener("drop", e => {
        e.preventDefault();

        if (!draggedElement) return;

        column.appendChild(draggedElement);

        column.classList.remove("drag");

        updateTaskCount();
        saveTasks();
    });

});


// =========================
// MODAL
// =========================

document.querySelector("#toggleModal")
    .addEventListener("click", () => {
        modal.classList.add("active");
    });


document.querySelector(".modal .bg")
    .addEventListener("click", () => {
        modal.classList.remove("active");
    });


document.querySelector("#cancel-new-task")
    .addEventListener("click", () => {
        modal.classList.remove("active");
    });


// =========================
// ADD NEW TASK
// =========================

document.querySelector("#add-new-task")
    .addEventListener("click", () => {

        const titleInput = document.querySelector("#task-title");
        const descInput = document.querySelector("#textArea");

        const title = titleInput.value.trim();
        const desc = descInput.value.trim();


        if (!title) {
            alert("Please enter a task title");
            return;
        }


        const task = createTask(title, desc);

        todo.appendChild(task);


        updateTaskCount();
        saveTasks();


        modal.classList.remove("active");


        titleInput.value = "";
        descInput.value = "";
    });