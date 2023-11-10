import { useAuthContext } from '../../hooks/useAuthContext';
import '../Style/ActionCorrective.css'
import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import Updatebutton from '../Buttons/updatebutton'

const ActionCorrective = (props) => {
  const options = [
        "Branchement de LVDS",
        "Branchement d’une nappe",
        "Shunt au niveau du MPCB",
        "Changement de MPCB",
        "Changement de SMPS",
        "Changement de dalle",
        "Changement de glass",
        "Changement de barrettes de LED (spécifier le nombre de barrettes)",
        "Changement de BLU",
        "Changement de carte graphique",
        "Changement d’inveter",
        "Changement de CPU",
        "Modification diffuseur (et non pas tailler diffuseur, réparer diffuseur)",
        "Changement de sheets",
        "Changement de LVDS",
        "Isolation de la dalle",
        "Changement des IC",
        "Reprogrammation de la mémoire flash",
        "Software (Et non pas Mise à jour)",
        "Remise à zéro",
        "Correction de soudure au niveau de … (spécifier l’endroit exacte)",
        "Changement de la réceptrice IR",
        "Changement de clavier",
        "Changement bouton ON/OFF",
        "Changement des HP",
        "Changement de l’interrupteur",
        "Changement de fusible",
        "Changement flash",
        "Changement de cache arrière",
        "RAS",
        "Récupéré par le client sans réparation"
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
    <div className="form-Action-corrective-group" >
      <>
        <div className='forminput-Action-corrective'>
          <label>{props.label}</label>
          <select className='forminput-Action-corrective-input' onChange={handleChange} value={currentOption}>
            <option value=''>
              Ajouter un action corrective
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className='Select-Action-corrective-containeer'>
          {selectedOptions.map((option, index) => (
            <div className='Select-Action-corrective-row' key={index}>
              <input
                className='Select-Action-corrective'
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

export default ActionCorrective;
