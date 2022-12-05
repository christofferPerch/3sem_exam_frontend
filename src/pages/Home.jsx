import React from 'react';

function Home({userFacade}) {

    return (
        <div>
            <h1>Home</h1>
            <p> Welcome {userFacade.getUserName()}</p>
        </div>
    );
}

export default Home;