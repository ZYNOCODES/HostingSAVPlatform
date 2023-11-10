import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";


export default function MyDashboradTop( {Data}) {
  const [AverageTime, setAverageTime] = useState();
  const [Suspended, setSuspended] = useState();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchAverageTime = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Average/time/${0}`, {
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
  }, [user?.token]);
  useEffect(() => {
    const fetchSuspended = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Dashboard/Suspended`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setSuspended(data.SuspendedSum);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
    fetchSuspended();
  }, [user?.token]);
  
  return (
    <div className="dashboard-top">
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>
            Produits En attente depot
          </a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.ProduitEnAttente ? Data?.ProduitEnAttente : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>Produits deposés</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.ProduitDeposes ? Data?.ProduitDeposes : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>Produits suspendu</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Suspended ? Suspended : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>
            Délai moyen de réparation
          </a>
        </div>
        <div className="dashboard-nombre">
          <h3>{AverageTime ? AverageTime : '00days 00h 00min 00s'}</h3>
        </div>
      </div>
    </div>
  );
}
