import {useEffect, useState} from 'react'
import loginFacade from "./utils/loginFacade.js";
import {Route, Routes} from "react-router";
import Header from "./components/Header.jsx";
import userFacade from "./utils/userFacade.js";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp";
import SignUpConfirmation from "./pages/SignUpConfirmation";

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('All is good ... so far');

  useEffect(() => {
    if (loginFacade.getToken()) setLoggedIn(true);
  }, []);

  return (

        <div>
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} userfacade={userFacade}/>
      <Routes>
          <Route path="/" element={<Home userFacade={userFacade}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/SignUpConfirmation" element={<SignUpConfirmation/>}/>
          <Route path="*" element={<h1>Page Not Found !!!!</h1>}/>
      </Routes>

        </div>

  )
}

export default App
