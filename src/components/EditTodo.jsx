import { useState, forwardRef } from "react";

export const EditTodo = forwardRef(({ todo, todos, setTodos }, ref) => {
  const [currentTodo, setCurrentTodo] = useState(todo.name);

  function handleDone() {
    if (currentTodo === "") return;
    todo.isEditing = false;
    todo.name = currentTodo;
    setTodos([...todos]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
    handleDone();
    }
  }

  return (
    <div key={todo.id} className="todo">
      <input
        ref={ref}
        value={currentTodo}
        placeholder="Enter a todo"
        onChange={(e) => setCurrentTodo(e.target.value)}
        onKeyDown={handleKeyDown}
      ></input>
      <button onClick={handleDone}>Done</button>
    </div>
  );
})


