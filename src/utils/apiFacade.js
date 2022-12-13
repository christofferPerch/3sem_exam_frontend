import {API_URL} from "../../settings.js";
import loginFacade from "./loginFacade.js";

function ApiFacade() {

    function handleHttpErrors(res) {
        if (!res.ok) {
            return Promise.reject({status: res.status, fullError: res.json()})
        }
        return res.json();
    }

    const fetchData = (endpoint, updateAction, SetErrorMessage) =>
    {
        const options = makeOptions("GET", true);
        return fetch(API_URL + "/api/" + endpoint, options)
            .then(handleHttpErrors)
            .then((data) => updateAction(data))
            .catch(err => {
                if (err.status)
                {
                    console.log(err)
                    err.fullError.then(e => SetErrorMessage(e.code + ": " + e.message))
                }
                else { SetErrorMessage("Network error"); }
            })
    }

    function makeOptions(method, addToken, body) {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loginFacade.loggedIn()) {
            opts.headers["x-access-token"] = loginFacade.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }




    return {
        handleHttpErrors,
        makeOptions,
        fetchData
    }
}

const apiFacade = ApiFacade();
export default apiFacade;