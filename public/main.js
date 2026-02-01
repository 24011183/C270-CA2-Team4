const API_BASE = "/todos";
const list = document.getElementById("todoList");
const input = document.getElementById("newTodo");
const addBtn = document.getElementById("addBtn");

async function loadTodos() {
  const res = await fetch(API_BASE);
  const todos = await res.json();
  list.innerHTML = "";
  todos.forEach((todo) => addTodoToDOM(todo));
}

function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.className = todo.completed ? "completed" : "";
  const span = document.createElement("span");
  span.textContent = todo.title;
  li.appendChild(span);

  const actions = document.createElement("div");

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = todo.completed ? "Undo" : "Done";
  toggleBtn.className = "action";
  toggleBtn.onclick = async () => {
    await fetch(`${API_BASE}/${todo.id}`, { method: "PUT" });
    loadTodos();
  };
  actions.appendChild(toggleBtn);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "action";
  delBtn.onclick = async () => {
    await fetch(`${API_BASE}/${todo.id}`, { method: "DELETE" });
    loadTodos();
  };
  actions.appendChild(delBtn);

  li.appendChild(actions);
  list.appendChild(li);
}

addBtn.onclick = async () => {
  const title = input.value.trim();
  if (!title) return;
  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  input.value = "";
  loadTodos();
};

loadTodos();