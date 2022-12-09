import React from 'react';
import {NavLink} from "react-router-dom";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import SignUpBtn from "./SignUpBtn.jsx";
import SignInBtn from "./SignInBtn.jsx";
import logo from "../images/logo.png";
import userFacade from "../utils/userFacade.js";
import BookTraining from "../pages/BookTraining.jsx";


function Header({loggedIn, setLoggedIn}) {
    return (

        <nav className="topnav">
            <NavLink className="nav-logo" to="/"><i className="fa fa-heartbeat"></i></NavLink>
            <NavLink className="nav-home" to="/"><i></i> Home</NavLink>

            {loggedIn ? (<NavLink  to="booking"><i className="fa fa-sign-in"></i>BOOK TRAINING</NavLink>) : <></>}

            {userFacade.hasUserAccess('admin',loggedIn) && (<NavLink to="admin-panel"><i className="fa fa-lock"></i> Admin </NavLink>)}
            {loggedIn ? (<NavLink className="nav-home" to="admin-panel">ADMIN PAGE</NavLink>) : <></>}

            {loggedIn ? (<NavLink className="nav-home" to="myschedule">MY SCHEDULE</NavLink>) : <></>}

            {loggedIn ? (<NavLink className="profileIcon" to="profile"><i className="fa fa-user"></i> {userFacade.getUserName()}</NavLink>) : <></>}

            {!loggedIn ? (<SignUpBtn/>) : (<div></div>)}

            {!loggedIn ? (<SignInBtn setLoggedIn={setLoggedIn}/>) : (<div><LoggedIn setLoggedIn={setLoggedIn}/></div>)}

        </nav>
    );
}

export default Header;