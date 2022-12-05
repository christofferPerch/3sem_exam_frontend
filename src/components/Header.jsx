import React from 'react';
import {NavLink} from "react-router-dom";
import Login from "../pages/Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import LoginButton from "./LoginButton.jsx";

function Header({loggedIn, setLoggedIn, userFacade}) {
    return (

        <nav className="topnav">

            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>

            {!loggedIn ? (<LoginButton/>) :
                (<><LoggedIn setLoggedIn={setLoggedIn}/></>)}


        </nav>
    );
}

export default Header;