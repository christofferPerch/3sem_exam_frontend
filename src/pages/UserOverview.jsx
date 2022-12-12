import React, {useState, useEffect} from 'react';
import "../styles/useroverview.css";

function UserOverview({userFacade}) {
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState("")
    const [refresh, setRefresh] = useState(false);
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }


    function setErrorMessage() {
        return "Error"
    }


    useEffect(() => {
        const getData = async () => {
            userFacade.getAllUsers((data) => {
                setUsers(data);
            }, setErrorMessage)
        }
        getData();
    }, [refresh]);

    return (
        <div className={"userOverviewBody"}>
            <h1>User Overview🔑</h1>
            <form onSubmit={handleSubmit} className={"myForm"}>
                <table>
                    <tr className={"blue"}>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Zip</th>
                        <th>City</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    {users.map((user) => {
                        if (edit == user.userName) {
                            return (
                                <>
                                    <tr>
                                        <td>{user.userName}</td>
                                        <td><input type="text" placeholder={"Email"} value={inputs.userEmail}
                                                   onChange={handleChange} name={"userEmail"}/></td>
                                        <td><input type="text" placeholder={"Address"} value={inputs.streetAddress}
                                                   onChange={handleChange} name={"streetAddress"}/></td>
                                        <td>{user.address.cityInfo.zipCode}</td>
                                        <td><input type="text" placeholder={"Address"} value={inputs.cityName}
                                                   onChange={handleChange} name={"cityName"}/></td>
                                        <td>
                                            <button className={"submitUpdate"} onClick={() => {
                                                userFacade.updateUser(inputs.userName, inputs.userEmail, user.userPass, inputs.streetAddress, user.address.cityInfo.zipCode, user.address.cityInfo.cityName).then(() => {
                                                    setEdit(user.userName)
                                                    setRefresh(!refresh)
                                                })
                                            }}>
                                            Submit</button>
                                        </td>
                                        <td><button className={"closeEditBtn"} onClick={() => {
                                            setEdit(0)
                                        }}>Close</button></td>
                                    </tr>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <tr>
                                        <td>{user.userName}</td>
                                        <td>{user.userEmail}</td>
                                        <td>{user.address.streetAddress}</td>
                                        <td>{user.address.cityInfo.zipCode}</td>
                                        <td>{user.address.cityInfo.cityName}</td>
                                        <td>
                                            <button className={"deleteBtn"} onClick={() => {
                                                userFacade.deleteUser(user.userName).then(() => {
                                                    setRefresh(!refresh)
                                                })
                                            }}>Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className={"editBtn"} onClick={() => {
                                                setEdit(user.userName)
                                            }}>Edit
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            );
                        }
                    })}
                </table>
            </form>
        </div>
    );
}

export default UserOverview;