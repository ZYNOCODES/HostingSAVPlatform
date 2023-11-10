import React, { useEffect } from 'react'
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import {useNavigate, useParams} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ProgressBar from "@ramonak/react-progress-bar";
import moment from 'moment-timezone';
import ActionCorrectiveSelect from "../Components/Form/ActionCorrective";

const DetailsPanne = () => {
    const [act, setAct] = useState(false);
    const navigate = useNavigate();
    const [PanneData, setPanneData] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();
    //Get panne data from server
    useEffect(() => {
        const fetchPanneData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
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
    
        fetchPanneData();
    }, [id, user?.token]);
    //Go back to previous page
    const GoBackPressed =()=>{
        navigate(-1);
    }
    
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <div className='back-button' onClick={GoBackPressed}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                <h3>Details de panne</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom :' value={PanneData?.Nom} readOnly type='text'/>
                    <FormInput label='Prenom :' value={PanneData?.Prenom} readOnly type='text' />
                    <FormInput label='Email' value={PanneData?.Email} readOnly type='text' />
                    <FormInput label='Num Tel:' value={PanneData?.Telephone} readOnly type='text' />
                    <FormInput label='Wilaya:' value={PanneData?.Wilaya} readOnly type='text' />
                    <FormInput label='Date de depot:' value={formatDate(PanneData?.DateDepot)} readOnly type='text' />
                </form>
                <form>
                    <FormInput label='N° de serie :' value={PanneData?.NbrSerie} type='text' readOnly />
                    <FormInput label='Referance de produit :' value={PanneData?.ReferanceProduit} readOnly type='text'/>
                    <FormInput label='Type de panne :' value={PanneData?.TypePanne} readOnly type='text' />
                    <FormInput label='Centre de depot:' value={"SAV de "+PanneData?.CentreDepot} readOnly type='text' />
                    <FormInput label='Action corrective:' value={PanneData?.ActionCorrective} readOnly type='text' />
                    <FormInput label='Description de l`action corrective:' value={PanneData?.DescriptionAC} readOnly type='text' />
                </form>
            </div>
            
            <div className='pannedetails-title progress'>
                <h3>Progression</h3>
                {PanneData?.Etat ?
                    <div className='progression-label'>
                        <div className='progress-div'>
                            <h2>Le produit a été suspendu en raison de {PanneData?.Etat} </h2>
                        </div>
                    </div>
                    :
                    <>
                        {PanneData?.Progres !== 0 && PanneData?.Progres !== 5 &&
                            <div className='progression-label'>
                                <div className='progress-div'>
                                    <h4>Le produit a été déposé</h4>
                                    <AiOutlineCaretDown/>
                                </div>
                                <div className='progress-div second-progress-div s-dv'>
                                    <h4>En reparation au centre</h4>
                                    <AiOutlineCaretDown/>
                                </div>
                                <div className='progress-div second-progress-div'>
                                    <h4>Le Produit a été reparé</h4>
                                    <AiOutlineCaretDown/>
                                </div>
                                <div className='progress-div third-progress-div'>
                                    <h4>Le produit en attente de pickup</h4>
                                    <AiOutlineCaretDown/>
                                </div>
                            </div>
                        }
                        {PanneData?.Progres === 5 &&
                            <div className='progression-label'>
                                <div className='progress-div'>
                                    <h4>Réparation terminé</h4>
                                    <AiOutlineCaretDown/>
                                </div>
                            </div>
                        }
                        <div className='progressbar'>
                            {
                                PanneData?.Progres === 5 ? (
                                    <ProgressBar 
                                    baseBgColor = '#bebebe'
                                    bgColor = 'green'
                                    height = '30px'
                                    borderRadius = '10px'
                                    isLabelVisible = {true}
                                    animateOnRender = {true}
                                    maxCompleted={50}
                                    completed={PanneData?.Progres*10}
                                    customLabel = 'Le produit a été livré'
                                    labelAlignment = 'center'
                                    labelClassName = 'progressbar-label'
                                    />
                                ) : PanneData?.Progres === 0 ? (
                                    <h2>Le produit en attente de dépôt</h2>
                                ) : (
                                    <ProgressBar 
                                    baseBgColor = '#bebebe'
                                    bgColor = 'green'
                                    height = '30px'
                                    borderRadius = '10px'
                                    isLabelVisible = {true}
                                    animateOnRender = {true}
                                    maxCompleted={50}
                                    completed={PanneData?.Progres*10}
                                    customLabel = 'en cours de traitement'
                                    labelAlignment = 'center'
                                    labelClassName = 'progressbar-label'
                                    />
                                )
                            }
                        </div>
                    </>
                } 
            </div>
        </div>
    </>
  )
}
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
export default DetailsPanne