function loadTodos() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todoText) {
  const todos = loadTodos();
  todos.push({ text: todoText, completed: false });
  saveTodos(todos);
}

function updateTodoStatus(text, completed) {
  const todos = loadTodos();
  const updatedTodos = todos.map(todo => {
    if (todo.text === text) {
      return { ...todo, completed };
    }
    return todo;
  });
  saveTodos(updatedTodos);
}

function deleteTodo(text) {
  const todos = loadTodos();
  const updatedTodos = todos.filter(todo => todo.text !== text);
  saveTodos(updatedTodos);
}

function appendTodoHtml(todo) {
  const todoList = document.getElementById("todoList");

  const li = document.createElement("li");
  li.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const span = document.createElement("span");
  span.textContent = todo.text;
  if (todo.completed) {
    span.style.textDecoration = "line-through";
  }

  checkbox.addEventListener("change", () => {
    updateTodoStatus(todo.text, checkbox.checked);
    renderTodos(currentFilter);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.title = "Delete this todo";

  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo.text);
    renderTodos(currentFilter);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function renderTodos(filter = "all") {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const todos = loadTodos();
  todos.forEach(todo => {
    if (
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "pending" && !todo.completed)
    ) {
      appendTodoHtml(todo);
    }
  });
}

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todoinput");
  const submitButton = document.getElementById("addTodo");
  const filterButtons = document.querySelectorAll(".filterBtn");

  submitButton.addEventListener("click", () => {
    const todoText = todoinput.value.trim();
    if (todoText === "") {
      alert("Please write something for the todo");
      return;
    }
    addTodoToLocalStorage(todoText);
    todoinput.value = "";
    renderTodos(currentFilter);
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      renderTodos(currentFilter);
    });
  });

  renderTodos();
});


  // Theme toggle
  const themeToggle = document.getElementById("toggleTheme");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // On page load, apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
  }
