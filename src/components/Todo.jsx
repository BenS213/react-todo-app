import React from 'react';
import { EditTodo } from "./EditTodo";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

export default function Todo({todo, todos, setTodos, id}) {
    const inputRef = useRef();

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: id})
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

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
  return (<div ref={setNodeRef} style={style} >
   {!todo.isEditing ? (
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
            <div className="btns">
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
            <FontAwesomeIcon icon={solid('arrows-up-down')} {...attributes} {...listeners} className="grip"/>
          </div>
        </li>
      ) : (
        <EditTodo ref={inputRef} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      )}
      </div>
  )
}
