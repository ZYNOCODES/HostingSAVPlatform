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


export const PanneList = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centredepot, setcentredepot] = useState("All");
    const [progres, setprogres] = useState("All");
    const [datedepot, setdatedepot] = useState();
    const [ProduitenPanne, setProduitenPanne] = useState([]);
    const { user } = useAuthContext();

    const handleCentreInputChange = (newValue) => {
      setcentredepot(newValue);
    };
    const handleProgresInputChange = (newValue) => {
      setprogres(newValue);
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
          });
    
          const response = await fetch(`http://localhost:8000/Pannes/?${queryParams}`, {
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
    }, [user.Role, user.CentreDepot, ProduitenPanne]);
    const matchSearch = (item, search) => {
      const lowerSearch = search.toLowerCase();
      return (
        item.id.toString().includes(lowerSearch) ||
        item.Nom.toLowerCase().includes(lowerSearch) ||
        item.Prenom.toLowerCase().includes(lowerSearch)
      );
    };
    
    const matchDateDepot = (item, datedepot) => {
      return datedepot === "All" || item.DateDepot.includes(datedepot);
    };
    
    const matchCentreDepot = (item, centredepot) => {
      return centredepot === "All" || item.CentreDepot.toLowerCase().includes(centredepot.toLowerCase());
    };
    
    const matchProgres = (item, progres) => {
      return progres === "All" || item.Progres.toString().includes(progres);
    };
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
              <ProgressionSelect label='Progression:' onChange={handleProgresInputChange}/>
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
                <td className="table-patients-header-progress">Progression</td>
                <td className="table-patients-header-button"></td>
              </tr>
              {ProduitenPanne?.filter((item) => {
                const isMatchingSearch = matchSearch(item, search);

                if (item.DateDepot && item.CentreDepot && item.Progres) {
                  const isMatchingDatedepot = matchDateDepot(item, datedepot);
                  const isMatchingCentredepot = matchCentreDepot(item, centredepot);
                  const isMatchingProgres = matchProgres(item, progres);
              
                  return isMatchingSearch && isMatchingDatedepot && isMatchingCentredepot && isMatchingProgres;
                } else {
                  return isMatchingSearch;
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
