import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function EmailTab() {
  return <>
  <div className="email-tab rounded-pill px-4 mb-3 container-fluid">
      <div className="row w-100 align-items-center">
        <div className="col-md-8">
        <h6 className='m-0 p-0 ms-3 text-white'>
          Subscribe to Our Prize  -  get a <span className=' text-decoration-underline'>200 JOD Coupon</span> for your first order! 
        </h6>

        </div>
        <div className="col-md-4">
          <div className="emailInputContainer position-relative ps-3 my-2">
            <InputText
              placeholder="Enter your Email"
              className="position-relative border-0 w-75 rounded-end-pill"
              onChange={(e) => {
              }}
            />
            <Button
              icon="pi pi-send"
              className="main-orange-bg border-0 fs-6 d-flex justify-content-center rounded-end-pill text-light position-absolute send-email"
            />
          </div>
        </div>
    </div>
  </div>
    </>
}
