import React, { useState } from 'react'
import './Style/Login.css'
import {useNavigate} from 'react-router-dom';
import Logo from './Style/Logo.png'
import imagelogin from './Style/Loginimage.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isloadingL, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+"/User/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        Email, Password 
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      setIsLoading(false);
      notify(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
      //save the user in local storage
      localStorage.setItem("user", JSON.stringify(json));
      //apdate the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      
    }
  }
  return (
    <div className='login-page-container'>
      <div className='left-login'>
        <img src={Logo} alt="logo" height={150} className='logoimg'/>
        <img src={imagelogin} alt="loginimage" height={500}/>
      </div>
      <div className="forms-container">
        <div className="login-signin">
          <form
            className="login-in-form"
            onSubmit={submitLogin}
          >
            <h2 className="title-login">connexion</h2>
            <div className="input-field email">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="loginEmail"
                placeholder="Entez votre email.."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-field password">
              <label htmlFor="">Mot de passe</label>
              <input
                type="password"
                name="loginpassword"
                placeholder="Entez votre mot de passe.."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="forget-class">
                <a>mot de passe oublie?</a>
              </div>
            </div>
            <input
              type="submit"
              value="connexion"
              className="cnx-btn btn-solid"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;