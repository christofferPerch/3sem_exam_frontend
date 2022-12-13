import React, {useEffect, useState} from 'react';
import trainingFacade from "../utils/trainingFacade.js";
import userFacade from "../utils/userFacade.js";
import BookingPageDetailsBtn from "../components/BookingPageDetailsBtn.jsx";
import "../styles/user.css";


function BookTraining() {

    const [training, setTraining] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [booked, setBooked] = useState(false);
    const [clicked, setClicked] = useState(true);
    const [addresses, setAddresses] = useState({userAddress: "", destinationAddress: ""})
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")


    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getAllTrainingSessions((data) => {
                setTraining(data);
            }, "Some error")
        }
        getData();
    }, [refresh]);

    const bookBtn = (data) => {
        const name = userFacade.getUserName()
        let text = "Join";
        console.log(data.users)
        data.users.map((user) => {
            if (user.userName === name) {
                text = "Deregister"
            }
        })
        return text;
    }

    const onChange = (evt) => {
        setAddresses({...addresses, [evt.target.id]: evt.target.value})
    }

    const handleRefresh = (evt) => {
        evt.preventDefault
    }

    const calculateDistance = async () => {

        await trainingFacade.getDistance(addresses.userAddress.replace(/\s+/g, ''), addresses.destinationAddress.replace(/\s+/g, ''), (data) => {
            data.valueOf().rows.map((row) => row.elements.map((element) => {
                setDistance(element.distance.text)
                setDuration(element.duration.text)
            }))
        })
    }

    console.log(addresses)

    return (
        <div className="tableBody">
            <h1>Book Training</h1>
            {!clicked ? (<div><h3>Please type your address and the destination: </h3>
                    <br/>
                    <input type="text" placeholder="Your address" onChange={onChange} id={"userAddress"}/>
                    <input type="text" placeholder="Training Address" onChange={onChange} id={"destinationAddress"}/>
                    <button onClick={() => {
                        calculateDistance()
                    }}>
                        Calculate
                    </button>
                    <h1>Distance to the training: {distance} - duration: {duration}</h1></div>

            ) : null
            }
            <table>
                <thead>
                <tr className="blue">
                    <th>TITLE</th>
                    <th>TIME</th>
                    <th>DATE</th>
                    <th>FULL ADDRESS</th>
                    <th>CATEGORY</th>
                    <th>PARTICIPANTS</th>
                    <th>FIND DISTANCE</th>
                    <th>JOIN</th>
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
                                        userFacade.addUserToTrainingSession(userFacade.getUserName(), data.id).then(() => {
                                            setRefresh(!refresh)
                                        }).then(() => {
                                            setBooked(true)
                                        })
                                    : () => userFacade.removeUserToTrainingSession(userFacade.getUserName(), data.id).then(() => {
                                        setRefresh(!refresh)
                                    }).then(() => {
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