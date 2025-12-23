import { getTodo, postTodo } from "./data.js";

const API = "http://localhost:8080/todos";

let FormEl = document.querySelector("#todoForm");
let UlEl = document.querySelector("#todoList");
let input = document.getElementById("todoInput");

FormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  await postTodo(API, input.value);

  await getTodo(API);

  FormEl.reset();
});

export function UpdateUi(list) {
  UlEl.innerHTML = "";
  list.forEach((todo) => {
    let { id, title, completed } = todo;

    UlEl.innerHTML += `
         <li class="todo-item" data-id="${id}">
          <input type="text" class="todo-text" value="${title}" disabled></input>

          <div class="todo-actions">
            <button class="edit-btn" title="O‘zgartirish" >✏️</button>
            <button class="delete-btn" title="O‘chirish" >🗑</button>
          </div>
        </li>
        `;
  });
}

UlEl.addEventListener("click", async (e) => {
  const target = e.target;
  const li = target.closest(".todo-item");
  if (!li) return;

  const id = li.dataset.id;
  const todoInput = li.querySelector(".todo-text");

  // DELETE
  if (target.classList.contains("delete-btn")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    li.remove();
    return;
  }

  // EDIT
  if (target.classList.contains("edit-btn")) {
    target.classList.replace("edit-btn", "save-btn");
    target.textContent = "📥";

    todoInput.disabled = false;
    todoInput.focus();
    return;
  }

  // SAVE
  if (target.classList.contains("save-btn")) {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todoInput.value }),
    });

    getTodo(API);
  }
});
