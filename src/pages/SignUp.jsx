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
        <div className="login-container">
            <form>
                <input onChange={onChange} type="text" placeholder="Username" id="userName"/>
                <input onChange={onChange} type="text" placeholder="Password" id="userPass"/>
                <input onChange={onChange} type="text" placeholder="Email" id="userEmail"/>
                <input onChange={onChange} type="text" placeholder="Street Address" id="streetAddress"/>
                <input onChange={onChange} type="text" placeholder="Zip" id="zipCode"/>
                <input onChange={onChange} type="text" placeholder="City" id="cityName"/>
                <button onClick={performSignUp} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;