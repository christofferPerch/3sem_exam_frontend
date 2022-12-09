import React, {useEffect, useState} from 'react';
import userFacade from "../utils/userFacade.js";
import trainingFacade from "../utils/trainingFacade.js";
import apiFacade from "../utils/apiFacade.js";
import {API_URL} from "../../settings.js";

function Details({clicked,setClicked}) {

    const [activeUser,setActiveUser] = useState ({userName:"",userEmail:"",userPass:"",address:{streetAddress:"",cityInfo:{}}})
    const [trainingAddress,setTrainingAddress] = useState({fullAddress:""})
    const [distance,setDistance] = useState ("")
    const [duration,setDuration] = useState("")

    useEffect(() => {
        const getData =  () => {
             userFacade.getUserByUserName(userFacade.getUserName()).then((data) => {
                setActiveUser(data);
            }, "Some error")

        }
        getData();
    }, []);


    useEffect(() => {
        const getData =  () => {
            trainingFacade.getById(7).then((data) => {
                setTrainingAddress(data);
            }, "Some error")
        }
        getData();
    }, []);



    let originAddress = activeUser.address.streetAddress+activeUser.address.cityInfo.cityName
    let destinationAddress = trainingAddress.fullAddress
    originAddress = originAddress.replace(/\s+/g, '');
    destinationAddress = destinationAddress.replace(/\s+/g, '');


    console.log(originAddress)
    console.log(destinationAddress)



    useEffect(() => {
        const getData = async () => {
            await trainingFacade.getDistance(originAddress, destinationAddress, (data) => {
                data.valueOf().rows.map((row) => row.elements.map((element) => {
                    setDistance(element.distance.text)
                    setDuration(element.duration.text)
                }))
            }, "some error")
        }
        if(originAddress !== undefined || destinationAddress !== undefined) {
            getData()
        }

    }, [originAddress,destinationAddress]);







    return (
        <>
            {!clicked ?(<div><h1>Your address: {originAddress}</h1><br/>
                    <h1>Distance to the training: {distance} - duration: {duration}</h1></div>

                ): null
            }
        </>
    );
}

export default Details;