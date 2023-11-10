import { React, useEffect } from "react";
import { generateDate, months } from "../util/Calendar";
import check from "../util/cn";
import dayjs from "dayjs";
import { useState } from "react";
import{AiOutlineCaretRight} from"react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function MyDashboradCalendar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [Top3Products, setTop3Products] = useState();
  const [Top3Pannes, setTop3Pannes] = useState();

  useEffect(() => {
    const fetchTop3Products = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Product/Top3`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setTop3Products(data.top3);
        } else {
          console.error("Error receiving Top3 Products data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Top3 Products data:", error);
      }
    };
    fetchTop3Products();
  },[user?.token]);
  useEffect(() => {
    const fetchTop3Pannes = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Pannes/Top3`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setTop3Pannes(data.top3);
        } else {
          console.error("Error receiving Top3 Pannes data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Top3 Pannes data:", error);
      }
    };
    fetchTop3Pannes();
  },[user?.token]);
  const Redirection = (ReferanceProduit) => {
    navigate(`/Details/${ReferanceProduit}`)
  }
  return (
    <div className="dashboard-calendar-container">
      <div className="calendar-dashboard-header">
        <h2>Top 3 des produits :</h2>
      </div>
      <div className="w-96 h-96">
          {Top3Products?.map((product, index) => (
            <div key={index} className="dashboard-calendar-doctor-meet" >
              <AiOutlineCaretRight size={30}/>
              <h2>{product.ReferanceProduit}</h2>
              <h2>{product.Count} fois</h2>
            </div>
          ))}
      </div>
      <div className="calendar-dashboard-header">
        <h2>Top 3 des Pannes :</h2>
      </div>
      <div className="w-96 h-96">
        {Top3Pannes?.map((Panne, index) => (
          <div key={index} className="dashboard-calendar-doctor-meet" >
            <AiOutlineCaretRight size={30}/>
            <h2>{Panne.TypePanne}</h2>
            <h2>{Panne.Count} fois</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
