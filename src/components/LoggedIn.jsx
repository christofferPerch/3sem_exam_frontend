import React from "react";
import loginFacade from "../utils/loginFacade.js";

export default function LoggedIn({setLoggedIn}) {

    const logout = () => {
        loginFacade.logout()
        setLoggedIn(false)
    }

    return (
        <div className="login-container">
            <button  onClick={logout}>Logout</button>
        </div>
    )

}