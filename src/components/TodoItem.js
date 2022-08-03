import React, { useState } from "react";
import PropTypes from "prop-types";
import BorderComponent from "./BorderComponent";

export const TodoItem = (props) => {
  const {
    description,
    deadline,
    status,
    id,
    onTodoChecked,
    deleteOnClick,
    updateTodo,
  } = props;
  const [todoEditing, setTodoEditing] = useState(false);
  const [editingText, setEditingText] = useState(description);

  const editOnClick = () => {
    setTodoEditing(true);
  };

  const editOnInput = (e) => {
    setEditingText(e.target.value);
  };
  return (
    <BorderComponent>
      <li>
        {todoEditing ? (
          <input type="text" value={editingText} onChange={editOnInput} />
        ) : (
          <span className={status ? "checked-item" : "item"}>
            {description}, {deadline}
          </span>
        )}
        <div className="buttons-container">
          <input
            type="checkbox"
            name="checkbox"
            checked={status}
            onChange={() => onTodoChecked(id)}
          />
          <button className="todo-button" onClick={() => deleteOnClick(id)}>
            Delete
          </button>
          {todoEditing ? (
            <button
              className="todo-button"
              onClick={() => {
                updateTodo(id, editingText);
                setTodoEditing(false);
              }}
              disabled={!editingText}
            >
              Submit
            </button>
          ) : (
            <button onClick={editOnClick}>Edit</button>
          )}
        </div>
      </li>
    </BorderComponent>
  );
};

TodoItem.propTypes = {
  description: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  status: PropTypes.bool,
  id: PropTypes.number,
  handleOnChange: PropTypes.func,
  deleteOnClick: PropTypes.func,
  updateTodo: PropTypes.func,
};
