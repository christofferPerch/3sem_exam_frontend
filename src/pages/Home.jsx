import React from 'react';
import {Outlet} from "react-router-dom";
import SignUpHomeBtn from "../components/SignUpHomeBtn.jsx";
import ptbackground from "../images/pt2.png"
import "../styles/main.css";

function Home({loggedIn, setLoggedIn}) {

    return (
        <div>
            <div className="pt-img" style={{
                backgroundImage: `url(${ptbackground})`}}>

            <h1 className="home-h1">JOIN ME NOW!</h1>
            <h3 className="home-h3">Start your training adventure today</h3>

    {!loggedIn ? (<SignUpHomeBtn setLoggedIn={setLoggedIn}/>) : (<div></div>)}
            </div>

            <div className="contentleft">
                <h2>About me</h2>
                <p><i>
                    When I first began my adventure with fitness I was anything but the picture of health.
                    I was very overweight and I realized it was because of eating fast food and drinking pop and beer
                    on a regular basis. I decided to do something about it.
                    I immersed myself in a new lifestyle and have never regretted it.
                    <br/><br/>
                    I did, however, have multiple ups and downs.
                    It took me years to make a decision to thoroughly examine my workouts and make necessary changes.
                    <br/><br/>
                    I care deeply about my clients, and there’s nothing of more value to me
                    than helping somebody go through an experience that makes them happy, confident, and strong.
                    <br/><br/>
                    I realize how being overweight affects many aspects of your life,
                    and I want to be there for you and help you discover the benefits and
                    joys of training that helped me become the person I am today.
                    I’m here to be your personal guide on every step of the journey.</i>
                    <br/><br/>
                    Join me now, and let me help you!
                </p>
            </div>

            <div className="contentright">
                <h2>Contact</h2>
                <p><strong>Phone Number:</strong> <br/>29922992</p>
                <p><strong>Based in:</strong> <br/> Denmark</p>
                <p><strong>Location:</strong> <br/> Nørgaardsvej 30 - Kongens Lyngby, 2800</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="fa fa-facebook"></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="fa fa-twitter"></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="fa fa-instagram"></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="fa fa-youtube"></a>


            </div>
            <Outlet/>
        </div>
    );
}

export default Home;