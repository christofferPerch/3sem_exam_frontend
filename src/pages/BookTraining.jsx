import React, {useEffect, useState} from 'react';
import trainingFacade from "../utils/trainingFacade.js";

function BookTraining(props) {

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

    return (
        <>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Full address</th>
                    <th>Category</th>
                    <th>Participants</th>
                </tr>
                {training.map((data) => {
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
                    </tr>
                    {
                        data.users.map((user) => {
                            {
                                if (data.id == viewUsers) {
                                    return (
                                        <>
                                            <tr>
                                                <th>Username</th>
                                                <th>
                                                    <button onClick={() => {
                                                        setViewUsers(0)
                                                    }}>Close
                                                    </button>
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </tr>

                                            <tr>
                                                <td>{user.userName}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </>
                                    );
                                }
                            }
                        })
                    }
                })}


            </table>

        </>)
}

export default BookTraining;