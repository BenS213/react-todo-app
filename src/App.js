import './App.css';
import InputForm from './components/InputForm'
import TodoList from './components/TodoList'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {
  const [todos, setTodos] = useState(() => {
    const todoItems = localStorage.getItem("TODOs");
     if (todoItems) return JSON.parse(todoItems);
    return [];
  });

  return (
    <div className="App">
     <header>
      <h1> <FontAwesomeIcon icon={regular('square-check')} /> React TODO List</h1>
     

      </header>
      <InputForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
