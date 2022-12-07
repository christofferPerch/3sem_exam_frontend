import apiFacade from "./apiFacade.js";
import loginFacade from "./loginFacade.js";

import {API_URL} from "../../settings.js";

function UserFacade () {


    const createUser = (user, pass,email,streetAddress,zipCode,cityName) => {
        const options = apiFacade.makeOptions("POST", null,
            {"userName": user,
                  "userEmail": email,
                  "userPass":pass,
                  "address": {
                      "streetAddress": streetAddress,
                      "cityInfo":{
                      "zipCode": zipCode,
                      "cityName": cityName
                      }}}
        )
        return fetch(API_URL + "/api/users", options)
            .then(apiFacade.handleHttpErrors)
    }

   const updateUser = (username, updateEmail, updatePass,updateAddress,updateZip,updateCity) => {
        const options = apiFacade.makeOptions("PUT", true,
            {"userName": username,
                "userEmail": updateEmail,
                "userPass":updatePass,
                "address": {
                    "streetAddress": updateAddress,
                    "cityInfo":{
                        "zipCode": updateZip,
                        "cityName": updateCity
                    }}}
            )
        return fetch(API_URL + "/api/users/" + username, options)
            .then(apiFacade.handleHttpErrors)
    }

    const deleteUser = (userName) => {
        const options = apiFacade.makeOptions("DELETE",null,null);
        return fetch(API_URL +"/api/users/"+userName,options)
            .then(apiFacade.handleHttpErrors)
    }

    const getUserByUserName = (userName) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/users/"+userName,options)
            .then(apiFacade.handleHttpErrors)
    }
    const getAllUsers = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("users/all",updateAction,setErrorMessage)
    }

    const addUserToTrainingSession = (userName,trainingId) => {
        const options = apiFacade.makeOptions("POST",null,null);
        return fetch(API_URL+"/api/users/add/"+userName+"/"+trainingId)
            .then(apiFacade.handleHttpErrors)
    }
    const removeUserToTrainingSession = (userName,trainingId) => {
        const options = apiFacade.makeOptions("DELETE",null,null);
        return fetch(API_URL+"/api/users/add/"+userName+"/"+trainingId)
            .then(apiFacade.handleHttpErrors)
    }

    const getUserRoles = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }


    const getUserName = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.username
        } else return ""
    }

    const getUserEmail = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.userEmail
        } else return ""
    }

    const getUserPass = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.userPass
        } else return ""
    }

    const getUserAddress = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.streetAddress
        } else return ""
    }

    const getUserZipCode = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.zipCode
        } else return ""
    }

    const getUserCityName = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.cityName
        } else return ""
    }

    return {
        createUser,
        updateUser,
        hasUserAccess,
        getUserRoles,
        getUserName,
        getUserByUserName,
        getUserEmail,
        getUserAddress,
        getUserZipCode,
        getUserCityName,
        getUserPass,
        deleteUser,
        getAllUsers
    }

}

const userFacade = UserFacade();
export default userFacade;