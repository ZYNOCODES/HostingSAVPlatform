import React from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import Progress from '../Components/Progress';
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom';
import CostumSelect from '../Components/Form/CostumSelect';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../hooks/useAuthContext';

const CreateNewUser = () => {
  const [act, setAct] = useState(false);

  const notifyFailed = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ResetPassword, setResetPassword] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Role, setRole] = useState("");
  const [Centre, setCentre] = useState("");

  const handleEmailInputChange = (newValue) => {
    setEmail(newValue);
  };
  const handlePasswordInputChange = (newValue) => {
    setPassword(newValue);
  };
  const handleResetPasswordInputChange = (newValue) => {
    setResetPassword(newValue);
  }
  const handleNomInputChange = (newValue) => {
    setNom(newValue);
  };
  const handlePrenomInputChange = (newValue) => {
    setPrenom(newValue);
  };
  const handleTelephoneInputChange = (newValue) => {
    setTelephone(newValue);
  };
  const handleRoleInputChange = (newValue) => {
    setRole(newValue);
  };
  const handleCentreInputChange = (newValue) => {
    setCentre(newValue);
  };
  
  async function submitSignup(e) {
    e.preventDefault();
    const reponse = await fetch("http://localhost:8000/User/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ 
        Email, Password, Nom, Prenom, Telephone, Role, Centre, ResetPassword
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
    }
  }
  const Redirect =()=>{
    navigate(-1);
  }
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <MyAsideBar />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <h3>Ajouter un utilisateur :</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom:' placeholder=' Enter Le Nom' type='text' onChange={handleNomInputChange}/>
                    <FormInput label='Prenom:' placeholder='Entrer Le Prenom' type='text' onChange={handlePrenomInputChange}/>
                    <FormInput label='Email:' placeholder="Enter L'adresse Email" type='Email' onChange={handleEmailInputChange}/>
                    <FormInput label='Numero Tel:' placeholder=' Entrer Le Numero de Telephone' type='text' onChange={handleTelephoneInputChange}/>
                </form>
                <form>
                    <CostumSelect label='Role:' onChange={handleRoleInputChange}/>
                    <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>
                    <FormInput label='Mot de pass:' placeholder='Entrer Le Mot de pass' type='password' onChange={handlePasswordInputChange}/>
                    <FormInput label='Confirmation du mot de pass:' placeholder='Confirmer Le Mot De Pass' type='password'onChange={handleResetPasswordInputChange}/>
                    
                    <div className='userbtn'>
                        <input className="InputButton-User" type='button' value={'Annuler'} onClick={Redirect}/>
                        <input className="InputButton-User" type='submit' value={'Ajouter'} onClick={submitSignup}/>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    </>
  )
}

export default CreateNewUser;