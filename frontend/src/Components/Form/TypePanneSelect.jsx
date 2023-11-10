import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css'
import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import Updatebutton from '../Buttons/updatebutton'

const TypePanneSelect = (props) => {
  const options = [
    'Fiche mal placée',
    'NDP',
    'Standby',
    'Ecran noire',
    'Ecran blanc',
    'Pas d’affichage',
    'Mosaique',
    'Pb d’image',
    'Trait vertical',
    'Trait horizontal',
    'Tâche noire',
    'Bande vertical',
    'Bande horizontal',
    'Bande noire',
    'Pixel',
    'Particules',
    'Dalle cassée',
    'Pb de réceptrice IR',
    'Pb de clavier',
    'Pb de TLC',
    'Blocage logo',
    'Blocage menu',
    'Pb de son',
    'Bruit de son',
    'Arrêt après chauffe',
    'Standby après chauffe',
    'Ecran noir après chauffe',
    'Pb Android',
    'Problème HDMI, RCA, Tuner, USB',
    'Blocage',
    'Pb baffe',
    'Pb HP',
    'Pb de bouton ON/OFF',
    'Pb réseau',
    'Pb Wifi',
    'Pb application (YouTube, PlayStore, ….)',
    'Sur chauffe',
    'Pb connecteur ',
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    if (props.value && selectedOptions.length === 0) {
      setSelectedOptions(props.value.split('-').map(item => item.trim()));
    }
  }, [props.value, selectedOptions.length]);
  const [currentOption, setCurrentOption] = useState('');
  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOptions([...selectedOptions, selectedOption]);
    setCurrentOption('');
  };

  
  const handleInput = (event, index) => {
    event.preventDefault();
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };
  
  const deleteFromSelectedOptions = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(index, 1);
    setSelectedOptions(newSelectedOptions);
    props.onChange(newSelectedOptions);
  };
  props.onChange(selectedOptions);
  return (
    <div className="form-group-type-panne" >
      <>
        <div className='forminput-type-panne'>
          <label>{props.label}</label>
          <select onChange={handleChange} value={currentOption}>
            <option value=''>
              Ajouter un type de panne
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className='Select-panne-input-containeer'>
          {selectedOptions.map((option, index) => (
            <div className='Select-panne-input-row' key={index}>
              <input
                className='Select-panne-input'
                onChange={(event) => handleInput(event, index)}
                value={option}
                type='text'
                placeholder={props.placeholder}
              />
              <MdCancel onClick={() => deleteFromSelectedOptions(index)} />
            </div>
          ))}
        </div>
      </>
    </div>
  )
}

export default TypePanneSelect
