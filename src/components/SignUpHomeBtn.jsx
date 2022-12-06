import React from 'react';
import {useNavigate} from "react-router-dom";

function SignUpHomeBtn() {
    const navigate = useNavigate()

    return (
        <div className="home-center">
            <button className="signup-home-btn" onClick={() => navigate("/signup")}>Sign Up Now!</button>
        </div>
    );
}

export default SignUpHomeBtn;