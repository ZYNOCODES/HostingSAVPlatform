import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css';
import React from 'react';

function CostumSelect(props, {Newoption}) {
  const { user } = useAuthContext();
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        {user && user.Role === 'DRCentre' &&
          <>
          {props.value === 'DRCentre' ? 
            <option value={props.value}>{props.value}</option>
            :
            <>
              <option value=''>Sélectionné le role</option>
              <option value='SAV'>SAV</option>
            </>
          }
          </>
        }
        {user && user.Role === 'Admin' &&
          <>
            {props.value ? 
              (
                <>
                  {props.value === 'DRCentre' ? (
                    <>
                      <option value={props.value}>{props.value}</option>
                      <option value='Admin'>Admin</option>
                      <option value='SAV'>SAV</option>
                    </>
                  ) : props.value === 'SAV' ? (
                    <>
                      <option value={props.value}>{props.value}</option>
                      <option value='Admin'>Admin</option>
                      <option value='DRCentre'>DRCentre</option>
                    </>
                  ) : props.value === 'Admin' ? (
                    <>
                      <option value={props.value}>{props.value}</option>
                      <option value='SAV'>SAV</option>
                      <option value='DRCentre'>DRCentre</option>
                    </>
                  ) : null}

                </>
              ):
              (
                <>
                  <option value='All'>All</option>
                  <option value='Admin'>Admin</option>
                  <option value='SAV'>SAV</option>
                  <option value='DRCentre'>DRCentre</option>
                </>
              )
            }
          </>
        }
      </select>
    </div>
  );
}

export default CostumSelect;
