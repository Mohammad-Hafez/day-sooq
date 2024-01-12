import axios from 'axios';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { Icon } from 'react-icons-kit';
import { alertCircle } from 'react-icons-kit/feather/alertCircle';
import toast from 'react-hot-toast';

export default function PasswordOtp() {

  let navigate = useNavigate();

  const [ErrMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async (val) => {
    try {
      let {data} = await axios.post(ApiBaseUrl + `verifyOtp/${localStorage.getItem('forgetToken')}` , val);
      console.log(data);
    } catch (error) {
      console.error(error)
    }
  }

  let mySchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });

  let formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => sendOtp(values),
  });

  return <>
    <Helmet>
      <title>OTP Password</title>
    </Helmet>
    <div className="container login my-3">
        <form onSubmit={formik.handleSubmit} className="text-center">
          <div className="row">
            <div className="col-5 offset-4 my-3">
                <div className="col-12 text-start">
                  <label htmlFor="otp" className="ms-2">
                    Enter OTP 
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 4 digits"
                    className="AuthForm-inputs mb-2 form-control"
                    name="otp"
                    id="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.otp && formik.touched.otp && (
                    <div className="alert alert-danger">{formik.errors.otp}</div>
                  )}
                </div>

                <div className="col-12">
                  {ErrMsg && (
                    <div className="Err alert alert-danger w-75 mx-auto">
                      <Icon size={20} icon={alertCircle} /> {ErrMsg}
                    </div>
                  )}
                </div>

                <div className="btns col-12 my-2">
                  {isLoading ? (
                    <button type="button" className="btn btn-orange rounded-pill text-light w-75 mx-auto">
                      <i className=" fa fa-spin fa-spinner"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                      className="btn btn-orange rounded-pill text-light mx-auto w-75 d-flex align-items-center justify-content-center"
                    >
                      <span className="me-2">Verify OTP</span>
                    </button>
                  )}
                </div>
              </div>
          </div>
        </form>
      </div>
    </>
}
