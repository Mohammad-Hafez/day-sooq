import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function EmailTab() {
  return <>
  <div className="email-tab rounded-pill py-3 mb-3 container-fluid">
    <div className="container d-flex align-items-center justify-content-between">
      <h6 className='m-0 text-white'>
      Subscribe to Our Prize  -  get a <span className=' text-decoration-underline'>200 JOD Coupon</span> for your first order! 
      </h6>
      <div className="emailInputContainer position-relative">
        <InputText
          placeholder="Enter your email address"
          // value={SearchVal}
          className="position-relative border-0 ms-3 w-100"
          onChange={(e) => {
            // setSearchVal(e.target.value);
          }}
        />
        <Button
          icon="pi pi-send"
          className="main-orange-bg border-0 fs-6 d-flex justify-content-center rounded-end-pill text-light position-absolute top-0 end-0 send-email"
          // onClick={handleNavSearch}
          // disabled={!SearchVal}
        />

      </div>
    </div>
  </div>
    </>
}
