import React from 'react'
import { Helmet } from 'react-helmet'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function SuccessOrder() {
  return <>
    <Helmet>
      <title>DAY SOUQ | Order Success</title>
    </Helmet>
    <div className="container font-roboto d-flex align-items-center justify-content-center pt-3 flex-column">
      <h2 className='main-orange-text fw-bolder'>
        <IoIosCheckmarkCircleOutline className='fw-bolder fs-2'/>
      </h2>
      <h3 className='dark-blue-text fw-bold'>
        Thanks for your order!
      </h3>
    </div>
    </>
}
