import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

const getAllTrainingSessions = (updateAction, setErrorMessage) => {
    return apiFacade.fetchData("training/all",updateAction,setErrorMessage)
}

const getTrainingSessionById = (id, updateAction, setErrorMessage) => {
    return apiFacade.fetchData("training/" + id, updateAction, setErrorMessage)
}

const createTrainingSession = (trainingSession) => {
    const options = apiFacade.makeOptions("POST", null, trainingSession)
    return fetch(API_URL + "/api/info/training", options)
        .then(apiFacade.handleHttpErrors)
}

const updateTrainingSession = (trainingSession) => {
        const options = apiFacade.makeOptions("PUT", null, trainingSession)
        return fetch(API_URL + "/api/info/training/update", options)
            .then(apiFacade.handleHttpErrors)
}

const deleteTrainingSession = (id) => {
    const options = apiFacade.makeOptions("DELETE", null,)
    return fetch(API_URL + "/api/info/training/"+id, options)
        .then(apiFacade.handleHttpErrors)
}
