import React from "react";

export default function TodoList({ todoList, deleteTodo }) {
  return (
    <div>
      {todoList.map((todo, i) => {
        return (
          <div key={i}>
            <h1>{todo}</h1>

            <button onClick={() => deleteTodo(i)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
