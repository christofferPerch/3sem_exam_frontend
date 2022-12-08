import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import trainingFacade from "../utils/trainingFacade.js";
import apiFacade from "../utils/apiFacade.js";
import {API_URL} from "../../settings.js";

function Details({clicked,setClicked}) {

    const [activeUser,setActiveUser] = useState ({userName:"",userEmail:"",userPass:"",address:{streetAddress:"",cityInfo:{}}})
    const [trainingAddress,setTrainingAddress] = useState({fullAddress:""})
    const [googleInfo,setGoogleInfo] = useState({distance:"",duration:""})

    useEffect(() => {
        const getData = async () => {
            await userFacade.getUserByUserName(userFacade.getUserName()).then((data) => {
                setActiveUser(data);
            }, "Some error")
        }
        getData();
    }, []);


    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getById(7).then((data) => {
                setTrainingAddress(data);
            }, "Some error")
        }
        getData();
    }, []);


    const originAddress = "odinsvej10lyngby"//activeUser.address.streetAddress+activeUser.address.cityInfo.cityName
    const destinationAddress = "sanktjacobsvej8aballerup"//trainingAddress.fullAddress






    useEffect(() => {
        const options = apiFacade.makeOptions("GET",null,null);
        const getData = async () => {
            await fetch(API_URL+"/api/training/distance/"+originAddress+"/"+destinationAddress,options).then((data) => {
                setGoogleInfo(data);
            }, "Some error")
        }
        getData();
    }, []);

    console.log(googleInfo)



    return (
        <>
            {!clicked ?(
                <h1>TEST</h1>) : null
            }
        </>
    );
}

export default Details;