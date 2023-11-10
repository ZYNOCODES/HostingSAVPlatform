import React, { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAuthContext } from "../../hooks/useAuthContext";
import moment from 'moment';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  devicePixelRatio: 5,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)', 
      },
    },
    y: {
      beginAtZero: true, 
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)', 
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
};
export default function MyChart() {
  const { user } = useAuthContext();
  const [SelectedData, setSelectedData] = useState("week");
  const [DataType, setDataType] = useState("NbTicketsOuverts");
  const [DashboardDataWeekly, setDashboardDataWeekly] = useState();
  const [DashboardDataMonthly, setDashboardDataMonthly] = useState();
  const [DashboardDataYearly, setDashboardDataYearly] = useState();
  
  useEffect(() => {
    const fetchDashboardDataWeekly = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Dashboard/current/week`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setDashboardDataWeekly(data.Dashboard);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
    fetchDashboardDataWeekly();
  },[user?.token]);
  useEffect(() => {
    const fetchDashboardDataMonthly = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Dashboard/current/month`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setDashboardDataMonthly(data.Dashboard);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
    fetchDashboardDataMonthly();
  },[user?.token]);
  useEffect(() => {
    const fetchDashboardDataYearly = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/Dashboard/current/year`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setDashboardDataYearly(data.Dashboard);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
    fetchDashboardDataYearly();
  },[user?.token]);
  
  const labelWeekfr = ["Sam", "Dim", "Lun", "Mar", "Mer", "Jeu"];
  const labelMonthfr = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"];
  const labelYear = [];
  const currentYear = moment().year();
  for (let i = 0; i < 5; i++) {
    labelYear.push(currentYear - i);
  }
  const dataWeek = {
    labels: labelWeekfr,
    datasets: [
      {
        label: "Nombre des Tickets Ouverts",
        data: [],
        backgroundColor: "#DA171B",
        hoverBackgroundColor: "rgb(79, 129, 255)",
        barThickness: 30,
        borderRadius: 4,
      },
    ],
  };
  const dataMonth = {
    labels: labelMonthfr,
    datasets: [
      {
        label: "Nombre des Tickets Ouverts par mois",
        data: [],
        backgroundColor: "#DA171B",
        hoverBackgroundColor: "rgb(79, 129, 255)",
        barThickness: 10,
        borderRadius: 4,
      },
    ],
  };
  const dataYear = {
    labels: labelYear,
    datasets: [
      {
        label: "Nombre des Tickets Ouverts par mois",
        data: [],
        backgroundColor: "#DA171B",
        hoverBackgroundColor: "rgb(79, 129, 255)",
        barThickness: 60,
        borderRadius: 4,
      },
    ],
  }

  const labelWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  for (let i = 0; i < labelWeek.length; i++) {
    const dayLabel = labelWeek[i];
    const dayData = DashboardDataWeekly?.find((entry) => {
        const entryDay = moment(entry.createdAt).format('ddd');
        return entryDay === dayLabel;
    });
    if (dayData) {
        dataWeek.datasets[0].data.push(dayData[DataType]);
    } else {
        dataWeek.datasets[0].data.push(0);
    }
  }
  const labelMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < labelMonth.length; i++) {
    const monthLabel = labelMonth[i];
    const monthData = DashboardDataMonthly?.find((entry) => {
        const entryMonth = moment().month(parseInt(entry.month) - 1).format('MMM'); // Get the month abbreviation
        return entryMonth === monthLabel;
    });
    
    if (monthData) {
        dataMonth.datasets[0].data.push(monthData[DataType]);
    } else {
        dataMonth.datasets[0].data.push(0);
    }
  }
  for (let i = 0; i < labelYear.length; i++) {
    const yearLabel = labelYear[i];
    const yearData = DashboardDataYearly?.find((entry) => entry.year === yearLabel);

    // If data exists for the year, push it to the data array; otherwise, push 0
    if (yearData) {
        dataYear.datasets[0].data.push(yearData[DataType]);
    } else {
        dataYear.datasets[0].data.push(0);
    }
  }

  return (
    <div className="dashboard-chart-container">
      <div className="chart-header">
        <div className="select-chart">
          <select
            className="select-data-chart"
            name="select-data-chart"
            id="select-data-chart"
            onChange={(e) => {setDataType(e.target.value)}}
          >
            <option value="NbTicketsOuverts">Nombre de tickets ouverts</option>
            <option value="ProduitEnAttente">les produits en attente de dépôt</option>
            <option value="ProduitDeposes">les produits déposés</option>
            <option value="ProduitEnReparation">les produits en reparation au centre</option>
            <option value="ProduitRepares">les produits réparés</option>
            <option value="EnAttenteDePickup">Produits en attente de retrait</option>
            <option value="Produitlivre">livrés</option>
          </select>
          <select
            className="displaying-data-chart"
            name="displaying-data-chart"
            id="displaying-data-chart"
            onChange={(e) => {setSelectedData(e.target.value)}}
          >
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">Année</option>
          </select>
        </div>
      </div>
      <div className="chart-line">
        <div className="chart-line-container"></div>
      </div>

      {SelectedData === "week" ? 
        <Bar className="chart-dashboard1" options={options} data={dataWeek} /> :
        (SelectedData === "month" ?
          <Bar className="chart-dashboard1" options={options} data={dataMonth} /> :
          (SelectedData === "year" ?
            <Bar className="chart-dashboard1" options={options} data={dataYear} /> :
            <Bar className="chart-dashboard1" options={options} data={dataWeek} />
          )
        )
      }
    </div>
  );
}
