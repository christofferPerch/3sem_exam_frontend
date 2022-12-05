import React from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";

function Header({loggedIn, setLoggedIn, userFacade}) {
    return (

        <nav className="topnav">

            <NavLink className="active" to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>



            {!loggedIn ? (<Login setLoggedIn={setLoggedIn} />) : (<div><LoggedIn setLoggedIn={setLoggedIn}/></div>)}

        </nav>
    );
}

export default Header;