import React, { useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import { IoBagCheck } from "react-icons/io5";

export default function OrderSummary() {
  let {TotalPrice} = useContext(cartContext);

  return <>
  <div className="orderSummary blue-brdr rounded-4 mt-3 p-3 d-flex flex-column align-items-start justify-content-start font-Poppins">
    <h5 className='main-orange-text mb-3 font-Poppins fw-bolder'>Order Summary</h5>
    <p className='dark-blue-text w-100 d-flex align-items-center justify-content-between'>
      Subtotal : 
      <span className='ms-1 fw-bold'>
      {TotalPrice} JOD
      </span>
    </p> 
    <hr className='w-100 my-3'/>
    <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
      Shipping Fee : 
      {TotalPrice > 100 ? <span className='light-green-text'>Free</span> : <span className='light-green-text'></span>}
    </p>
    <hr className='w-100 my-3'/>
    <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between fs-5'>
      Total : 
      <h5 className='ms-1 fw-bolder '>
        {TotalPrice} JOD
      </h5>
    </p>
    <h5 className='dark-grey-text fw-bolder'>Payment Method</h5>
    <button className='btn-orange rounded-pill w-100 py-2'>Place Order <IoBagCheck className='pb-1 fs-4'/></button>
  </div>
    </>
}
