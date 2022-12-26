import { EditTodo } from "./EditTodo";

export default function TodoList({ todos, setTodos }) {
  function handleDelete(id) {
    const remainingTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(remainingTodos);
  }

  function handleCheck(todo) {
    todo.checked ? (todo.checked = false) : (todo.checked = true);
    setTodos([...todos]);
  }

  function handleEdit(todo) {
    todo.isEditing ? (todo.isEditing = false) : (todo.isEditing = true);
    // todo.name = currentTodo;
    setTodos([...todos]);
  }

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
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                Delete
              </button>
              <input
                type="checkbox"
                checked={todo.checked}
                onClick={() => {
                  handleCheck(todo);
                }}
              ></input>
            </div>
          </div>
        ) : (
          <EditTodo todo={todo} todos={todos} setTodos={setTodos} />
        )
      )}
      {todos.length ? <button className="deleteBtn"onClick={() => {setTodos([])}}>Delete All</button> : null}
    </div>
  );
}
