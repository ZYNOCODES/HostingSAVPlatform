import React, { useState } from 'react'
import './Style/OpenTicket.css'
import FormInput from '../Components/Form/FormInput'
import CostumSelect from '../Components/Form/CostumSelect'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PanneSelect from '../Components/Form/PanneSelect';
import ProductSelect from '../Components/Form/ProductRefSelect';
import SavSelect from '../Components/Form/SavSelect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import MyNavBar from '../Components/navBar'
import MyAsideBar from '../Components/asideBar'
import WilayaSelect from '../Components/Form/WilayaSelect';
import { CircularProgress } from '@mui/material';
import validator from 'validator';
import { useAuthContext } from '../hooks/useAuthContext';

const OuvrirUnTicket = () => {
    const notifyFailed = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);
    const [act, setAct] = useState();
    const [Nom, setNom] = useState('');
    const [Prenom, setPrenom] = useState('');
    const [Email, setEmail] = useState('');
    const [Telephone, setTelephone] = useState('');
    const [ReferanceProduit, setReferanceProduit] = useState('');
    const [TypePanne, setTypePanne] = useState('');
    const [Wilaya, setWilaya] = useState('');
    const [PostalCode, setPostalCode] = useState('');
    const [CentreDepot, setCentreDepot] = useState('');
    const [DateDepot, setDateDepot] = useState('');
    const [open,setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    }; 
    const [isValid, setIsValid] = useState(true);

    const handleNomInputChange = (newValue) => {
        setNom(newValue);
    };
    const handlePrenomInputChange = (newValue) => {
        setPrenom(newValue);
    };
    const handleEmailInputChange = (newValue) => {
        if (validator.isEmail(newValue)) {
            setEmail(newValue);
        }else{
            setEmail('invalid');
        }
    };
    const handleTelephoneInputChange = (newValue) => {
        setTelephone(newValue);
    };
    const handleReferanceProduitInputChange = (newValue) => {
        setReferanceProduit(newValue);
    };
    const handleTypePanneInputChange = (newValue) => {
        setTypePanne(newValue);
    };
    const handleWilayaInputChange = (selectedValue, selectedKey) => {
        setWilaya(selectedValue);
        setPostalCode(selectedKey);
    };
    const handleCentreDepotInputChange = (newValue) => {
        setCentreDepot(newValue);
    };
    const handleDateDepotInputChange = (newValue) => {
        setDateDepot(newValue);
    };
    
    const createAndDownloadPdf = async () => {
        setLoading(true); // Show CircularProgress
        try {
            if((Nom === undefined || Prenom === undefined || Email === undefined || Email === 'invalid' || Telephone === undefined || ReferanceProduit === undefined || TypePanne === undefined || Wilaya === undefined || CentreDepot === undefined || DateDepot === undefined || PostalCode === undefined)||
            (!Nom || !Prenom || !Email || !Telephone || !ReferanceProduit || !TypePanne || !Wilaya || !CentreDepot || !DateDepot || !PostalCode)){
                handleCreateNewPanneWithPDF();
                handleClose();
            }else{
                const response = await fetch(process.env.REACT_APP_URL_BASE+'/EmailGenerator/createPDF/BonV1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Nom,
                    Prenom,
                    Email,
                    Telephone,
                    ReferanceProduit,
                    TypePanne,
                    Wilaya,
                    CentreDepot,
                    DateDepot,
                    type: 'TBD',  
                    postalCode: PostalCode
                })
                });
                const data = await response.json();
                if (!response.ok) {
                    setLoading(false); // Hide CircularProgress
                    handleClose();
                    notifyFailed(data.message);
                }
        
                if(response.ok){
                    const uniqueFilename = data.uniqueFilename;
        
                    const pdfResponse = await fetch(process.env.REACT_APP_URL_BASE+`/EmailGenerator/fetchPDF?filename=${uniqueFilename}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/pdf'
                        },
                        Authorization: `Bearer ${user?.token}`,
                    });
            
                    if (!pdfResponse.ok) {
                        setLoading(false); // Hide CircularProgress
                        handleClose();
                        notifyFailed(data.message);
                    }
            
                    if(pdfResponse.ok){
                        const pdfBlob = await pdfResponse.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(pdfBlob);
                        link.download = uniqueFilename;
                        link.click();
                        handleCreateNewPanneWithPDF(uniqueFilename);
                    }
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    async function handleCreateNewPanneWithPDF(PDFFilename) {
        const reponse = await fetch(process.env.REACT_APP_URL_BASE+"/Pannes", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
                Nom, Prenom, Email, Telephone, 
                ReferanceProduit, TypePanne, Wilaya, 
                CentreDepot, DateDepot, PDFFilename
            }),
          });
      
          const json = await reponse.json();
          if (!reponse.ok) {
              notifyFailed(json.message);
          }
          if (reponse.ok) {
            setLoading(false); // Hide CircularProgress
            handleClose();
            notifySuccess(json.message);
          }
    };
    async function handleCreateNewPanneNoPDF(e) {
        handleClose();
        e.preventDefault();
        const reponse = await fetch(process.env.REACT_APP_URL_BASE+"/Pannes", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
                Nom, Prenom, Email, Telephone, 
                ReferanceProduit, TypePanne, Wilaya, 
                CentreDepot, DateDepot
            }),
          });
      
          const json = await reponse.json();
          if (!reponse.ok) {
              notifyFailed(json.message);
          }
          if (reponse.ok) {
            notifySuccess(json.message);
          }
    };
    const handleOnback = () => {
        navigate('/')
    }
  return (
    <>
    <MyNavBar  act={act} setAct={setAct} />
    <MyAsideBar />
    <div className='form'>
        <form>
            <div className='left-form'>
                <FormInput label='Nom :' placeholder=' Entrer votre nom' type='text' onChange={handleNomInputChange}/>
                <FormInput label='Prenom :' placeholder=' Entrer votre prenom' type='text' onChange={handlePrenomInputChange}/>
                <FormInput label='Email :' placeholder=' Entrer votre Email' type='text' onChange={handleEmailInputChange}/>
                <FormInput label='N°= Tel :' placeholder=' Entrer votre numero telephone' type='number' onChange={handleTelephoneInputChange}/>
                <ProductSelect label='Referance produit :' placeholder=' Entrer la referance de votre produit' type='text' onChange={handleReferanceProduitInputChange}/>  
            </div>
            <div className='right-form'>
                <PanneSelect label='Type de panne :' placeholder=' Entrer le type de panne' type='text' onChange={handleTypePanneInputChange}/>
                <WilayaSelect label='Wilaya :' placeholder=' Entrer le type de panne' onChange={handleWilayaInputChange}/>
                <SavSelect label='Centre De Depot :' placeholder=' Entrer votre centre de depot' type='text' onChange={handleCentreDepotInputChange}/>
                <FormInput label='Date de depot :' placeholder=' Entrer votre date de depot' type='datetime-local' onChange={handleDateDepotInputChange}/>     
                <div className='button-section'>
                    <button className='Cancel-btn' type='button' onClick={handleOnback}>Annuler</button>
                    <button className='depose-btn' type='button' onClick={handleClickOpen}>Ouvrir</button>
                </div>
            </div>
        </form>
        <Dialog
            open={open}
            onClose={false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {!loading && (<>
            <DialogTitle id="alert-dialog-title">
                {`Souhaitez-vous télécharger le bon de dépôt ?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    En choisissant l'option 'Oui', le bon de dépôt sera automatiquement téléchargé, tandis qu'en sélectionnant 'Non', le bon de dépôt ne sera pas téléchargé, mais la panne sera enregistrée pour être traitée.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>remodifier mes infos</Button>
                <Button onClick={handleCreateNewPanneNoPDF} disabled={loading}>Non</Button>
                <Button onClick={createAndDownloadPdf} autoFocus disabled={loading}>
                    Oui
                </Button>
            </DialogActions>
            </>)}
            {loading && (
            <div className="CircularProgress-container">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ce processus peut prendre du temps en fonction de votre connexion Internet. Veuillez patienter jusqu'à la fin.
                    </DialogContentText>
                </DialogContent>
              <CircularProgress className="CircularProgress" />
            </div>
            )}
        </Dialog>
        <ToastContainer />
    </div>
    </>
  )
}

export default OuvrirUnTicket