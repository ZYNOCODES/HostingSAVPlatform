import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from '../hooks/useAuthContext';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import ProgressionSelect from '../Components/Form/ProgressionSelect';


export const PanneListLivrees = () => {
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centredepot, setcentredepot] = useState("All");
    const [datedepot, setdatedepot] = useState();
    const [ProduitenPanne, setProduitenPanne] = useState([]);
    const { user } = useAuthContext();

    const handleCentreInputChange = (newValue) => {
      setcentredepot(newValue);
    };

    const handleDateInputChange = (event) => {
      setdatedepot(event.target.value);
    };
    useEffect(() => {
      const fetchPannesData = async () => {
        try {
          const queryParams = new URLSearchParams({
            Role: user?.Role,
            CentreDepot: user?.Centre,
            UserID: user?.id,
          });
    
          const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Delivred/?${queryParams}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setProduitenPanne(data.Pannes);
          } else {
            console.error("Error receiving Panne data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching Panne data:", error);
        }
      };
    
      fetchPannesData();
    }, [user?.Centre, user?.Role, user?.id, user?.token]);
  return (
    <>
    <MyNavBar  act={act} setAct={setAct} />
      <MyAsideBar />
    <div className="Patients-Details">
      <div className="patient-table">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="patient-table-container">
          <div className="patient-table-header">
            <div className="table-header-item">
              <label>Date :</label>
              <input
              type="Date"
              className="class-search"
              placeholder="Date"
              onChange={handleDateInputChange}
            />
            </div>
            <div className="table-header-item">
            <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>
            </div>
            <div className="table-header-item">
              <label>Recherche</label>
              <input
              type="search"
              className="class-search"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            
          </div>
          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Id</td>
                <td className="table-patients-header-annee">Nom Complet</td>
                <td className="table-patients-header-annee">Date</td>
                <td className="table-patients-header-willaya">Centre</td>
                <td className="table-patients-header-progress">Statut garantie</td>
                <td className="table-patients-header-progress">Suspension</td>
                <td className="table-patients-header-button"></td>
              </tr>
              {ProduitenPanne?.filter((item) => {
                if (
                  (search.toLowerCase() === "" ||
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                    item.Prenom.toLowerCase().includes(search.toLowerCase())||
                    item.DateDepot.toLowerCase().includes(search.toLowerCase())||
                    item.Progres.toString().includes(search.toLowerCase())||
                    item.CentreDepot.toLowerCase().includes(search.toLowerCase())||
                    item.ReferanceProduit.toLowerCase().includes(search.toLowerCase())||
                    item.TypePanne.toLowerCase().includes(search.toLowerCase())) &&
                  (datedepot == null || item.DateDepot.includes(datedepot)) &&
                  (centredepot === "All" || item.CentreDepot.toLowerCase().includes(centredepot.toLowerCase()))
                ) {
                  return item;
                }
                
              }).map((Panne) => (
                <TablePanneRow Panne={Panne} />
              ))}

            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
