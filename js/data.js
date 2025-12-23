import { UpdateUi } from "./main.js";

const API = "http://localhost:8080/todos";

export async function getTodo(params) {
  try {
    let res = await fetch(params);
    if (!res.ok) {
      throw new Error("apida muammo");
    }
    let data = await res.json();
    UpdateUi(data);
  } catch (error) {
    console.log(error);
  }
}
getTodo(API);

export async function postTodo(params, title) {
  try {
    let res = await fetch(params, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    if (!res.ok) {
      throw new Error("qo'shishda muammo uchramoqda");
    }
    let data = await res.json();
  } catch (error) {
    alert(error);
  }
}
