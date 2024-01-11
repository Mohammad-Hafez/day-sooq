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

export default function ChangeProfilePic() {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('DaySooqUser')}`,
  };
  const getMyProfile = () => axios.get(ApiBaseUrl + `users/profile`, { headers });
  const { data, refetch , isLoading , isFetching } = useQuery('my-profile', getMyProfile, { cacheTime: 5000 });

  const handleimageChange = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    console.log(file);
    // setFieldValue('image', file);
  };

  const handleUpdateimage = async (values) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image);

      await axios.post(ApiBaseUrl + 'users/updateProfileImage', formData, {
        headers
      });

      // Refetch user profile after updating the profile picture
      refetch();
      console.log('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error updating profile picture:', error.message);
    }
  };

  return <>
    <Helmet>
      <title>title</title>
    </Helmet>
          {/* <h2>Update Profile Picture</h2> */}
      {/* <Formik
        initialValues={initialValues.image}
        onSubmit={(values) => handleUpdateimage(values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <Row>
              <Col>
                <label htmlFor="image">Profile Picture:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => handleimageChange(event, setFieldValue)}
                  className="form-control"
                />
              </Col>
            </Row>
            <Button type="submit" className='my-2'>Update Profile Picture</Button>
          </Form>
        )}
      </Formik> */}

    </>
}
