import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  phone: Yup.string().required('Phone is required'),
  image: Yup.mixed().nullable(),
});

export default function ProfileDetails() {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('DaySooqUser')}`,
  };

  const getMyProfile = () => axios.get(ApiBaseUrl + `users/profile`, { headers });
  const { data, refetch , isLoading , isFetching } = useQuery('my-profile', getMyProfile, { cacheTime: 5000 });

  const initialValues = {
    firstName : data?.data.data.data.firstName,
    lastName : data?.data.data.data.lastName,
    email : data?.data.data.data.email,
    gender : data?.data.data.data.gender,
    phone : data?.data.data.data.phone,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.patch(ApiBaseUrl + 'users/updateProfile', values, { headers });
      refetch();
      toast.success('Updated Successfully.', {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
    });
    } catch (error) {
      toast.error("An Error Occured. Please Try Again", {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
    });
      console.error('Error updating profile:', error.message);
    } finally {
      setSubmitting(false);
    }
  };


  return <>
      <Helmet>
      <title>My Profile</title>
    </Helmet>

  {isLoading && <Loader/>}
    {data && 
    <div className='container my-3 px-3'>
      <h2>Edit Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        
      >
        {({ isSubmitting , setFieldValue  }) => (
          <Form>
            <Row>
              <Col>
                <label htmlFor="firstName">First Name:</label>
                <Field type="text" id="firstName" name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component="div" className="text-danger" />
              </Col>
              <Col>
                <label htmlFor="lastName">Last Name:</label>
                <Field type="text" id="lastName" name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" className="form-control" readOnly />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </Col>
              <Col>
                <label htmlFor="gender">Gender:</label>
                <Field as="select" id="gender" name="gender" className="form-control">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-danger" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="phone">Phone:</label>
                <Field type="text" id="phone" name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
              </Col>
            </Row>
            <Button type="submit" className='btn-orange my-2' disabled={isSubmitting}>
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    }
    {isFetching && <Loader/>}
</>
}
