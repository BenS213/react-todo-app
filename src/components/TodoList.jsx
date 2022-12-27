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
    <ul className="todos">
      {todos.map((todo) =>
        !todo.isEditing ? (
          <li key={todo.id} className={todo.checked ? "todo checked" : "todo"}>
            <div className="todoItem">
                 <input
                className="checkBox"
                type="checkbox"
                checked={todo.checked}
                onChange={() => {
                  handleCheck(todo);
                }}
              ></input>
              <span>
            {todo.name}
            </span>
            </div>
            <div className="actions">
              <button
                onClick={() => {
                  handleEdit(todo);
                }}
              >
                <FontAwesomeIcon icon={regular('pen-to-square')} />
              </button>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                <FontAwesomeIcon icon={regular("trash-can")} />
              </button>
         
            </div>
          </li>
        ) : (
          <EditTodo ref={inputRef} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        )
      )}
      {todos.length ? <button className="deleteBtn"onClick={() => {setTodos([])}}>Delete All</button> : null}
    </ul>
  );
}
