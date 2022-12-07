import React, {useState, useEffect} from 'react';
import "../styles/UserOverview.css";
import data from "bootstrap/js/src/dom/data.js";

function UserOverview({userFacade}) {
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState(0)
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
        return "eRror"
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
        <div>
            <h1>User overview</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Zip</th>
                        <th>City</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    {users.map((user) => {
                        if (edit == data.id) {
                            return (
                                <>
                                    <tr>
                                        <td><input type="text" placeholder={"Username"} value={inputs.userName}
                                                   onChange={handleChange} name={"userName"}/></td>
                                        <td><input type="text" placeholder={"Email"} value={inputs.userEmail}
                                                   onChange={handleChange} name={"userEmail"}/></td>
                                        <td><input type="text" placeholder={"Address"} value={inputs.streetAddress}
                                                   onChange={handleChange} name={"streetAddress"}/></td>
                                        <td>{user.address.cityInfo.zipCode}</td>
                                        <td><input type="text" placeholder={"Address"} value={inputs.cityName}
                                                   onChange={handleChange} name={"cityName"}/></td>
                                        <td>
                                            <button onClick={() => {
                                                userFacade.updateUser(inputs.userName, inputs.userEmail, user.userPass, inputs.streetAddress, user.address.cityInfo.zipCode, user.address.cityInfo.cityName).then(() => {
                                                    setEdit(0)
                                                    setRefresh(!refresh)
                                                })
                                            }}>
                                            Submit</button>
                                        </td>
                                        <td></td>
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
                                            <button onClick={() => {
                                                userFacade.deleteUser(user.userName).then(() => {
                                                    setRefresh(!refresh)
                                                })
                                            }}>Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                setEdit(user.id)
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