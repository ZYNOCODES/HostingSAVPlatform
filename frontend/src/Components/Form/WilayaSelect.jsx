import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css'
import React, { useEffect, useState } from 'react'

const WilayaSelect = (props) => {
  const { user } = useAuthContext();
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedKey = event.target.selectedOptions[0].dataset.key;
  
    if (props.onChange) {
      props.onChange(selectedValue, selectedKey);
    }
  };
  const [Willaya, setWillaya] = useState([]);
  useEffect(() => {
    const fetchWillayaData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+'/Willaya', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setWillaya(data);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchWillayaData();
  }, [user?.token]);
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        <option value=''>Sélectionné votre willaya</option>
        {Willaya.map((willaya) => (
            <option data-key={willaya?.code} value={willaya?.Nom}>
                {willaya?.Nom}
            </option>
        ))}   
      </select>
    </div>
    
  )
}

export default WilayaSelect
