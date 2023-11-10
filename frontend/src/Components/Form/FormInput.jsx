import './FormInput.css'
import React from 'react'


const FormInput = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      {props.value ?
        <input 
        placeholder={props.placeholder} 
        value={props.value} 
        type={props.type} 
        onChange={handleChange} 
        readOnly={props.readOnly}/>
      :
        <input 
        placeholder={props.placeholder} 
        defaultValue={props.defaultValue} 
        type={props.type} 
        onChange={handleChange} 
        readOnly={props.readOnly}/>
        }
    </div>
  )
}

export default FormInput