import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function InputForm({ todos, setTodos }) {
  const [input, setInput] = useState("");

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();

    const todoObj = {
      name: input,
      id: uuidv4(),
      checked: false, 
      isEditing: false,
    };

    if (input === "") return;
    setTodos((todos) => {
      return [...todos, todoObj];
    });

    setInput("");
  }

  useEffect(() => {
    localStorage.setItem("TODOs", JSON.stringify(todos));
  }, [todos]);

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="input">TODO</label>
      <input
        id="input"
        placeholder="Enter a todo"
        onChange={handleInputChange}
        value={input}
        type="text"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
