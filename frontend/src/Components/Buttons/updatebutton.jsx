import React from 'react'
import { GrUpdate } from "react-icons/gr";


const Updatebutton = ({Redirection}) => {
  return (
    <div className="voir-btn-class update-btn" onClick={Redirection}>
      <GrUpdate size={15} fill='#fff'/>
      <input type="button" value="Modifier" className="voir-btn" />
    </div>
  )
}

export default Updatebutton