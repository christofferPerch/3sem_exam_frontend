import React, {useEffect, useState} from 'react';
import trainingFacade from "../utils/trainingFacade.js";
import userFacade from "../utils/userFacade.js";

function BookTraining() {

    const [training, setTraining] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getAllTrainingSessions((data) => {
                setTraining(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const handleSubmit = () => {
        userFacade.addUserToTrainingSession(userFacade.getUserName(),trainingFacade.id)
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
                                <button onClick={() => {
                                    setViewUsers(data.id)
                                }}>{data.users.length}/{data.maxParticipants}</button>
                            </td>
                            <td>
                                <button onClick={handleSubmit}>Book now</button>
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