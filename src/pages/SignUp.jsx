import React, {useState} from 'react';
import userFacade from "../utils/userFacade.js";
import {useNavigate} from "react-router";

function SignUp({}) {

    const navigate = useNavigate()
    const init = {userName: "", userPass: "", userEmail: "", streetAddress: "", zipCode: "",cityName: "" };
    const [userCredentials, setUserCredentials] = useState(init);

    const performSignUp = (evt) => {
        evt.preventDefault();
        signUp(userCredentials.userName, userCredentials.userPass,userCredentials.userEmail,
            userCredentials.streetAddress,userCredentials.zipCode,userCredentials.cityName);
        navigate("/SignUpConfirmation")
    }

    const signUp = (user, pass,email,streetAddress,zipCode,cityName) => {
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
                <label for="username"><b>Username</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Username" name="username" id="userName"/>
                <label for="password"><b>Password</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Password" id="userPass"/>
                <label for="email"><b>Email</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Email" name="name" id="userEmail"/>
                <label for="address"><b>Street Address</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Street Address" name="address" id="streetAddress"/>
                <label for="zip"><b>Zip Code</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Zip Code" name="zip" id="zipCode"/>
                <label for="city"><b>City</b></label>
                <input onChange={onChange} type="text" placeholder="Enter City" name="city" id="cityName"/>
                <button onClick={performSignUp} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;