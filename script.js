let tasksData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let draggedElement = null;



function updateTaskCount(){
    columns.forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".left");

    tasksData[ col.id] = Array.from(tasks).map( t => {
        return{
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasksData));

    count.innerText = tasks.length;
    })
}


if (localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data ){
        const column = document.querySelector(`#${col}`);
        data[col]. forEach(task =>{
        const div = document.createElement("div")
    div.classList.add("task")

    div.setAttribute("draggable", "true")
    div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
                `
    column.appendChild(div);

    div.addEventListener("drag", (e) => {
        draggedElement = div;
    })

        })        
        const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".left");
        count.innerText = tasks.length;
    }
}


const tasks = document.querySelectorAll(".task");
tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        draggedElement = task;
    })
})

function dragging(column){
    column.addEventListener("dragenter", function(e){
    e.preventDefault();
    column.classList.add("drag");
})
    column.addEventListener("dragleave", function(e){
    e.preventDefault();
    column.classList.remove("drag");
})
    column.addEventListener("drop", function(e){
    e.preventDefault();
    column.appendChild(draggedElement);
    column.classList.remove("drag");

    updateTaskCount();

})
    column.addEventListener("dragover", function(e){
        e.preventDefault();
        
        
    })
}
dragging(todo);
dragging(progress);
dragging(done);


const toggle = document.querySelector("#toggleModal");
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".modal .bg");
const cancelTask = document.querySelector("#cancel-new-task");

toggle.addEventListener("click", () => {
    modal.classList.add("active");
})
bgModal.addEventListener("click", () => {
    modal.classList.remove("active");
})
cancelTask.addEventListener("click", function(){
    modal.classList.remove("active");
})

const addNewTask = document.querySelector("#add-new-task");

addNewTask.addEventListener("click", function(){
    const taskTitle = document.querySelector("#task-title").value
    const textarea = document.querySelector("#textArea").value

    const div = document.createElement("div")
    div.classList.add("task")

    div.setAttribute("draggable", "true")
    div.innerHTML = `
                <h2>${taskTitle}</h2>
                <p>${textarea}</p>
                <button>Delete</button>
                `
    todo.appendChild(div)

    updateTaskCount();
    modal.classList.remove("active");

    document.querySelector("#task-title").value = "";
    document.querySelector("#textArea").value = "";

    
    div.addEventListener("drag", () => {
        draggedElement = div;
    })


    
})

