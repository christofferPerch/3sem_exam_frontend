import React from 'react';
import {useNavigate} from "react-router-dom";

function LoginButton() {
    const navigate = useNavigate()

    return (
        <div className="login-container">
            <button onClick={() => navigate("/login")}>Login</button>

        </div>
    );
}

export default LoginButton;