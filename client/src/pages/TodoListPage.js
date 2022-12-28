import React, { useEffect, useContext, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext"; 
import Context from "../context/context";
import TodoList from "../Todo/TodoList";
import AddTodo from "../Todo/AddTodo";
import Loader from "../component/Loader";

export const TodoListPage = () => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const { request } = useHttp(AuthContext)
  const auth = useContext(AuthContext)

  const viewAllTodo = useCallback(async() => {
    const data = await request("/api/todo/", "GET", null, {"Authorization": `Bearer ${auth.token}`})
   
    setTodos(data)

    setLoading(false);

  },[setLoading, request, auth])

  
  useEffect(() => {
    viewAllTodo()
  }, [viewAllTodo])


  async function toggleTodo(id){
    await request("/api/todo/update-todo", "POST", {id: id}, {"Authorization": `Bearer ${auth.token}`})
    viewAllTodo()
  }

  function removeTodo(id) {
    request("/api/todo/delete-todo", "POST", {id: id}, {"Authorization": `Bearer ${auth.token}`})
    .then(todoDeleted => {
      if(todoDeleted){
        setTodos(todos.filter(todo => todo._id !== id))
      }
    })
    
  }

  
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>TodoList</h1>
        <AddTodo viewAllTodo={viewAllTodo} />

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
};
