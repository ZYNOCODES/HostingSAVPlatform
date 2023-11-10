import React, { useEffect, useMemo } from 'react'
import VoirButton from '../Buttons/buttonVoir';
import moment from 'moment-timezone';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


function TablePanneRow ({Panne}){
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [currentDate, setcurrentDate] = useState(new Date());
  const calculateDaysDifference = (databaseDate) => {
    if (databaseDate instanceof Date && !isNaN(databaseDate)) {
      const timeDifference = currentDate.getTime() - databaseDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      return daysDifference;
    }
  };
  const Redirect =()=>{
    if(Panne.Progres === 0 && user?.Role === "SAV"){
      navigate(`/EnAttenteDeDepot/${Panne.id}`);
    }else if(user?.Role === "SAV" && (Panne.UserID === user?.id || Panne.UserID === null) && Panne.Progres !== 5){
      navigate(`/DetailPanneSav/${Panne.id}`)
    }else{
      navigate(`/Details/${Panne.id}`)
    }
  }
  const shouldHighlightRedRow = useMemo(() => Panne?.Etat === null && calculateDaysDifference(new Date(Panne.DateDepot)) > 3 && Panne.Progres < 3, [Panne.DateDepot, Panne.Progres]);
  const shouldHighlightOrangeRow = useMemo(() => Panne?.Etat === null && calculateDaysDifference(new Date(Panne.DateDepot)) > 3 && Panne.Progres >= 3 && Panne.Progres < 5, [Panne.DateDepot, Panne.Progres]);
  const shouldHighlightYellowRow = useMemo(() => Panne?.Etat !== null, [Panne?.Etat]);

  return (
    <tr className={`table-nouveau-ne-ligne${(shouldHighlightRedRow || shouldHighlightOrangeRow || shouldHighlightYellowRow) ?
      (shouldHighlightRedRow ? ('-red-row') : (shouldHighlightOrangeRow ? '-orange-row' : '-yellow-row')): '-white-row'}`} >
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.Nom}{' '}{Panne.Prenom}</td>
      <td className="table-patients-td-annee">{formatDate(Panne.DateDepot)}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.StatueGarantie}</td>
      <td className="table-patients-td-region">{Panne?.Etat ? 'suspendu' : 'en cours'}</td>
      <td className="table-patients-td table-patient-td-button">
        <VoirButton Redirect={Redirect} red={shouldHighlightRedRow}/>
      </td>
    </tr>
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
export default TablePanneRow