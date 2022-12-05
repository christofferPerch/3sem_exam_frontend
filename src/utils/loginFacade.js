import {API_URL} from "../../settings.js";
import apiFacade from "./apiFacade.js";


function LoginFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = apiFacade.makeOptions("POST", true, {username: user, password: password});
        return fetch(API_URL + "/api/login", options)
            .then(apiFacade.handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    return {
        setToken,
        getToken,
        loggedIn,
        login,
        logout
    }
}

const loginFacade = LoginFacade();
export default loginFacade;