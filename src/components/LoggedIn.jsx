import React from "react";
import loginFacade from "../utils/loginFacade.js";
import {useNavigate} from "react-router";

export default function LoggedIn({setLoggedIn}) {
    const navigate = useNavigate()

    const logout = () => {
        loginFacade.logout()
        setLoggedIn(false)
        navigate("/")
        alert("You are now logged out")
    }

    return (
        <div className="login-container">
            <button onClick={logout}>Logout</button>
        </div>
    )

}