import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';

export default function CartSummary() {

  let {TotalPrice , applyPromoCode} = useContext(cartContext);

  const [PromoCodeName, setPromoCodeName] = useState();

  let navigate = useNavigate();

  return <>
  <div className="cartSummary">
    <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start">
      <h5 className='main-orange-text mb-3'>Order Summary</h5>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Subtotal : 
            <span className='ms-1 fw-bold'>
            {TotalPrice} JOD
            </span>
          </p>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Discount : 
            <span className='ms-1 fw-bold light-red-text'>
             0.00 JOD
            </span>
          </p>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Delivery Fee : 
            {TotalPrice > 100 ? <span className='light-green-text'>Free</span> : <span className='light-green-text'></span>}
          </p>
          <hr className='summaryLine w-100'/>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Total : 
            <span className='ms-1 fw-bold'>
              {TotalPrice} JOD
            </span>
          </p>
          <div className="promoCode d-flex align-items-center justify-content-between w-100 mb-3">
            <span className="p-input-icon-left promoCodeInput d-flex align-items-center flex-grow-1">
              <i className="pi pi-tag dark-blue-text me-1 " />
              <InputText placeholder="Add promo code" value={PromoCodeName} onChange={(e) => setPromoCodeName(e.target.value)} className='w-100 me-1 rounded-pill light-grey-bg dark-blue-text'/>
            </span>
            <button className='btn-orange rounded-pill px-4 py-2' onClick={()=>applyPromoCode(PromoCodeName , TotalPrice)}>Apply</button>
          </div>
          <button className='btn-orange rounded-pill w-100 py-2' onClick={()=>navigate('/ShippingForm')}>Go to Checkout <i className='pi pi-arrow-right'/></button>
        </div>
  </div>
    </>
}
