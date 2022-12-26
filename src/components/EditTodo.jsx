import { useState } from "react";

export function EditTodo({ todo, todos, setTodos }) {
  const [currentTodo, setCurrentTodo] = useState(todo.name);

  function handleDone() {
    if (currentTodo === "") return;
    todo.isEditing = false;
    todo.name = currentTodo;
    setTodos([...todos]);
  }

  return (
    <div key={todo.id} className="todo">
      <input
        value={currentTodo}
        placeholder="Enter a todo"
        onChange={(e) => setCurrentTodo(e.target.value)}
      ></input>
      <button onClick={handleDone}>Done</button>
    </div>
  );
}
