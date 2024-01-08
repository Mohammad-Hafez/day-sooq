import React, { useContext, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import { IoBagCheck } from 'react-icons/io5';
import { RadioButton } from 'primereact/radiobutton';

export default function OrderSummary({handleFormSubmit , setPaymentMethod}) {
  let {TotalPrice} = useContext(cartContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.value);
    setPaymentMethod(e.value);
    console.log(e.value);
  };

  const isPlaceOrderDisabled = !selectedPaymentMethod; 

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
      <span className='ms-1 fw-bolder fs-5'>
        {TotalPrice} JOD
      </span>
    </p>
    <h5 className='dark-grey-text fw-bolder'>Payment Method</h5>
    <div className="payment-method-radio">
          <div className="p-field-radiobutton mb-2">
            <RadioButton
              inputId="cash"
              name="paymentMethod"
              value="cash"
              onChange={handlePaymentMethodChange}
              checked={selectedPaymentMethod === 'cash'}
              className='me-1'
            />
            <label htmlFor="cash">Cash on Delivery</label>
          </div>
          <div className="p-field-radiobutton mb-3">
            <RadioButton
              inputId="card"
              name="paymentMethod"
              value="card"
              onChange={handlePaymentMethodChange}
              checked={selectedPaymentMethod === 'card'}
              className='me-1'
            />
            <label htmlFor="card">Credit or Debit Card</label>
          </div>
        </div>
        <button
          type='submit'
          className='btn-orange rounded-pill w-100 py-2'
          onClick={handleFormSubmit}
          disabled={isPlaceOrderDisabled}
        >
          Place Order <IoBagCheck className='pb-1 fs-4' />
        </button>  </div>
    </>
}
