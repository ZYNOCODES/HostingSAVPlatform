import React from 'react'
import VoirButton from '../Buttons/buttonVoir';

import { useState} from 'react';


function PanneTest ({Panne}){

  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.ReferanceProduit}</td>
      <td className="table-patients-td-annee">{Panne.DateDepot}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.TypePanne}</td>
    </tr>
  )
}

export default PanneTest