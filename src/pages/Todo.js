import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import TodoList from "../components/TodoList";

export default function Todo() {
  const [name, setName] = useState();
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ todo: "" });

  async function populateTodo() {
    const request = await fetch(
      "https://daily--todolist.herokuapp.com/api/todo/",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();
    // console.log("data:", data);
    if (data.status === "success") {
      setName(data.data.name);

      setTodoList(data.data.todo);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      // console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        populateTodo();
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  async function addTodo() {
    const res = await fetch("https://daily--todolist.herokuapp.com/api/todo/", {
      method: "PATCH",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
      }),
    });
    const data = await res.json();

    if (data.status === "success") {
      populateTodo();
      setTodoList([...todoList, todo.todo]);
    }
  }

  async function deleteTodo(id) {
    const string = todoList[id];
    const response = await fetch(
      "https://daily--todolist.herokuapp.com/api/todo/",
      {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          string: string,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      populateTodo();
    }
  }

  return (
    <>
      <h1>Hi {name || "no name found"}</h1>
      <input
        type="text"
        name="todo"
        id="todo"
        onChange={(e) => setTodo({ ...todo, [e.target.name]: e.target.value })}
      ></input>
      <button onClick={addTodo}>Add Todo</button>
      {todoList && (
        <TodoList todoList={todoList} deleteTodo={deleteTodo}></TodoList>
      )}
    </>
  );
}
