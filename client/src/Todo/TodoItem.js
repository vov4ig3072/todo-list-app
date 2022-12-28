import React, { useContext } from "react";
import Context from "../context/context";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
    textColor: "black"
    }
  }

function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);

  const classes = [];

  if (todo.complited) {
    classes.push("complited");
  }

  return (
    <li style={styles.li} className={classes.join(' ')}>
      <label>
      <input
          type="checkbox" 
          checked={todo.complited}
          onChange={() => onChange(todo._id)}
        />
        <span className={todo.complited ? "complited--text" : "span--text"}>
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      </label>
      <button className="btn-floating waves-effect waves-light red" onClick={removeTodo.bind(null, todo._id)}>
        &times;
      </button>
    </li>
  )
}

export default TodoItem;
