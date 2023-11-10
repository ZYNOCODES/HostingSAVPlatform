import React, { useEffect } from 'react'
import { useState } from "react";
import Logo from './assets/Logo.png'
import profilIcon from './assets/Ellipse4.png'

import { useAuthContext } from "../hooks/useAuthContext";

export default function MyNavBar({ act, setAct }) {
  const { user } = useAuthContext();
  const [UserData, setUserData] = useState(); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/User/${user?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error("Error receiving user data", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [user?.id, user?.token]); 
  return (
    <div className="Navbar">
      <nav>
        <div className="left-nav">
          <div className="image">
            <img src={Logo} alt="logo" height={20}/>
          </div>
        </div>
        <div className="right-nav">
          <div className="doctor">
          <div className="doctor-pic">
            <img src={profilIcon} alt="icon"/>
          </div>
            <div className="doctor-name">
              {user && <h4>{UserData?.Nom}{" "}{UserData?.Prenom}</h4>}
              {user && <span>{UserData?.Centre}</span>}
            </div>
          </div>
        </div>
      </nav>
      <div>
       
      </div>
    </div>
  );
}
