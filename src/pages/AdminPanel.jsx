import React, {useEffect, useState} from 'react';
import "../styles/AdminPanel.css";

function AdminPanel({trainingFacade}) {
    const [training, setTraining] = useState([]);
    useEffect(() => {
        const getData = async () => {
            trainingFacade.getAllTrainingSessions((data) => {
                setTraining(data);
            }, "Some error")
        }
        getData();
    }, []);

    return (
        <div>
            <h1 className={"myBody"}>TRAINING SESSION SCHEDULE</h1>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Participants</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {training.map((data) => {
                    return (

                            <tr key={data.id}>
                                <td>{data.title}</td>
                                <td>{data.time}</td>
                                <td>{data.date}</td>
                                <td>{data.category.categoryName}</td>
                                <td>{data.users.length}/{data.maxParticipants}</td>
                                <td><button >Edit</button></td>
                                <td><button onClick={() => {
                                    trainingFacade.deleteTrainingSession(data.id);
                                }}>Delete</button></td>
                            </tr>
                    );
                })}
            </table>
        </div>
    );
}

//{data.fullAddress}


export default AdminPanel;