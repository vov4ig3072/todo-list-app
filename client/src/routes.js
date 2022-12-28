import React, {} from "react"
import {Routes , Route, Navigate } from 'react-router-dom'
import { TodoListPage } from "./pages/TodoListPage"
import { AuthPage } from "./pages/AuthPage" 

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="/todo-list" element={ <TodoListPage />} />
                <Route path="/" element={<Navigate to="/todo-list" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
        </Routes>
    )
}