import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import {useNavigate} from "react-router";
import trainingFacade from "../utils/trainingFacade.js";

function SignUp() {

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
    const [error, setError] = useState("")

    const atSymbol = "@"

    //Checks for numbers in string
    function containsNumber(str) {
        return /[0-9]/.test(str);
    }


    const performSignUp = (evt) => {
        evt.preventDefault();


        // Email needs "@" to become valid.
        if (!userCredentials.userEmail.includes(atSymbol)) {
            alert("Please enter a valid email address")
            return
        }
        if (!containsNumber(userCredentials.userPass)) {
            alert("Password must contain at least one number")
            return
        }
        if (userCredentials.streetAddress.trim().length === 0) {
            alert("You haven't entered a street address")
            return
        }
        if (userCredentials.cityName.trim().length === 0) {
            alert("You haven't entered a city name")
            return
        }

        signUp(userCredentials.userName, userCredentials.userPass, userCredentials.userEmail,
            userCredentials.streetAddress, userCredentials.zipCode, userCredentials.cityName);



    }

    const signUp = (user, pass, email, streetAddress, zipCode, cityName) => {
        userFacade.createUser(user, pass, email, streetAddress, zipCode, cityName)
            .then(res => navigate("/SignUpConfirmation"))
            .catch(async err => {
                if (err.status) {
                    setError(await err.fullError.then(e => e.message))
                    err.fullError.then(e => console.log(e.message))
                }
            })


    }

    const onChange = (evt) => {
        setUserCredentials({...userCredentials, [evt.target.id]: evt.target.value})
    }


    return (
        <div className="signup">
            <form>
                <h2>Sign Up</h2>
                <p>_________________________________________</p>
                <label htmlFor="username"><b>Username<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Username" name="username" id="userName"/>
                <label htmlFor="password"><b>Password<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="password" placeholder="Enter Password" id="userPass"/>
                <label htmlFor="email"><b>Email<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Email" name="name" id="userEmail"/>
                <label htmlFor="address"><b>Street Address<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter Street Address" name="address"
                       id="streetAddress"/>
                <label htmlFor="zip"><b>Zip Code<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="number" placeholder="Enter Zip Code" name="zip" id="zipCode"/>
                <label htmlFor="city"><b>City<font color="#DC143C">*</font></b></label>
                <input onChange={onChange} type="text" placeholder="Enter City" name="city" id="cityName"/>
                <p><font color="#DC143C">{error}</font></p>
                <button className="signup-btn" onClick={performSignUp} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;