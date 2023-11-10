import React from 'react'
import { FaPlus } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

export default function AdduserButton() {
  const navigate = useNavigate();

  const navigatetoAdduser =()=>{
    navigate('/NouveauUser');
  }
  return (
    <div className="Add-btn-class" onClick={navigatetoAdduser}>
      <FaPlus size={15} fill="#fff" />
      <input type="submit" value="Nouveau" className="voir-btn" />
    </div>
  );
}