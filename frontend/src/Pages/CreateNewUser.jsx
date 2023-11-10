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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

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


  const [open,setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Redirect =()=>{
    navigate(-1);
  }
  
  async function submitSignup(e) {
    handleClose();
    e.preventDefault();
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+"/User/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ 
        Email, Password, Nom, Prenom, Telephone, Role, Centre, ResetPassword, userID: user?.id
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
      Redirect();
    }
  }
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
            <div className='back-button' onClick={Redirect}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                <h3>Ajouter un utilisateur :</h3>
            </div>
            <div className='pannedetails-info form-section'>
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
                </form>

            </div>
            <div className='pannedetails-Button1'>
                      <button className='Cancel-btn' type='button' onClick={Redirect}>Annuler</button>
                      <button className='depose-btn' type='submit' onClick={handleClickOpen}>Ajouter</button>
                   </div>
            <ToastContainer />
        </div>
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmez-vous l'ajout d'un nouvel utilisateur ?"}
            </DialogTitle>
           
            <DialogActions>
              <Button onClick={handleClose} 
              
              
              >Annuller</Button>
              <Button onClick={submitSignup} autoFocus
             
              >
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>`
      </div>
    </>
  )
}

export default CreateNewUser;