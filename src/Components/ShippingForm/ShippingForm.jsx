import axios from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { ApiBaseUrl } from '../ApiBaseUrl'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Dropdown } from 'primereact/dropdown';

export default function ShippingForm() {
const [Cities, setCities] = useState();

  let shippinValues = {
      cards : [''],
      country:'',
      city:'',
      strAddress:'',
      phone:'',
      email:'',
      coupon:'',
      firstName:'',
      lastName : ''
  };

  let shippingSchema = Yup.object({
    cards : Yup.string().required("User Name is required"),
    country:Yup.string().required("User Name is required"),
    city:Yup.string().required("User Name is required"),
    strAddress:Yup.string().required("User Name is required"),
    phone:Yup.string().required("User Name is required"),
    coupon:Yup.string().required("User Name is required")
  });

  let shippingFormik = useFormik({
    initialValues : shippinValues ,
    validationSchema : shippingSchema , 
    onSubmit:(values) =>{console.log(values)}
  })
  const getCountries = ()=>{
    return axios.get(ApiBaseUrl + 'countries')
  };

  const getCities = async (countryIsoCode) => {
    let {data} = await axios.get(ApiBaseUrl + `cities/${countryIsoCode}`);
    setCities(data?.data.cities.map((city)=>city.name))
  };
  
  let {data} = useQuery('all-countreis' , getCountries , {cacheTime : 50000})

  
  let countriesName = data?.data?.data?.countries?.map((country)=> country.name);

  const handleCountrySelect =(selectedCountry)=>{
    const countryIsoCode = data?.data?.data?.countries?.find(country => country.name === selectedCountry)?.isoCode;
    getCities(countryIsoCode)
  };
  
  return <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
    <div className="container my-4">
      <div className="row">
        <div className="col-8">
          <form onSubmit={shippingFormik.handleSubmit} className=''>
            <div className="row gy-3">
              <div className="col-sm-6">
                <label className='ms-2' htmlFor="firstName">First Name</label>
                <input type="text" placeholder='Your first name' className="form-control mb-2 AuthForm-inputs" id="firstName" name="firstName" value={shippingFormik.values.firstName} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} />
                {shippingFormik.errors.firstName && shippingFormik.touched.firstName ? <div className="alert alert-danger">{shippingFormik.errors.firstName}</div>: null}
              </div>
              <div className="col-sm-6">
                <label className='ms-2' htmlFor="lastName">last Name</label>
                <input type="text" placeholder='Your last name' className="form-control mb-2 AuthForm-inputs" id="lastName" name="lastName" value={shippingFormik.values.lastName} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} />
                {shippingFormik.errors.lastName && shippingFormik.touched.lastName ? <div className="alert alert-danger">{shippingFormik.errors.lastName}</div>: null}
              </div>
              <div className="col-12">
                <label className='ms-2' htmlFor="strAddress">Street Address</label>
                <input type="text" placeholder='Address In Details' className="form-control mb-2 AuthForm-inputs" id="strAddress" name="strAddress" value={shippingFormik.values.strAddress} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} />
                {shippingFormik.errors.strAddress && shippingFormik.touched.strAddress ? <div className="alert alert-danger">{shippingFormik.errors.strAddress}</div>: null}
              </div>
              <div className="col-sm-6 d-flex flex-column">
                <label htmlFor="country">Country / Region</label>
                <Dropdown 
                  value={shippingFormik.values.country} 
                  onChange={(e) =>{ 
                    handleCountrySelect(e.value)
                    return shippingFormik.setFieldValue('country', e.value)
                  }} 
                  onBlur={shippingFormik.handleBlur('country')} 
                  options={countriesName} 
                  className='AuthForm-inputs' 
                  placeholder="Select a Country"
                />
              </div>
              <div className="col-sm-6 d-flex flex-column">
                <label htmlFor="country">City</label>
                <Dropdown 
                  value={shippingFormik.values.city} 
                  onChange={(e) => shippingFormik.setFieldValue('city', e.value)} 
                  onBlur={shippingFormik.handleBlur('city')} 
                  options={Cities} 
                  className='AuthForm-inputs' 
                  placeholder="Select a city"
                /> 
              </div>
              <div className="col-sm-6">
                <label className='ms-2' htmlFor="email">Email</label>
                <input type="text" placeholder='First Name' className="form-control mb-2 AuthForm-inputs" id="email" name="email" value={shippingFormik.values.email} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} />
                {shippingFormik.errors.email && shippingFormik.touched.email ? <div className="alert alert-danger">{shippingFormik.errors.email}</div>: null}
              </div>
              <div className="col-sm-6">
                <label className='ms-2' htmlFor="phone">Phone</label>
                <input type="text" placeholder='First Name' className="form-control mb-2 AuthForm-inputs" id="phone" name="phone" value={shippingFormik.values.phone} onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} />
                {shippingFormik.errors.phone && shippingFormik.touched.phone ? <div className="alert alert-danger">{shippingFormik.errors.phone}</div>: null}
              </div>
            </div>
          </form>
        </div>
        <div className="col-4">

        </div>
      </div>
    </div>
    </>
}