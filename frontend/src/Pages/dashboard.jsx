import { useEffect, useState } from "react";
import "../App.css";
import MyAsideBarActive from "../Components/asideBarActive";
import MyDashboradCalendar from "../Components/dashboardCalendar";
import MyChart from "../Components/charts/dashboardChart";
import MyDashboradTop from "../Components/dashboradItems";
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const [act, setAct] = useState(false);
  const { user } = useAuthContext();
  const [DashboardData, setDashboardData] = useState();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Dashboard/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data.Dashboard);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchDashboardData();
  }, [user?.token]);
  return (
    <>
      <MyNavBar  act={act} setAct={setAct} />
      <MyAsideBar />
      <div className="Dashboard">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="dashboard-container">
          {DashboardData ? (
            <MyDashboradTop Data= {DashboardData}></MyDashboradTop>
          ) : <MyDashboradTop Data= {DashboardData}></MyDashboradTop>}
          <div className="dashboard-charts-calnedar">
            <MyChart></MyChart>
            <MyDashboradCalendar></MyDashboradCalendar>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
