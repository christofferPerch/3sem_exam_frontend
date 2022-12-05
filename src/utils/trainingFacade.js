import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

function TrainingFacade(){
    const getAllTrainingSessions = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("training/all",updateAction,setErrorMessage)
    }

    const getTrainingSessionById = (id, updateAction, setErrorMessage) => {
        return apiFacade.fetchData("training/" + id, updateAction, setErrorMessage)
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

    return {
        getAllTrainingSessions,
        getTrainingSessionById,
        createTrainingSession,
        updateTrainingSession,
        deleteTrainingSession
    }
}
const trainingFacade = TrainingFacade();
export default trainingFacade;
