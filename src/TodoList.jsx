import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";
import plusSvg from "./assets/plus.svg";
import binSvg from "./assets/bin.svg";
import { GiNotebook } from "react-icons/gi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

export default function TodoList() {
  // Initialize todos from localStorage or set to an empty array
  let initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

  let [todos, setTodos] = useState(initialTodos);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    // console.log("We have to add new task in todo");
    if (newTodo.trim() === "") {
      alert("Please enter a task!");
      return; // do nothing if input is empty or just spaces
    }
    setTodos((prevTodos) => {
      const newTodos = [
        ...prevTodos,
        { task: newTodo, id: uuidv4(), isDone: false },
      ];
      // Set the todos in localStorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
    // setTodos(updatedTodos);
    setNewTodo(""); //clear input box
  };

  // let addTask = () => {
  //   if (newEntry.trim() === "") {
  //     return; // do nothing if input is empty or just spaces
  //   }

  //   setTodos([...todos, { id: Date.now(), task: newEntry, isDone: false }]);
  //   setNewEntry(""); // clear input box
  // };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    // let copy = todos.filter((todo) => todo.id != id);
    // console.log(copy);
    setTodos((prevTodos) => {
      const newTodos = todos.filter((prevTodos) => prevTodos.id != id);
      // Set the todos in localStorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  let markAllDone = () => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        return { ...todo, isDone: true };
      });
      // Set the todos in localStorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone }; // toggle isDone
        }
        return todo; // return unchanged todo
      });
      // Set the todos in localStorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });

    // setTodos((prevTodos) =>
    //   prevTodos.map((todo) => {
    //     if (todo.id == id) {
    //       // return { ...todo, task: todo.task.toUpperCase() };
    //       return { ...todo, isDone: todo.isDone ? false : true };
    //     } else {
    //       return todo;
    //     }
    //   })
    // );
  };

  return (
    <div className="main-container">
      <h2 className="heading">Small Steps to Success!</h2>
      <h3 className="heading">Task Todo</h3>

      <div className="input-section">
        <input
          className="input-box"
          placeholder="Add Your Task !"
          value={newTodo}
          onChange={updateTodoValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addNewTask();
            }
          }}
        />
        <button onClick={addNewTask}>
          <img src={plusSvg} alt="Add Task" />
        </button>
      </div>
      <div className="todo-list">
        {/* <div className="todo-items"> */}
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div
              className="todo-task"
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              <p>
                <GiNotebook style={{ marginRight: "6px" }} />
                {todo.task}
              </p>
            </div>

            <div className="todo-actions">
              <input
                type="checkbox"
                name="isDoneCheckbox"
                checked={todo.isDone}
                onChange={() => markAsDone(todo.id)}
              />
              <button onClick={() => deleteTodo(todo.id)}>
                <img src={binSvg} alt="Delete Task" />
              </button>
            </div>
          </div>
        ))}
        {/* </div> */}
        <button className="mark-all-done" onClick={markAllDone}>
          <IoCheckmarkDoneCircleSharp style={{ marginRight: "6px" }} /> All as
          Done
        </button>
      </div>

      {/* <div className="todo-list">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>

              <div>
                <input
                  type="checkbox"
                  name="isDoneCheckbox"
                  value={todo.isDone}
                  checked={todo.isDone}
                  onChange={() => markAsDone(todo.id)}
                />
                <button onClick={() => deleteTodo(todo.id)}>
                  <img src={binSvg} alt="Delete Task" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={markAllDone}>Mark All as Done</button>
      </div> */}
    </div>
    // <div>
    //   <input
    //     placeholder="add a task"
    //     value={newTodo}
    //     onChange={updateTodoValue}
    //   />
    //   <button onClick={addNewTask}>
    //     <img src={plusSvg} alt="Add Task" />
    //   </button>

    //   <h4> Task Todo </h4>
    //   <ul>
    //     {todos.map((todo) => (
    //       <li key={todo.id}>
    //         <span
    //           style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
    //         >
    //           {todo.task}
    //         </span>
    //         &nbsp;&nbsp;&nbsp;
    //         <button onClick={() => deleteTodo(todo.id)}>
    //           <img src={binSvg} alt="Delete Task" />
    //         </button>
    //         <button onClick={() => markAsDone(todo.id)}>
    //           <CheckboxExample />
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    //   <button onClick={markAllDone}>Mark All as Done</button>
    // </div>
  );
}
