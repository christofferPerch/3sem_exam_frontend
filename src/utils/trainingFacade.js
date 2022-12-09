import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function TrainingFacade(){
    const getAllTrainingSessions = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("training/all",updateAction,setErrorMessage)
    }

    const getTrainingSessionById = (id, updateAction, setErrorMessage) => {
        return apiFacade.fetchData("training/" + id, updateAction, setErrorMessage)
    }

    const getById = (id) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/training/get/"+id,options)
            .then(apiFacade.handleHttpErrors)
    }


    const createTrainingSession = (trainingSession) => {
        const options = apiFacade.makeOptions("POST", null, trainingSession)
        return fetch(API_URL + "/api/training", options)
            .then(apiFacade.handleHttpErrors)
    }

    const updateTrainingSession = (trainingSession) => {
        const options = apiFacade.makeOptions("PUT", null, trainingSession)
        return fetch(API_URL + "/api/training/update", options)
            .then(apiFacade.handleHttpErrors)
    }

    const deleteTrainingSession = (id) => {
        const options = apiFacade.makeOptions("DELETE", null,)
        return fetch(API_URL + "/api/training/"+id, options)
            .then(apiFacade.handleHttpErrors)
    }

    const getDistance = (from,to, update, error) => {
        return apiFacade.fetchData("training/distance/"+from+"/"+to,update,error)
    }

    return {
        getAllTrainingSessions,
        getTrainingSessionById,
        createTrainingSession,
        updateTrainingSession,
        deleteTrainingSession,
        getById,
        getDistance
    }
}
const trainingFacade = TrainingFacade();
export default trainingFacade;
