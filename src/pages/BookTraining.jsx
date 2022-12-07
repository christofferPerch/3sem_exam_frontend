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
                setTraining(   data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const handleRefresh = (evt) => {
        evt.preventDefault
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
                                <button onSubmit={handleRefresh} onClick={() => {
                                    userFacade.addUserToTrainingSession(userFacade.getUserName(), data.id).then(() => {
                                        setRefresh(!refresh)
                                    })
                                }}>Book now
                                </button>
                            </td>
                            <td>
                                <button onSubmit={handleRefresh} onClick={() => {
                                    userFacade.removeUserToTrainingSession(userFacade.getUserName(), data.id).then(() => {
                                        setRefresh(!refresh)
                                    })
                                }}>Deregister
                                </button>
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