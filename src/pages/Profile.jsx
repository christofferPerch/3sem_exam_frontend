import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import loginFacade from "../utils/loginFacade.js";
import {useNavigate} from "react-router";


function Profile({setLoggedIn}) {


    const [checked,setChecked] = useState(false);
    const init = {userName: userFacade.getUserName(),userEmail:userFacade.getUserEmail(),
        userPass:userFacade.getUserPass(),streetAddress:userFacade.getUserAddress(),zipCode:userFacade.getUserZipCode(),cityName:userFacade.getUserZipCode()}
    const [newUser,setNewUser] = useState(init)
    const navigate = useNavigate();

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
    console.log(userFacade.getUserPass())
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
                <p>Email: {userFacade.getUserEmail()}</p>
                <p>Street Address: {userFacade.getUserAddress()}</p>
                <p>Zip: {userFacade.getUserZipCode()}</p>
                <p>City: {userFacade.getUserCityName()}</p>
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