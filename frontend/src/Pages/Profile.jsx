import React, { useEffect } from "react";
import MyNavBar from "../Components/navBar";
import { useState } from "react";
import FormInput from "../Components/Form/FormInput";
import "./Style/detailspanne.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DelaiRepRow from "../Components/Table/DelaiRepRow";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () =>{
    const [act, setAct] = useState(false);
    const navigate = useNavigate();
    const [UserData, setUserData] = useState();
    const [PanneByuser, setPanneByuser] = useState();
    const [AverageTime, setAverageTime] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();
    //Get User data from server
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/User/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
            } else {
            console.error("Error receiving User data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching User data:", error);
        }
        };
    
        fetchUserData();
    }, [id, user?.token]);
    useEffect(() => {
        const fetchAverageTime = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Average/time/${UserData.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setAverageTime(data.averageRepairTime);
            } else {
            console.error("Error receiving Panne data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching Panne data:", error);
        }
        };
        fetchAverageTime();
    }, [UserData?.id, user?.token]);
    useEffect(() => {
        const fetchPanneByuser = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/byuser/${UserData.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setPanneByuser(data);
            } else {
            console.error("Error receiving Panne data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching Panne data:", error);
        }
        };
        fetchPanneByuser();
    }, [UserData?.id, user?.token]);
    //Go back
    const GoBackPressed = () => {
        navigate(-1); 
    };
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
                    <FormInput label='Nom :' value={UserData?.Nom} readOnly type='text'/>
                    <FormInput label='Prenom :' value={UserData?.Prenom} readOnly type='text' />
                    <FormInput label='Email' value={UserData?.Email} readOnly type='text' />
                </form>
                <form>
                    <FormInput label='Num Tel:' value={UserData?.Telephone} readOnly type='text' />
                    <FormInput label='Role :' value={UserData?.Role} readOnly type='text' />
                    <FormInput label='Centre :' value={UserData?.Centre} readOnly type='text' />
                    
                </form>
            </div>
            <div className='pannedetails-title progress'>
                <h3>Délai moyen de réparation pour chaque produit :</h3>
                <div className='GlobalInput '>
                    <h4>Globale :</h4>
                    <FormInput label='' value={AverageTime ? AverageTime : "00days 00h 00min 00s"} readOnly type='text'/>
                </div>
                <div className="searchclass">
                <input
                    type="search"
                    className="searchfield"
                    placeholder="Search.."
                    />
                </div>
            </div>
             <div className="pannedetails-info">
              <div className="table-patients">
                <table>
                  <tr className="table-patients-header">
                    <td className="table-patients-header-annee">ID</td>
                    <td className="table-patients-header-annee">Date de depot</td>
                    <td className="table-patients-header-annee">Fin de reparation</td>
                    <td className="table-patients-header-willaya">Délai Moyen</td>
                    <td className="table-patients-header-willaya">Centre</td>
                    <td className="table-patients-header-region"></td>
                  </tr>
                  {PanneByuser && PanneByuser.map((panne) => (
                      <DelaiRepRow data={panne}/>
                  ))}
                </table>
              </div>
            </div>
        </div>
    </>
    )
}
export default Profile