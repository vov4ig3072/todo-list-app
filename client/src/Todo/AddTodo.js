import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"


function useInputValue(defaultValue = ""){
    const [ value, setValue ] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: (event) => setValue(event.target.value)       
        },
        clear: () => setValue(""),
        value: () => value
    }
}

function AddTodo( props ){

    const { request } = useHttp(AuthContext)
    const auth = useContext(AuthContext)
    
    const input = useInputValue("")
    const styles = {
        form: {
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between"
        }
    }

    

    async function submitHandler(event){
        event.preventDefault()

        if(input.value().trim()){
            await request("/api/todo/create-todo", "POST", {title: input.value()}, {"Authorization": `Bearer ${auth.token}`})
            props.viewAllTodo()
            input.clear()
        }
    }


    return(
        <form style={ styles.form } onSubmit={submitHandler}>
            <input {...input.bind} className="input-field--add_todo"/>
            <button className="btn waves-effect waves-light" type="submit">Add todo</button>
        </form>
    )
}

export default AddTodo
  