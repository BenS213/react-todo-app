import { EditTodo } from "./EditTodo";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'



export default function TodoList({ todos, setTodos }) {
  const inputRef = useRef();

  function handleDelete(id) {
    const remainingTodos = todos.filter((todo) => {
      return todo.id !== id });
    setTodos(remainingTodos);
  }

  function handleCheck(todo) {
    todo.checked ? (todo.checked = false) : (todo.checked = true);
    setTodos([...todos]);
  }

  function handleEdit(todo) {
    todo.isEditing ? (todo.isEditing = false) : (todo.isEditing = true);
    setTodos([...todos]);
  }

  // useEffect(() => {
  //   inputRef.current.focus();
  // },[todos])

  return (
    <div className="todos">
      {todos.map((todo) =>
        !todo.isEditing ? (
          <div key={todo.id} className={todo.checked ? "todo checked" : "todo"}>
            {todo.name}
            <div className="actions">
              <button
                onClick={() => {
                  handleEdit(todo);
                }}
              >
                <FontAwesomeIcon icon={solid('pen-to-square')} />
              </button>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                <FontAwesomeIcon icon={solid("trash-can")} />
              </button>
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => {
                  handleCheck(todo);
                }}
              ></input>
            </div>
          </div>
        ) : (
          <EditTodo ref={inputRef} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        )
      )}
      {todos.length ? <button className="deleteBtn"onClick={() => {setTodos([])}}>Delete All</button> : null}
    </div>
  );
}
