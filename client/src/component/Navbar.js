import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate()

    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1 navbar">
                <a href="/" className="brand-logo ">Todo List</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/" onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    )
}