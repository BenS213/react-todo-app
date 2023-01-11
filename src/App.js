import "./App.css";
import InputForm from "./components/InputForm";
import Todo from "./components/Todo";
import { useState } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("TODOs");
    if (todoItems) return JSON.parse(todoItems);
    return [];
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }));

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      setTodos((items) => {
        const activeIndex = items.findIndex((x) => x.id === active.id);
        const overIndex = items.findIndex((x) => x.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className="App">
      <header>
        <h1>
          {" "}
          <FontAwesomeIcon icon={regular("square-check")} /> React TODO List
        </h1>
      </header>

      <InputForm todos={todos} setTodos={setTodos} />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <ul className="todos">
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                handle={true}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </SortableContext>
        </ul>
      </DndContext>

      {todos.length ? (
        <div className="btn">
          <button
            className="deleteBtn"
            onClick={() => {
              setTodos([]);
            }}
          >
            Delete All
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
