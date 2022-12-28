import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props){
    return (
        <ul  className="list-todo">
            {props.todos.map((todo, index) => {
                return <TodoItem todo={todo} key={todo._id} index={index} onChange={props.onToggle} />
            })}
        </ul>
    )
}

export default TodoList