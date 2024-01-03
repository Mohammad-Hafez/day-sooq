import React from 'react'
import { Helmet } from 'react-helmet'
export default function MyCart() {
  return <>
    <Helmet>
      <title>SHOPPING CART</title>
    </Helmet>
    <div className="container mt-2">
      <p className='main-grey-text'>Cart</p>
      <div className="row">
        <div className="col-md-8">
          <div className="cart-container">

          </div>
        </div>
        <div className="col-md-4">

        </div>
      </div>

    </div>
    </>
}
