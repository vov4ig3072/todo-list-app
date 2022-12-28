import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({email: "", password: ""})

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request("/api/auth/register", "POST", {...form})
            message(data.message)
            console.log("DATA", data);
        }catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request("/api/auth/login", "POST", {...form})
            auth.login(data.token, data.userId)
            message(data.message)
            console.log("DATA", data);
        }catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1> Create Todo List</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                            <div>
                                <div className="input-field ">
                                    <input 
                                        placeholder="Email" 
                                        id="email" 
                                        type="text" 
                                        name="email" 
                                        className="input-field--auth"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field ">
                                    <input 
                                        placeholder="Password" 
                                        id="password" 
                                        type="password" 
                                        name="password" 
                                        className="input-field--auth"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yelow darken-4 btn-sing-in" 
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sing in
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}