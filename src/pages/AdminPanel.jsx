import React from 'react';

function AdminPanel({trainingFacade}) {
    return (
        <div>
            <h1>Home</h1>
            {trainingFacade.getAllTrainingSessions((data) => {
                console.log(data);
            }, "Some error")}
        </div>
    );
}

export default AdminPanel;