const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUl = document.getElementById("todos");

const todosList = JSON.parse(localStorage.getItem("todos"));

if (todosList) {
  todosList.forEach((todoN) => {
    addTodo(todoN);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todoN) {
  let todoText = input.value;

  if (todoN) {
    todoText = todoN.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");

    if (todoN && todoN.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });
    todoUl.appendChild(todoEl);
    
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
