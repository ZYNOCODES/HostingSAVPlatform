import React from 'react'
import { AiFillDelete } from "react-icons/ai";

const Deletebutton = ({DeleteUser}) => {
  return (
    <div className="voir-btn-class delete-btn" onClick={DeleteUser}>
      <AiFillDelete size={15} fill="#fff" />
      <input type="submit" value="Supprimer" className="voir-btn" />
    </div>
  )
}

export default Deletebutton