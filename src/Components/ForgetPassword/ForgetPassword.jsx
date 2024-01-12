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

export default function ForgetPassword() {
  let navigate = useNavigate();

  const [ErrMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRecoverEmail = async (values) => {
    try {
      setIsLoading(true);
      let {data} = await axios.post(ApiBaseUrl + 'auth/forgetPassword', values);
      localStorage.setItem('forgetToken' , data.token);
      setIsLoading(false);
      toast.success(`Login Successfully. Enjoy Your Journey`, {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
    });
      navigate('/PasswordOtp')
      if (data.status === 200) {
        console.log('Email sent successfully');
      } else {
        console.error('Unexpected response status:', data.status);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error sending email:', error);
    }
  };

  let mySchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: mySchema,
    onSubmit: (values) => sendRecoverEmail(values),
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container login w-75">
        <form onSubmit={formik.handleSubmit} className="text-center">
          <div className="row">
            <div className="col-8 offset-2 my-3 p-4">
              <div className="w-75 mx-auto">
                <div className="col-12 text-start">
                  <label htmlFor="email" className="ms-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="AuthForm-inputs mb-2 form-control"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="alert alert-danger">{formik.errors.email}</div>
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
                      <span className="me-2">Send Email</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
