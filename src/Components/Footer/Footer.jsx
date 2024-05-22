import React from 'react'
import { Icon } from 'react-icons-kit'
import {facebook_1} from 'react-icons-kit/ikons/facebook_1';
import {instagram} from 'react-icons-kit/entypo/instagram'
import { Link } from 'react-router-dom';
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { BiShieldQuarter } from "react-icons/bi";
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { FaTiktok } from "react-icons/fa";
import {linkedin} from 'react-icons-kit/ikons/linkedin'

export default function Footer() {

  const googleDrivePrivacyUrl = 'https://drive.google.com/file/d/13UKqATbbsOAUjCX9eB3EPqP9P1DbLd_i/view?usp=sharing';
  const googleDriveTermsUrl = 'https://drive.google.com/file/d/1OWt1l2ik6zhLvdG4Mf27wjGI6lYqZ0gw/view?usp=sharing';
  const getAllCategories = () => axios.get(ApiBaseUrl + `categories`);
  const { data: CategoriesNameResponse } = useQuery(
    'get Categories', getAllCategories, { cacheTime: 100000 }
  );
  return <>
  <div className="fixed-features mb-3">
    <div className="container">
      <div className="row">
          <div className="col-6  col-lg-3 brdr rounded-0 ">
            <div className="featuer p-3 d-flex align-items-center justify-content-center">
              <span className='me-2'><IoShieldCheckmark className='main-orange-text fs-3'/></span>
              <span className="text">
                <h6 className='dark-grey-text'>Guarantee</h6>
                <span className='dark-grey-text fs-6'>24 Months</span>
              </span>
            </div>
          </div>
          <div className="col-6  col-lg-3 brdr rounded-0">
          <div className="featuer p-3 d-flex align-items-center justify-content-center">
              <span className='me-2'><FaCreditCard className='main-orange-text fs-3 rotate'/></span>
              <span className="text">
                <h6 className='dark-grey-text'>Rate Paying</h6>
                <span className='dark-grey-text fs-6'>4 - 12 Months</span>
              </span>
            </div>
          </div>
          <div className="col-6  col-lg-3 brdr rounded-0">
          <div className="featuer p-3 d-flex align-items-center justify-content-center">
              <span className='me-2'><BiShieldQuarter className='main-orange-text fs-3'/></span>
              <span className="text">
                <h6 className='dark-grey-text'>Payments</h6>
                <span className='dark-grey-text fs-6'>Secured</span>
              </span>
            </div>
          </div>
          <div className="col-6  col-lg-3 brdr rounded-0">
          <div className="featuer p-3 d-flex align-items-center justify-content-center">
              <span className='me-2'><FaTruck className='main-orange-text fs-3'/></span>
              <span className="text">
                <h6 className='dark-grey-text'>Free Delivery</h6>
                <span className='dark-grey-text fs-6'>from JOD 100</span>
              </span>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div className="footer rounded-top">
    <div className="container ">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="footer-item p-4 text-start">
            <div className="logo mb-3">
              <span><h3 className='p-0 m-0 logo text-decoration-none font-quest dark-blue-text'> Day <span className='font-Rowdies main-orange-text'>Sooq</span> </h3></span> 
            </div>
            <h6 className='dark-grey-text'>Address</h6>
            <p className='main-grey-text'>Jordan, Amman, 7th circle</p>
            <h6 className='dark-grey-text'>Email</h6>
            <p className='main-grey-text'>
              <a href="mailto:info@daysooq.com" className="text-decoration-none">
                info@daysooq.com
              </a>
            </p>
            <h6 className='dark-grey-text'>Telephone</h6>
            <p className='main-grey-text'>
              <a href="tel:+962792520259" className="tel-link text-decoration-none">
                +962792520259
              </a>
            </p>
            <div className="social light-grey-text d-flex">
              <span><a href="https://www.facebook.com/profile.php?id=100079674895040" target='_blank' className='main-grey-text me-1 text-decoration-none my-2 d-block'><span><Icon className='mx-1 cursor-pointer' icon={facebook_1} size={16}></Icon></span></a></span>
              <span><a href="https://www.instagram.com/daysooq.co/" target='_blank' className='main-grey-text me-1 text-decoration-none my-2 d-block'><span><Icon className='mx-1 cursor-pointer' icon={instagram} size={16}></Icon></span></a></span>
              <span><a href="https://www.tiktok.com/@daysooq?is_from_webapp=1&sender_device=pc" target='_blank' className='main-grey-text me-1 text-decoration-none my-2 d-block'><span><FaTiktok size={16}/></span></a></span>
              <span><a href="https://www.linkedin.com/company/daysooqjordan/" target='_blank' className='main-grey-text me-1 text-decoration-none my-2 d-block'><span><Icon className='mx-1 cursor-pointer' icon={linkedin} size={16}></Icon></span></a></span>
            </div>
          </div>  
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Categories</h6>
            {CategoriesNameResponse?.data.data.data?.map((category , index)=>{return (
              <Link key={index} to={`/CategoryProducts/${category.name}/${encodeURIComponent(category._id)}`} className='main-grey-text text-decoration-none my-2 d-block'>{category?.name}</Link>)
            })}
          </div>
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Useful Links</h6>
            <a href={googleDriveTermsUrl} download target='_blank' className='main-grey-text text-decoration-none my-2 d-block'>Terms & Conditions</a>
            <a href={googleDrivePrivacyUrl} download target='_blank' className='main-grey-text text-decoration-none my-2 d-block'>Privacy Policy</a>
          </div>
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Customer Service</h6>
            <Link to={'/MyCart'} className='main-grey-text text-decoration-none my-2 d-block'>My Cart</Link>
            <Link to={'/WishList'} className='main-grey-text text-decoration-none my-2 d-block'>Wishlist</Link>
            <Link to={'/MyOrders'} className='main-grey-text text-decoration-none my-2 d-block'>My Orders</Link>
          </div>
        </div>
      </div>
      <div className="copyright w-100 text-center pb-2">
        <span className='main-grey-text my-0'>© Electrobile Souq 2024 - ALL Rights Reserved </span>
      </div>
    </div>
  </div>
    </>
}
