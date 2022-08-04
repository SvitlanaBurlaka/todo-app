import React, { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
const apiUrl = `https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw`;

export const TodoList = () => {
  const [todoState, setTodoState] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getInitTodo();
  }, []);

  const getInitTodo = () => {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setTodoState(
          result.map((item) => {
            return { ...item, status: false };
          })
        );
      });
  };

  const onTodoChecked = (id) => {
    const updatedCheckState = [...todoState];
    updatedCheckState.map((item) => {
      if (id === item.id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodoState(updatedCheckState);
  };

  const deleteOnClick = (id) => {
    const newTodos = todoState.filter((todo) => todo.id !== id);
    setTodoState(newTodos);
  };

  const inputDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const inputDeadlineHandler = (e) => {
    setDeadline(e.target.value);
  };

  const addNewTodo = () => {
    if (description.trim().length === 0) {
      setError("Remember to set description");
    } else if (deadline.trim().length === 0) {
      setError("Remember to set deadline");
    } else {
      setError("");
      setTodoState((prevTodos) => {
        const newTodo = {
          id: prevTodos[prevTodos.length - 1].id + 1,
          description: description,
          deadline: deadline,
          status: false,
        };
        return [...prevTodos, newTodo];
      });
    }
  };

  const updateTodo = (id, newValue) => {
    const updatedTodo = todoState.map((todo) => {
      if (todo.id === id) {
        todo.description = newValue;
      }
      return todo;
    });
    setTodoState(updatedTodo);
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <>
      <div className="buttons-container">
        <label className="todo-input" htmlFor="description">
          Description{" "}
          <input
            type="text"
            name="description"
            value={description}
            onChange={inputDescriptionHandler}
          />
        </label>
        <label className="todo-input" htmlFor="deadline">
          Deadline{" "}
          <input
            type="date"
            min={disablePastDate()}
            name="deadline"
            value={deadline}
            onChange={inputDeadlineHandler}
          />
        </label>
      </div>
      <p className="error-message">{error}</p>
      <button onClick={addNewTodo}>Add New Todo</button>
      <div className="container">
        <ul className="todo-container">
          {todoState.length ? (
            todoState.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  deadline={todo.deadline}
                  status={todo.status}
                  onTodoChecked={onTodoChecked}
                  deleteOnClick={deleteOnClick}
                  updateTodo={updateTodo}
                />
              );
            })
          ) : (
            <p>No items</p>
          )}
        </ul>
      </div>
    </>
  );
};
