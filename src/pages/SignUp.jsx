import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import {useNavigate} from "react-router";
import trainingFacade from "../utils/trainingFacade.js";

function SignUp({}) {

    const navigate = useNavigate()
    const init = {
        userName: "",
        userPass: "",
        userEmail: "",
        streetAddress: "",
        zipCode: "",
        cityName: ""
    };
    const [userCredentials, setUserCredentials] = useState(init);
    const atSymbol = "@"

    //Checks for numbers in string
    function containsNumber(str) {
        return /[0-9]/.test(str);
    }


    const performSignUp = (evt) => {
        evt.preventDefault();
        //
        // if (userFacade.getUserByUserName(userCredentials.userName) === fetch(userFacade.getUserName())) {
        //     alert("Username already exists")
        // }

        // Email needs "@" to become valid.
        if (!userCredentials.userEmail.includes(atSymbol)) {
            alert("Please enter a valid email address")
        }
        if (!containsNumber(userCredentials.userPass)) {
            alert("Password must contain at least one number.")
            return
        }

        signUp(userCredentials.userName, userCredentials.userPass, userCredentials.userEmail,
            userCredentials.streetAddress, userCredentials.zipCode, userCredentials.cityName);
        navigate("/SignUpConfirmation")

    }

    const signUp = (user, pass, email, streetAddress, zipCode, cityName) => {
        userFacade.createUser(user, pass, email, streetAddress, zipCode, cityName)
    }

    const onChange = (evt) => {
        setUserCredentials({...userCredentials, [evt.target.id]: evt.target.value})
    }


    return (
        <div className="signup">
            <form>
                <h2>Sign Up</h2>
                <p>_________________________________________</p>
                <label htmlFor="username"><b>Username</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Username" name="username" id="userName"/>
                <label htmlFor="password"><b>Password</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Password" id="userPass"/>
                <label htmlFor="email"><b>Email</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Email" name="name" id="userEmail"/>
                <label htmlFor="address"><b>Street Address</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Street Address" name="address"
                       id="streetAddress"/>
                <label htmlFor="zip"><b>Zip Code</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Zip Code" name="zip" id="zipCode"/>
                <label htmlFor="city"><b>City</b></label>
                <input onChange={onChange} type="text" placeholder="Enter City" name="city" id="cityName"/>
                <button className="signup-btn" onClick={performSignUp} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;