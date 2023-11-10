import React, { useEffect } from "react";
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState } from "react";
import FormInput from "../Components/Form/FormInput";
import "./Style/detailspanne.css";
import Progress from "../Components/Progress";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TablePanneRow from "../Components/Table/TablePanneRow";
import PanneTest from "../Components/Table/PanneTest";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooglebtn from "../Components/Tooglebtn";
import axios from "axios";
import imageframe from "../Components/assets/imageframe.png";
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import moment from 'moment-timezone';
import { Fa1 } from "react-icons/fa6";
import { CircularProgress } from '@mui/material';
import TypePanneSelect from "../Components/Form/TypePanneSelect";
import Updatebutton from '../Components/Buttons/updatebutton'
import { isEmpty  } from "validator";
import ActionCorrectiveSelect from "../Components/Form/ActionCorrective";

const DetailsPanneSav = () => {
  const notifyFailed = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [ProductData, setProductData] = useState([]);
  const [act, setAct] = useState(false);
  const navigate = useNavigate();
  const [PanneData, setPanneData] = useState();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [image, setSelectedImage] = useState(null);
  const [ToggleValue, setToggleValue] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sousGarantieChecked, setSousGarantieChecked] = useState(false);
  const [horsGarantieChecked, setHorsGarantieChecked] = useState(false);
  const [sousReserveChecked, setSousReserveChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [openDialog5, setOpenDialog5] = useState(false);
  const [openDialog6, setOpenDialog6] = useState(false);
  const [openDialogPDF, setOpenDialogPDF] = useState(false);
  const [selectedCheckboxLabel, setSelectedCheckboxLabel] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for CircularProgress
  const [lableACT, setlableACT] = useState('');
  const [CodePostal, setCodePostal] = useState('0');
  const [TypePanne ,setTypePanne] = useState([]);
  const [NbrSerie, setNbrSerie] = useState('');
  const [Description, setDescription] = useState('');
  const [ifTypePanneUpdated, setIfTypePanneUpdated] = useState(false);
  const [ifNbrSerieUpdated, setIfNbrSerieUpdated] = useState(false);
  const [ifDescriptionUpdated, setIfDescriptionUpdated] = useState(false);
  const [CauseDescription, setCauseDescription] = useState('');
  const [suspended, setsuspended] = useState(false);
  const [IfActionCorrectiveIsUpdated, setIfActionCorrectiveIsUpdated] = useState(false);
  const [ifDescriptionACUpdated, setIfDescriptionACUpdated] = useState(false);
  const [ActionCorrective, setActionCorrective] = useState([]);
  const [DescriptionAC, setDescriptionAC] = useState('');

  const BL = 'BL';
  //Upload image to server
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    formData.append("userID", user?.id);

    const result = await axios.post(
      process.env.REACT_APP_URL_BASE+"/Pannes/IMG",
      formData,
      {
        headers: { 
          "Content-Type": "multipart/form-data",       
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    if (result.status === 200) {
      notifySuccess("Image a été téléchargée avec succès.");
    } else {
      notifyFailed("Erreur lors du téléchargement de l'image.");
    }
  };
  //Get panne data from server
  const fetchPanneData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_BASE+`/Pannes/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPanneData(data);
      } else {
        console.error("Error receiving Panne data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Panne data:", error);
    }
  };
  useEffect(() => {
    fetchPanneData();
  },[user?.token]);
  //Get all pannes data of a product from server
  useEffect(() => {
    const fetchAllPannesDataOfProduct = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_URL_BASE+`/Pannes/All/${PanneData?.ReferanceProduit}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProductData(data.Pannes);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };

    fetchAllPannesDataOfProduct();
  }, [PanneData?.ReferanceProduit, id, user?.token]);
  useEffect(() => {
    const fetchCodePostalData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Willaya/${PanneData?.Wilaya}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setCodePostal(data.code);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchCodePostalData();
  }, [CodePostal, PanneData?.Wilaya, user?.token]);
  //create pdf file and download it
  const createAndDownloadPdf = async () => {
    try {
      if(ToggleValue === 5){
        if(PanneData?.BLPDFfile === null || PanneData?.BLPDFfile === undefined){
            setLoading(true); // show CircularProgress
            const response = await fetch(process.env.REACT_APP_URL_BASE+'/EmailGenerator/createPDF/BonV2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Nom: PanneData.Nom,
                    Prenom: PanneData.Prenom,
                    Email: PanneData.Email,
                    Telephone: PanneData.Telephone,
                    ReferanceProduit: PanneData.ReferanceProduit,
                    TypePanne: PanneData.TypePanne,
                    Wilaya: PanneData.Wilaya,
                    CentreDepot: PanneData.CentreDepot,
                    NbrSerie: PanneData.NbrSerie,
                    ActinoCorrective: (PanneData.ActionCorrective || PanneData.DescriptionAC) ? true : false,
                    DateDepot: new Date().toISOString().slice(0, 10),
                    type: BL,  
                    postalCode: CodePostal
                })
                });
                const data = await response.json();
                if (!response.ok) {
                  setOpenDialogPDF(false);
                  setLoading(false); // Hide CircularProgress
                  notifyFailed(data.message);
                }
        
                if(response.ok){
                    const uniqueFilename = data.uniqueFilename;
                    const pdfResponse = await fetch(process.env.REACT_APP_URL_BASE+`/EmailGenerator/fetchPDF?filename=${uniqueFilename}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/pdf'
                        },
                    });
                    if (!pdfResponse.ok) {
                      setOpenDialogPDF(false);
                      setLoading(false); // Hide CircularProgress
                    }
            
                    if(pdfResponse.ok){
                        const pdfBlob = await pdfResponse.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(pdfBlob);
                        link.download = uniqueFilename;
                        link.click();
                        if (ToggleValue === 5) {
                          UpdatePanne(ToggleValue, "Panne livrée a été vérifiée avec succès.",uniqueFilename);
                        }
                    }
                }
        }else{
          UpdatePanne(ToggleValue, "Panne livrée a été vérifiée avec succès.");
        }
      }else {
        if (ToggleValue === 1) {
          UpdatePanne(ToggleValue, "Panne en attente de depot a été vérifiée avec succès.");
        } else if (ToggleValue === 2) {
          UpdatePanne(ToggleValue, "Panne en attente de réparation a été vérifiée avec succès.");
        }else if (ToggleValue === 4) {
          UpdatePanne(ToggleValue, "Panne en attente de pickup a été vérifiée avec succès.");
        } else if (ToggleValue === 3) {
          UpdatePanne(ToggleValue, "Panne reparée a été vérifiée avec succès.");
        }else if (ToggleValue === 5) {
          UpdatePanne(ToggleValue, "Panne livrée a été vérifiée avec succès.");
        }
      }
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }
  //update pannes progress state
  const UpdatePanne = async (val, Act,uniqueFilename) => {
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        progres: val,userID: user?.id, action: `Mettre à jour la Progression avec ${Act} pour la panne ID= ${id}`,
        PDFFilename: uniqueFilename
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      setLoading(false); // Hide CircularProgress
      setOpenDialogPDF(false);
      fetchPanneData();      
      if (val === 1) {
        notifySuccess(Act);
      } else if (val === 2) {
        notifySuccess(Act);
      } else if (val === 3) {
        notifySuccess(Act);
      } else if (val === 4) {
        notifySuccess(Act);
      } else if (val === 5) {
        notifySuccess(Act);
      }
    }
  };
  const UpdatePanneGarantie = async (val) => {
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Garantie/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        StatueGarantie: val,userID: user?.id, action: `Mettre à jour le Statut Garantie avec ${val} pour la panne ID= ${id}`
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      if (val === 'Sous Garantie') {
        notifySuccess("Sous Garantie a été vérifiée avec succès.");
      } else if (val === 'Hors Garantie') {
        notifySuccess("Hors Garantie a été vérifiée avec succès.");
      } else if (val === 'Sous Reserve') {
        notifySuccess("Sous Reserve a été vérifiée avec succès.");
      }
    }
  };
  // Update progress state when a toggle button is clicked
  const handleProgressChange = (value) => {
    if (PanneData?.Progres > 0) {
      const updatedDisabledButtons = disabledButtons.map(
        (_, index) => index < value - 1
      );
      setDisabledButtons(updatedDisabledButtons);
      setToggleValue(value);
      if (!disabledButtons[value - 1]) {
        setOpenDialogPDF(true);
        if(value === 1) {
          setlableACT("Panne en attente de depot a été vérifiée avec succès.");
        }else if(value === 2) {
          setlableACT("Panne En reparation au centre a été vérifiée avec succès.");
        }else if(value === 3) {
          setlableACT("Panne en attente de réparation a été vérifiée avec succès.");
        }else if(value === 4) {
          setlableACT("Panne en attente de pickup a été vérifiée avec succès.");
        }else if(value === 5) {
          setlableACT("Panne livrée a été vérifiée avec succès.");
        }
      } else {
        UpdatePanne(1);
      }
    }
  };
  // Handle the specific behaviors based on PanneData?.Progres
  useEffect(() => {
    if (PanneData?.Progres > 0) {
      switch (PanneData.Progres) {
        case 5:
          setDisabledButtons([true, true, true, true, true]);
          break;
        case 4:
          setDisabledButtons([true, true, true, true, false]);
          break;
        case 3:
          setDisabledButtons([true, true, true, false, false]);
          break;
        case 2:
          setDisabledButtons([true, true, false, false, false]);
          break;
        case 1:
          setDisabledButtons([true, false, false, false, false]);
          break;
        default:
          // Reset the disabledButtons state if PanneData.Progres doesn't match any case
          setDisabledButtons([false, false, false, false, false]);
          break;
      }
    }
  }, [PanneData?.Progres]);
  // handle checkbox change according to the PanneData?.StatueGarantie
  useEffect(() => {
    if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Sous Garantie') {
      setSousGarantieChecked(true);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
    } else if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Hors Garantie') {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(true);
      setSousReserveChecked(false);
    } else if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Sous Reserve') {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(true);
    } else {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
    }
  }, [PanneData?.StatueGarantie]);
  //download pdf directly 
  const downloadPDFFile = async (filename) => {
    try {
      const response = await fetch(process.env.REACT_APP_URL_BASE+`/EmailGenerator/downloaderPDF/${filename}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        }
      });
      if (response.status === 200) {
        // If the file exists, trigger the download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      } else if (response.status === 404) {
        notifyFailed('File not found');
      } else {
        notifyFailed('Error downloading the file');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handledownloadBDPDFfile = () => {
    downloadPDFFile(PanneData?.BDPDFfile);
  }
  const handledownloadBLPDFfile = () => {
    downloadPDFFile(PanneData?.BLPDFfile);
  }
  //Go back to previous page
  const GoBackPressed = () => {
    if (PanneData?.Progres != 0) {
      navigate("/liste_des_pannes");
    } else {
      navigate(-1);
    }
  };
  // handle open the dialog based on the selected value
  const handleCheckboxClick = (label) => {
    setSelectedCheckboxLabel(label);
    setOpenDialog(true);
  };
  // handle close button click of the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenDialog3(false);
    setOpenDialogPDF(false);
    setOpenDialog4(false);
    setOpenDialog5(false);
    setOpenDialog6(false);
  };
  // handle the "Confirmer" button click of the dialog
  const handleChange = () => {
    if (selectedCheckboxLabel === 'Sous Garantie') {
      setSousGarantieChecked(true);
      setOpenDialog(false);
      UpdatePanneGarantie('Sous Garantie');
    } else if (selectedCheckboxLabel === 'Hors Garantie') {
      setHorsGarantieChecked(true);
      setOpenDialog(false);
      UpdatePanneGarantie('Hors Garantie');
    }
  };
  // handle sous rederve check box change
  const handleSousReserveChange = () => {
    if (sousReserveChecked) {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
      UpdatePanneGarantie(null);
    } else {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(true);
      UpdatePanneGarantie('Sous Reserve');
    }
  };
  // handle type panne input change
  const handleTypePanneInput = (newValue)=>{
    setTypePanne(newValue);
  }
  // handle Action corrective input change
  const handleActionCorrectiveInput = (newValue)=>{
    setActionCorrective(newValue);
  }
  // handle numero de serie change
  const handleNbrSerieInputChange = (newValue)=>{
    setNbrSerie(newValue);
  }
  // handle update (NbrSerie, Description, TypePanne)
  const handleUpdate = async (val)=>{
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Version2/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        TypePanne: TypePanne.join('-'),
        NbrSerie: NbrSerie,
        Description: Description,
        action: val,
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      setOpenDialog3(false);
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      setOpenDialog3(false);
      fetchPanneData();
      notifySuccess(`${val}`);
      setIfTypePanneUpdated(false);
      setIfNbrSerieUpdated(false);
      setIfDescriptionUpdated(false);
      setDescription('');
      setNbrSerie('');
      fetchPanneData();
    }
  }
  // handle update ActionCorrective
  const handleUpdateActionCorrective = async (val)=>{
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/ActionCorrective/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        ActionCorrective: ActionCorrective.join('-'),
        DescriptionAC: DescriptionAC,
        action: val,
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      setOpenDialog6(false);
      fetchPanneData();
      notifySuccess(`${val}`);
      setDescriptionAC('');
      fetchPanneData();
    }
  }
  // handle NbrSerie, Description, TypePanne change
  useEffect(() => {
    if(PanneData?.TypePanne.trim().toLowerCase() !== TypePanne.join('-').trim().toLowerCase()){
      setIfTypePanneUpdated(true);
    }else{
      setIfTypePanneUpdated(false);
    }
    if(!isEmpty(NbrSerie) && PanneData?.NbrSerie !== NbrSerie){
      setIfNbrSerieUpdated(true);
    }else{
      setIfNbrSerieUpdated(false);
    }
    if(!isEmpty(Description) && PanneData?.Description !== Description){
      setIfDescriptionUpdated(true);
    }else{
      setIfDescriptionUpdated(false);
    }
    if(ActionCorrective.length > 0 && PanneData?.ActionCorrective?.trim().toLowerCase() !== ActionCorrective.join('-').trim().toLowerCase()){
      setIfActionCorrectiveIsUpdated(true);
    }else{
      setIfActionCorrectiveIsUpdated(false);
    }
    if(!isEmpty(DescriptionAC) && PanneData?.DescriptionAC !== DescriptionAC){
      setIfDescriptionACUpdated(true);
    }else{
      setIfDescriptionACUpdated(false);
      setDescriptionAC('');
    }
  },[ActionCorrective, Description, DescriptionAC, NbrSerie, PanneData?.ActionCorrective, PanneData?.Description, PanneData?.DescriptionAC, PanneData?.NbrSerie, PanneData?.TypePanne, TypePanne]);
  // handle actions (update NbrSerie, Description, TypePanne)
  const handleActions = () => {
    if (ifTypePanneUpdated) {
      if (ifNbrSerieUpdated && ifDescriptionUpdated) {
          handleUpdate(`Mettre à jour le Type de panne avec ${TypePanne.join('-')} et le N° de serie avec ${NbrSerie} et la description avec ${Description} pour la panne ID= ${id}`);
        } else if (ifNbrSerieUpdated) {
          handleUpdate(`Mettre à jour le Type de panne avec ${TypePanne.join('-')} et le N° de serie avec ${NbrSerie} pour la panne ID= ${id}`);
        } else if (ifDescriptionUpdated) {
          handleUpdate(`Mettre à jour le Type de panne avec ${TypePanne.join('-')} et la description avec ${Description} pour la panne ID= ${id}`);
        } else {
          handleUpdate(`Mettre à jour le Type de panne avec ${TypePanne.join('-')} pour la panne ID= ${id}`);
        }
    } else {
        if (ifNbrSerieUpdated  && ifDescriptionUpdated) {
            handleUpdate(`Mettre à jour le N° de serie avec ${NbrSerie} et la description avec ${Description} pour la panne ID= ${id}`);
          } else if (ifNbrSerieUpdated ) {
            handleUpdate(`Mettre à jour le N° de serie avec ${NbrSerie} pour la panne ID= ${id}`);
          } else if (ifDescriptionUpdated) {
            handleUpdate(`Mettre à jour la description avec ${Description} pour la panne ID= ${id}`);
          }else{
            notifyFailed('Aucune modification n\'a été effectuée');
            setOpenDialog3(false);
          }
    }
  }
  // handle actions ActionsCorrectives
  const handleActionsForActionCorrective = () => {
    if (IfActionCorrectiveIsUpdated === true && ifDescriptionACUpdated === true) {
      handleUpdateActionCorrective(`Mettre à jour l'Action Corrective avec ${ActionCorrective.join('-')} et la description avec ${DescriptionAC} pour la panne ID= ${id}`);
    } else {
      if(IfActionCorrectiveIsUpdated === true){
        handleUpdateActionCorrective(`Mettre à jour l'Action Corrective avec ${ActionCorrective.join('-')} pour la panne ID= ${id}`);
      }else if(ifDescriptionACUpdated === true) {
        handleUpdateActionCorrective(`Mettre à jour la description avec ${DescriptionAC} pour la panne ID= ${id}`);
      }else{
        notifyFailed('Aucune modification n\'a été effectuée');
        setDescriptionAC('');
      }
    }
  }
  const handleOpenDialog3 = () => {
    setOpenDialog3(true);
  }
  // handle suspend button click
  const handleSuspendBTN = async () => {
    if(isEmpty(CauseDescription)){
      notifyFailed('Veuillez entrer une description');
    }else{
      handleUpdateSuspendedStatus(`La panne est suspendue avec succès PanneID= ${id}`,CauseDescription);
    }
  }
  // handle unsuspend button click
  const handleUnSuspendBTN = async () => {
    handleUpdateSuspendedStatus(`L'annulation de la suspension de la panne a été effectuée avec succès PanneID= ${id}`,null);
    setCauseDescription('');
  }
  // handle update status of the panne to suspended
  const handleUpdateSuspendedStatus = async (val,CauseDescription)=>{
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/SuspendedStatus/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        Etat: CauseDescription,
        action: val,
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      setOpenDialog4(false);
      setOpenDialog5(false);
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      setOpenDialog4(false);
      setOpenDialog5(false);
      fetchPanneData();
      notifySuccess(`${val}`);
    }
  }
  useEffect(() => {
    (PanneData?.Etat === null || PanneData?.Etat === '') ? setsuspended(false) : setsuspended(true);
  },[PanneData?.Etat, suspended]);
  
  return (
    <>
      <MyNavBar act={act} setAct={setAct} />
      <div className="pannedetails-container">
       
        <div className="pannedetails-title-container">
          <div className="pannedetails-title">
            <div className="back-button" onClick={GoBackPressed}>
              <IoIosArrowBack className="icon" size={33} fill="#fff" />
            </div>
            <h3>Details de panne :</h3>
          </div>
          {suspended === false ?
            <div className="Suspendbutton" onClick={setOpenDialog4}>
              <h3>suspendre</h3>
            </div>
            :
            ''
          }
        </div>

        {suspended ?

          <>
            <div className="pannedetails-suspended-container">
              <div className="back-button susp" onClick={GoBackPressed}>
                <IoIosArrowBack className="icon" size={33} fill="#fff" />
              </div>
              <div className="raison">
                <h3>Raison de suspension: </h3>
                <h3>{PanneData?.Etat}</h3>
              </div>
              <div className="Suspendbutton" onClick={setOpenDialog5}>
                <h3>Annuler la suspension</h3>
              </div>

              
            </div>
            
          </>
          : 
          ''
        }

        
        <div className="pannedetails-info form-section">
                <form>
                  <FormInput
                    label="Nom :"
                    value={PanneData?.Nom}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Prenom :"
                    value={PanneData?.Prenom}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Email"
                    value={PanneData?.Email}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Num Tel:"
                    value={PanneData?.Telephone}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Wilaya:"
                    value={PanneData?.Wilaya}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Centre de depot:"
                    value={"SAV de " + PanneData?.CentreDepot}
                    readOnly
                    type="text"
                  />
                  <FormInput
                    label="Date de depot:"
                    value={formatDate(PanneData?.DateDepot)}
                    readOnly
                    type="text"
                  />
                </form>
                <form>
                  
                  <FormInput
                    label="Reference de produit :"
                    value={PanneData?.ReferanceProduit}
                    readOnly
                    type="text"
                  />
                  <FormInput 
                    label='N° de serie :' 
                    placeholder= 'Entrer le numero de serie de ce produit' 
                    type='text' 
                    defaultValue = {PanneData?.NbrSerie}
                    onChange={handleNbrSerieInputChange}
                    />

                  <div className='forminput'>
                    <label>Description :</label>
                    <textarea 
                      className="DescriptionInput" 
                      rows="5"
                      onChange={(e) => setDescription(e.target.value)}
                      defaultValue={PanneData?.Description}
                      placeholder= 'Entrer une description' >
                    </textarea>
                  </div>
                  <TypePanneSelect label='Type de panne :' placeholder=' Entrer la referance de votre produit' type='text' value={PanneData?.TypePanne} onChange={handleTypePanneInput} /> 
                  <div className="Updatebutton" onClick={handleOpenDialog3}>
                    <h3>Modifier</h3>
                  </div>
                </form>
        </div>
        <div className="pannedetails-title progress">
          <h3>Statue Garantie :</h3>
        </div>
        <div className="STATUEG">
        <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={sousGarantieChecked}
              onChange={() => handleCheckboxClick('Sous Garantie')}
              disabled={sousGarantieChecked || horsGarantieChecked || sousReserveChecked}
            />
          }
          label={
            <Box className="Box" component="div" fontSize={18} marginLeft={10}>
              Sous Garantie
            </Box>
          }
          labelPlacement="start"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={horsGarantieChecked}
              onChange={() => handleCheckboxClick('Hors Garantie')}
              disabled={horsGarantieChecked || sousGarantieChecked || sousReserveChecked}
            />
          }
          label={
            <Box component="div" fontSize={18} marginLeft={10}>
              Hors Garantie
            </Box>
          }
          labelPlacement="start"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={sousReserveChecked}
              onChange={() =>handleSousReserveChange('Sous Reserve')}
              disabled={horsGarantieChecked || sousGarantieChecked}
            />
          }
          label={
            <Box component="div" fontSize={18} marginLeft={10}>
              Sous Réserve
            </Box>
          }
          labelPlacement="start"
        />
      </div>
        </div>
        <div className="pannedetails-title progress">
          <h3>Progression :</h3>
        </div>
        <div className=" progress-toogle">
          <div className="left-toogle">
            <Tooglebtn
              label="En attente de depot"
              value={1}
              onChange={handleProgressChange}
              disabled={disabledButtons[0]}
            />
            <Tooglebtn
              label="En reparation au centre"
              value={2}
              onChange={handleProgressChange}
              disabled={disabledButtons[1]}
            />
            <div className="Action-correctives-btn" onClick={setOpenDialog6}>
              <h3>Actions Correctives</h3>
            </div>
            <Tooglebtn
              label="Produit réparé"
              value={3}
              onChange={handleProgressChange}
              disabled={disabledButtons[2]}
            />
            <Tooglebtn
              label="En attente de pickup"
              value={4}
              onChange={handleProgressChange}
              disabled={disabledButtons[3]}
            />
            <Tooglebtn
              label="Livré au client"
              value={5}
              onChange={handleProgressChange}
              disabled={disabledButtons[4]}
            />
          </div>
          <div className="right-toogle">
            <div className="right-toogle-container">
              <label>Joindre une Photo</label>
              <form className="inputButton" encType="multipart/form-data">
                <AiOutlineCloudUpload size={25} fill="#fff" />
                <label htmlFor="file-input" className="file-input-label">
                  Joindre
                </label>
                <input
                  id="file-input"
                  className="file-input"
                  name="image"
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </form>
            </div>

            <div className="image">
              {image ? (
                <img
                  onClick={uploadImage}
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{ maxWidth: "350px", width: "100%", height: "310px" }}
                />
              ) : (
                <img
                  src={imageframe}
                  style={{maxWidth: "350px",width: "100%",height: "250px",marginTop: "30px",}}
                />
              )}
            </div>
          </div>
        </div>
        <div className="Historique-container">
            <div className="pannedetails-title Historique">
              <h3>Bon :</h3>
            </div>
            <div className="Bons-container">
              <div className="buttonbons bd">
                  <input type="submit" value="Bon de depot" onClick={handledownloadBDPDFfile} className="voir-btn" />
              </div>
              <div className="buttonbons bl">
                  <input type="submit" value="Bon de Livraison" onClick={handledownloadBLPDFfile} className="voir-btn" />
              </div>
            </div>
          </div>
        {ProductData && (
          <div className="Historique-container">
            <div className="pannedetails-title Historique">
              <h3>Historique de reparation :</h3>
            </div>
            <div className="pannedetails-info">
              <div className="table-patients">
                <table>
                  <tr className="table-patients-header">
                    <td className="table-patients-header-annee">ID</td>
                    <td className="table-patients-header-annee">Reference</td>
                    <td className="table-patients-header-annee">Date</td>
                    <td className="table-patients-header-willaya">Centre</td>
                    <td className="table-patients-header-region">
                      Type de panne
                    </td>
                  </tr>
                  {ProductData?.map((Panne) => (
                    <PanneTest Panne={Panne} />
                  ))}
                </table>
              </div>
            </div>
          </div>
        )}
        <Dialog
          open={openDialog}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmez-vous la sélection de l'état "${selectedCheckboxLabel}" ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleChange} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogPDF}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {!loading && (<>
            <DialogTitle id="alert-dialog-title">
                {`Confirmez-vous la sélection de l'état "${lableACT}" ?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} disabled={loading}>Annuler</Button>
                <Button onClick={createAndDownloadPdf} autoFocus disabled={loading}>
                    Confirmer
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
        {/* Dialog mise a jour de (NbrSerie, Description, TypePanne) */}
        <Dialog
          open={openDialog3}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmation de mise a jour`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirmer le mise à jour de la panne avec les informations suivantes : 
            </DialogContentText>
            <DialogContentText>
              {!isEmpty(NbrSerie) ? `N° de serie : ${NbrSerie}` : ''}
            </DialogContentText>
            <DialogContentText>
              {PanneData?.TypePanne.trim().toLowerCase() !== TypePanne.join('-').trim().toLowerCase()
               ? `Type de panne : ${TypePanne.join('-')}` : ''}
            </DialogContentText>
            <DialogContentText>
              {!isEmpty(Description) ? `Description : ${Description}` : ''}
            </DialogContentText>
            <DialogContentText>
              {(isEmpty(Description) && isEmpty(NbrSerie) && PanneData?.TypePanne.trim().toLowerCase() === TypePanne.join('-').trim().toLowerCase())
               ? `Aucune modification n'a été effectuée` : ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleActions} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog de suspension */}
        <Dialog
          open={openDialog4}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmer la suspendre de la panne avec la cause suivante`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Cause :
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            height="100px"
            variant="standard"
            onChange={(e) => setCauseDescription(e.target.value)}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSuspendBTN} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog annulation de suspension */}
        <Dialog
          open={openDialog5}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmer l'annuler de la suspension`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              motif de la suspension précédente :
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {PanneData?.Etat}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleUnSuspendBTN} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog action corrective */}
        <Dialog
          open={openDialog6}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          width="100%"
        >
          <DialogTitle id="alert-dialog-title">{`Ajouter les Actions correctives :`}</DialogTitle>
        
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Remplire les champs suivants :
            </DialogContentText>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            placeholder="Description"
            fullWidth
            helperText="Entrer une description"
            variant="standard"
            defaultValue={PanneData?.DescriptionAC}
            onChange={(e) => setDescriptionAC(e.target.value)}
            />
            <DialogContentText id="alert-dialog-description">
              <ActionCorrectiveSelect label='Actions Correctives :' placeholder= 'Entrer l`action corrective pour cette panne' value={PanneData?.ActionCorrective} type='text' onChange={handleActionCorrectiveInput} /> 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleActionsForActionCorrective} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </div>
    </>
  );
};
function formatDate(dateString) {
  const timeZone = 'Africa/Algiers'; // Algeria's time zone
  const date = moment(dateString).tz(timeZone);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const month = monthNames[date.month()];
  const day = date.date();
  const year = date.year();
  const hours = date.hours();
  const minutes = date.minutes();

  const formattedDate = `${month} ${day}, ${year} at ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedDate;

}
export default DetailsPanneSav;
