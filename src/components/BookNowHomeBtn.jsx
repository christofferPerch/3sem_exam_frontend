import React from 'react';
import {useNavigate} from "react-router-dom";

function BookNowHomeBtn() {
    const navigate = useNavigate()

    return (
        <div className="home-center">
            <button className="signup-home-btn" onClick={() => navigate("/booking")}>Book Now!</button>
        </div>
    );
}

export default BookNowHomeBtn;