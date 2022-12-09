import React, {useState} from 'react';
import loginFacade from "../utils/loginFacade.js";
import "../styles/user.css";
import {useNavigate} from "react-router";

function SignIn({setLoggedIn}) {
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }

    const login = (user, pass) => {
        loginFacade.login(user, pass)
            .then(res => setLoggedIn(true))
            .catch(async err => {
                if (err.status) {
                    setError(await err.fullError.then(e => e.message))
                    err.fullError.then(e => console.log(e.message))
                    // err.fullError.then(e => window.alert(JSON.stringify(e.message)))

                }
            })
    }

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <div className="signin">
            <form>
                <h2>Sign In</h2>
                <p>_________________________________________</p>
                <label htmlFor="username"><b>Username</b></label>
                <input onChange={onChange} type="text" placeholder="Enter Username" name="username" id="username"/>{" "}
                <label htmlFor="password"><b>Password</b></label>
                <input onChange={onChange} type="password" placeholder="Enter Password" name="password" id="password"/>
                <p><font color="#DC143C">{error}</font></p>
                <button className="signup-btn" onClick={performLogin} type="submit">Login</button>
            </form>
            <p>_________________________________________</p>
            <form>
                <p className="signup-p">Don't have an account yet? Sign up now!</p>
                <button onClick={handleSignUp} className="signup-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default SignIn;