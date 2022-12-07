import React, {useEffect, useState} from 'react';
import trainingFacade from "../utils/trainingFacade.js";
import userFacade from "../utils/userFacade.js";

function BookTraining() {

    const [training, setTraining] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [viewUsers, setViewUsers] = useState(0);

    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getAllTrainingSessions((data) => {
                setTraining(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);


    const handleSubmit = (userName, trainingId) => {
        userFacade.addUserToTrainingSession(userName,trainingId)
    }

    const handleDelete = (userName, trainingId) => {
        userFacade.removeUserToTrainingSession(userName,trainingId)
    }

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Full address</th>
                    <th>Category</th>
                    <th>Participants</th>
                    <th>Book</th>
                    <th>Deregister</th>
                </tr>
                </thead>
                <tbody>
                {training.map((data) => {
                    return (
                        <tr key={data.id}>
                            <td>{data.title}</td>
                            <td>{data.time}</td>
                            <td>{data.date}</td>
                            <td>{data.fullAddress}</td>
                            <td>{data.category.categoryName}</td>
                            <td>
                                <button>{data.users.length}/{data.maxParticipants}</button>
                            </td>
                            <td>
                                <button onClick={() => handleSubmit(userFacade.getUserName(),data.id)}>Book now</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(userFacade.getUserName(),data.id)}>Deregister</button>
                            </td>
                        </tr>

                    );
                })}
                </tbody>
            </table>
        </>
    )
}

export default BookTraining;