import loginFacade from "../utils/loginFacade.js";
import React from "react";
import {useNavigate} from "react-router";


function SignUpBtn(props) {

    const navigate = useNavigate();

    return (

        <div className="login-container">
            <button onClick={() => navigate("/signup")}>Sign up</button>
        </div>
    )
}
export default SignUpBtn;