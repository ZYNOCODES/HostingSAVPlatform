import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css'
import React, { useEffect, useState } from 'react'

const ProductSelect = (props) => {
  const { user } = useAuthContext();
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+'/Product', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchProductData();
  }, [user?.token]);
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        <option value=''>
            Sélectionné votre produit
        </option>
        {products.map((product) => (
            <option key={product?.id} value={product?.ReferanceProduit}>
                {product?.ReferanceProduit}
            </option>
        ))}        
      </select>
    </div>
    
  )
}

export default ProductSelect
