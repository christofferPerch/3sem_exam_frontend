import React from 'react';
import {Outlet} from "react-router-dom";
import LoggedIn from "../components/LoggedIn.jsx";
import SignUpHomeBtn from "../components/SignUpHomeBtn.jsx";

function Home({loggedIn, setLoggedIn}) {

    return (
        <div>
            <h1>Home</h1>

            {!loggedIn ? (<SignUpHomeBtn setLoggedIn={setLoggedIn} />) : (<div><LoggedIn setLoggedIn={setLoggedIn}/></div>)}

            <Outlet/>
        </div>
    );
}

export default Home;