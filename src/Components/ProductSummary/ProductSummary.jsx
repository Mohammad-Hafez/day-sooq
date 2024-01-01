import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

export default function ProductSummary({product}) {
  return <>
  <div className="p-summary">
    <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start">
      <div className="delivery d-flex align-items-center justify-content-between w-100 mb-3">
        <p className='m-0 light-grey-text'>Delivery :</p>
        <div className="free-badge light-gtreen-bg px-2 rounded-pill">
          <span className=''>free</span>
        </div>
      </div>
      <button className='w-100 grey-outline-btn mb-4 py-2 fs-5'>Wishlist</button>
      <h4 className='main-grey-text mb-3'>  
        Total Price : 
          <span className='ms-1 dark-grey-text'> {product?.priceDiscount?.value > 0
                                    ? product?.priceDiscount.type === 'percentage'
                                      ? product.price *
                                        (product.priceDiscount.value / 100)
                                      : product.price - product.priceDiscount.value
                          : product.price} JOD
          </span> 
      </h4>
      <div className="quantity-control w-75 mb-4">
        <button className='brdr w-100 d-flex align-items-center justify-content-between px-3 py-1'> <span><FaPlus size={15}/></span> <span>1</span> <span><FaMinus  size={15}/></span></button>
      </div>
      <button className='btn-orange rounded-pill w-100 py-2 fs-5'>Add to Cart</button>
    </div>
  </div>
    </>
}
