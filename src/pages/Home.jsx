import React from 'react';
import {Outlet} from "react-router-dom";

function Home({userFacade}) {

    return (
        <div>
            <h1>Home</h1>
            <p> Welcome </p>
            <Outlet/>
        </div>
    );
}

export default Home;