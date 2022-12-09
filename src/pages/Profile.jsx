import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import loginFacade from "../utils/loginFacade.js";
import {useNavigate} from "react-router";
import trainingFacade from "../utils/trainingFacade.js";
import {API_URL} from "../../settings.js";


function Profile({setLoggedIn}) {


    const [checked,setChecked] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const getData = async () => {
            await userFacade.getUserByUserName(userFacade.getUserName()).then((data) => {
                setActiveUser(data);
            }, "Some error")
        }
        getData();
    }, []);
    const [activeUser,setActiveUser] = useState ({userName:"",userEmail:"",userPass:"",address:{streetAddress:"",cityInfo:{}}})
    const init = {
        userName: activeUser.userName,
        userEmail:activeUser.userEmail,
        userPass:activeUser.userPass,
        streetAddress:activeUser.address.streetAddress,
        zipCode:activeUser.address.cityInfo.zipCode,
        cityName: activeUser.address.cityInfo.cityName
    }
    const [newUser,setNewUser] = useState(init)

    console.log(activeUser)





    const performUpdateUser = (evt) => {
        evt.preventDefault();
        updateUser(userFacade.getUserName(),newUser.userEmail,newUser.userPass,
            newUser.streetAddress,newUser.zipCode,newUser.cityName);
    }

    const updateUser = (username, updateEmail, updatePass,updateAddress,updateZip,updateCity) => {
        userFacade.updateUser(username,updateEmail,updatePass,updateAddress,updateZip,updateCity)
    }

    const performDeleteUser = () => {
        userFacade.deleteUser(userFacade.getUserName())
        loginFacade.logout()
        setLoggedIn(false)
        navigate("/")
    }

    const onChange = (evt) => {
        setNewUser({...newUser, [evt.target.id]: evt.target.value})
        console.log(newUser)

    }

    const btnClick = () => {
        if(checked){
            setChecked(false)
        }
        if(!checked){
            setChecked(true)
        }
    }


    return (
        <div>
            <div>
            <h1>PROFILE</h1>
                <button onClick={performDeleteUser}>DELETE PROFILE</button>
                <button onClick={btnClick}>Edit profile</button>

                    <p>Username: {userFacade.getUserName()}</p>
                    <p>Email: {activeUser.userEmail}</p>
                    <p>Street Address: {activeUser.address.streetAddress} </p>
                <p>Street Address: {activeUser.address.cityInfo.zipCode} </p>
                <p>Street Address: {activeUser.address.cityInfo.cityName} </p>

            </div>
            {checked ?  <form onSubmit={performUpdateUser}>
                <input id="userEmail" type="text" placeholder="Type a new email" onChange={onChange}/>
                <input id="userPass" type="text" placeholder="Type a new password" onChange={onChange}/>
                <input id="streetAddress" type="text" placeholder="Type a new street address" onChange={onChange}/>
                <input id="zipCode" type="text" placeholder="Type a new zipcode" onChange={onChange}/>
                <input id="cityName" type="text" placeholder="Type a new city name" onChange={onChange}/>
                <input type="submit" value="Update"/>
                <br/>
                <br/>
            </form> : null }

        </div>
    );
}

export default Profile;