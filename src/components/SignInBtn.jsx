import React from 'react';
import {useNavigate} from "react-router-dom";

function SignInBtn() {
    const navigate = useNavigate()

    return (
        <div className="login-container">
            <button onClick={() => navigate("/signin")}>Sign In</button>

        </div>
    );
}

export default SignInBtn;