import React from 'react'
export default function CartSummary() {
  return <>
  <div className="cartSummary">
    <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start">
      <h5 className='main-orange-text'>Order Summary</h5>
          <div className="delivery d-flex align-items-center justify-content-between w-100 mb-3">
            <p className='m-0 light-grey-text'>Delivery :</p>
            <div className="free-badge light-gtreen-bg px-2 rounded-pill">
              <span className=''>free</span>
            </div>
          </div>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Subtotal : 
            <span className='ms-1 fw-bold'>
              JOD
            </span>
          </p>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Discount : 
            <span className='ms-1 fw-bold light-red-text'>
              JOD
            </span>
          </p>
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Delivery Fee : 
            <span className='ms-1 fw-bold'>
              JOD
            </span>
          </p>
          <hr />
          <p className='dark-blue-text mb-3 w-100 d-flex align-items-center justify-content-between'>
            Total : 
            <span className='ms-1 fw-bold'>
              JOD
            </span>
          </p>

          <div className="quantity-control w-75 mb-4">
          </div>
        </div>
  </div>
    </>
}
