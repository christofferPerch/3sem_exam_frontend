import React, {useEffect, useState} from 'react';
import trainingFacade from "../utils/trainingFacade.js";
import userFacade from "../utils/userFacade.js";
import BookingPageDetailsBtn from "../components/BookingPageDetailsBtn.jsx";
import Details from "../components/Details.jsx";
import "../styles/user.css";


function BookTraining() {

    const [training, setTraining] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [viewUsers, setViewUsers] = useState(0);
    const [booked,setBooked] = useState(false);
    const [clicked,setClicked] = useState(true);

    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getAllTrainingSessions((data) => {
                setTraining(   data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const bookBtn = (data) => {
        const name = userFacade.getUserName()
        var text = "join"
        console.log(data.users)
        data.users.map((user)=> {
            if (user.userName === name) {
                text = "Deregister"
            }
        })
        return text;
    }

    const handleRefresh = (evt) => {
        evt.preventDefault
    }

    return (
        <div className="tableBody">
            <h1>Book Training</h1>
            <Details clicked={clicked} setClicked={setClicked}/>
            <table>
                <thead>
                <tr className="blue">
                    <th>Title</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Full address</th>
                    <th>Category</th>
                    <th>Participants</th>
                    <th>View Details</th>
                    <th>TEST BTN</th>
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
                                <p>{data.users.length}/{data.maxParticipants}</p>
                            </td>
                            <td>{<BookingPageDetailsBtn clicked={clicked} setClicked={setClicked}/>}</td>
                            <td>
                                <button onSubmit={handleRefresh} onClick={!booked ? () =>
                                    userFacade.addUserToTrainingSession(userFacade.getUserName(),data.id).then(() =>{
                                        setRefresh(!refresh)
                                    }).then(()=>{
                                        setBooked(true)
                                    })
                                    : () => userFacade.removeUserToTrainingSession(userFacade.getUserName(),data.id).then(()=>{
                                        setRefresh(!refresh)
                                }).then(()=>{
                                    setBooked(false)
                                    })}>{bookBtn(data)}</button>
                            </td>
                        </tr>

                    );
                })}
                </tbody>
            </table>

        </div>

    )





}

export default BookTraining;