import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import AdduserButton from '../Components/Buttons/AdduserButton';
import UserRow from '../Components/Table/UserRow';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import CostumSelect from '../Components/Form/CostumSelect';
import { useAuthContext } from '../hooks/useAuthContext';
const Users = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centre, setcentre] = useState("All");
    const [role, setRole] = useState("All");
    const [UsersData, setUsersData] = useState([]);
    const { user } = useAuthContext();

    const handleCentreInputChange = (newValue) => {
      setcentre(newValue);
    };
    const handleRoleInputChange = (newValue) => {
      setRole(newValue);
    };
    useEffect(() => {
      if(user?.Role === 'DRCentre'){
        const fetchUsersData = async () => {
          try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/User/byCentre/${user?.Centre}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
            });
      
            if (response.ok) {
              const data = await response.json();
              setUsersData(data);
            } else {
              console.error("Error receiving Panne data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching Panne data:", error);
          }
        };
      
        fetchUsersData();
      }else{
        const fetchUsersData = async () => {
          try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/User`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
            });
      
            if (response.ok) {
              const data = await response.json();
              setUsersData(data);
            } else {
              console.error("Error receiving Panne data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching Panne data:", error);
          }
        };
      
        fetchUsersData();
      }
      
    }, [user?.Centre, user?.Role, user?.token]);
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
            <div className='forminput'>
              <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>

            </div>
            </div>
            <div className="table-header-item">
            <div className='forminput'>
              <label>Role</label>
              <select onChange={(e) => setRole(e.target.value)}>
                <option>All</option>
                <option>Admin</option>
                <option>SAV</option>
                <option>DRCentre</option>
              </select>
            </div>
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
          <div className="table-header-item">
            <div className='add-user-btn'>
                <AdduserButton/>
            </div>
          </div>
            
          </div>

          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Nom Complet</td>
                <td className="table-patients-header-Email">Email</td>
                <td className="table-patients-header-nom">Telephone</td>
                <td className="table-patients-header-nom">Role</td>
                <td className="table-patients-header-nom">Centre</td>
                <td className="table-patients-header-button"></td>
                <td className="table-patients-header-button"></td>
              </tr>
              {UsersData?.filter((item) => {
                if((item.Role === 'SAV' || item.Role === 'DRCentre') && user?.Role === 'DRCentre'){
                  if (
                    (search.toLowerCase() === "" ||
                      item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                      item.Prenom.toLowerCase().includes(search.toLowerCase()) ||
                      item.Email.toLowerCase().includes(search.toLowerCase()) ||
                      item.Telephone.toString().includes(search.toLowerCase())||
                      item.Centre.toLowerCase().includes(search.toLowerCase())) &&
                    (centre === "All" ||
                      item.Centre.toLowerCase().includes(centre.toLowerCase())) &&
                    (role === "All" || item.Role.toLowerCase().includes(role.toLowerCase()))
                  ) {
                    return item;
                  }       
                }else if(user?.Role === 'Admin'){
                  if (
                    (search.toLowerCase() === "" ||
                      item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                      item.Prenom.toLowerCase().includes(search.toLowerCase()) ||
                      item.Email.toLowerCase().includes(search.toLowerCase()) ||
                      item.Telephone.toString().includes(search.toLowerCase())||
                      item.Centre.toLowerCase().includes(search.toLowerCase())||
                      item.Role.toLowerCase().includes(search.toLowerCase())) &&
                    (centre === "All" ||
                      item.Centre.toLowerCase().includes(centre.toLowerCase())) &&
                    (role === "All" || item.Role.toLowerCase().includes(role.toLowerCase()))
                  ) {
                    return item;
                  } 
                }      
              }).map((user) => (
                <UserRow User={user}/>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Users