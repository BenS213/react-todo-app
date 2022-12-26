import './App.css';
import InputForm from './components/InputForm'
import TodoList from './components/TodoList'
import { useState } from "react"


function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("TODOs");

    if (todoItems) return JSON.parse(todoItems);
    return [];
  });

  return (
    <div className="App">
     <header>
      <h1>Ben's TODO List</h1>
      </header>
      <main>
      <InputForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      </main>
    </div>
  );
}

export default App;
