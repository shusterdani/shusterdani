
let = todoList = [];

const taskTextBox = document.getElementById("taskTextBox");
const timeTextBox = document.getElementById("timeTextBox");
const containerDiv = document.getElementById("containerDiv");
const content = document.getElementById("content");

function loadTodo() {
    loadTodoList()
    displayTodoList();
}

function addTodo() {
    pushTodo();
    displayTodoList();
    saveTodo()
}

function pushTodo() {
    const task = taskTextBox.value;
    const time = timeTextBox.value;

    let todo = { task, time };

    let isValid = isValidTextBox(todo);
    if(!isValid) {
        alert("Please Enter a Task!");
        return;
    }
    todoList.push(todo);
    clearForm();
}

function displayTodoList() {
    let html = "";
    for (let i = 0; i < todoList.length; i++) {
        const card = `
        <div class="card">
            <span onclick="deleteMe(${i})" id="delete-btn">╳</span>
            <div id="task">${todoList[i].task}</div>
            <div id="time">${todoList[i].time.replace("T", "<br>")}</div>
        </div>
        `;
        html += card;
    }
    containerDiv.innerHTML = html;
}

const today = new Date().toLocaleString("EN-CA").slice(0, 10);
document.querySelectorAll('input[type="datetime-local"]').forEach(el => {
    el.min = today + "T00:00";
});

function confirmDelete(index) {
    todoList.splice(index, 1);
    displayTodoList();
    saveTodo()
}

function deleteMe(index) {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if(confirmed){
        confirmDelete(index);
    }
}

function clearForm() {
    taskTextBox.value = "";
    timeTextBox.value = "";
    taskTextBox.focus();
}

function saveTodo() {
    const saveTodoJSON = JSON.stringify(todoList);
    localStorage.setItem("todoList", saveTodoJSON);
}

function loadTodoList() {
    const myTodoStr = localStorage.getItem("todoList");
    if (myTodoStr)
        todoList = JSON.parse(myTodoStr);
}

function isValidTextBox(todo) {
    return (todo.task !== "" && todo.time.toString().trim() !== "");
}

