import React, {useEffect, useState} from 'react'
import loginFacade from "./utils/loginFacade.js";
import {Route, Routes} from "react-router";
import Header from "./components/Header.jsx";
import userFacade from "./utils/userFacade.js";
import Home from "./pages/Home.jsx";
import TrainingFacade from "./utils/trainingFacade";
import AdminPanel from "./pages/AdminPanel.jsx";
import trainingFacade from "./utils/trainingFacade";
import UserOverview from "./pages/UserOverview.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpConfirmation from "./pages/SignUpConfirmation";
import Profile from "./pages/Profile.jsx";
import BookTraining from "./pages/BookTraining.jsx";
import MySchedule from "./pages/MySchedule.jsx";

function App() {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (loginFacade.getToken()) setLoggedIn(true);
    }, []);

    return (
        <div className="main">
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
            <Routes>
                <Route path="/" element={<Home userFacade={userFacade}/>}/>
                <Route path="profile" element={<Profile setLoggedIn={setLoggedIn}/>}/>
                <Route path="signin" element={!loggedIn ? (<SignIn setLoggedIn={setLoggedIn}/>) : (<><Home/></>)}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/booking" element={<BookTraining/>}/>
                <Route path="myschedule" element={<MySchedule/>}></Route>
                <Route path="/SignUpConfirmation" element={<SignUpConfirmation/>}/>
                <Route path="admin-panel" element={<AdminPanel trainingFacade={trainingFacade} loggedIn={loggedIn}/>}/>
                <Route path="admin-panel/user-overview" element={<UserOverview userFacade={userFacade}/>}/>
                <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
            </Routes>

            <br/>
            <br/>
            <footer className="container">
                &copy;2022 | <a
                href="https://www.schoolhacks.eu"
                target="_blank"
                rel="noreferrer noopener"
            >SchoolHacks</a>
                <p className="footer-right">Sys Exam 2022 - CphBusiness Academy</p>
            </footer>

        </div>
    )
}

export default App
