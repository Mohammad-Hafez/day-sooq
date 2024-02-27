import React from 'react'
import { Icon } from 'react-icons-kit'
import {socialTwitter} from 'react-icons-kit/ionicons/socialTwitter' ;
import {facebook_1} from 'react-icons-kit/ikons/facebook_1';
import {youtube} from 'react-icons-kit/ikons/youtube'
import {instagram} from 'react-icons-kit/entypo/instagram'
import { Link } from 'react-router-dom';
import { IoShieldCheckmark } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { BiShieldQuarter } from "react-icons/bi";
import logo from '../../assets/Logo daysooq V09.png'

export default function Footer() {
  const googleDrivePDFUrl = 'https://drive.google.com/uc?export=download&id=1APdBldNJBI2zVqZau8wopC-50QKfOCDZ';

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
          {/* <div className="col-4 col-md-3 col-lg-2 brdr rounded-0">
          <div className="featuer p-3 d-flex align-items-center justify-content-center">
              <span className='me-2'><MdLabel className='main-orange-text fs-3 rotate'/></span>
              <span className="text">
                <h6 className='dark-grey-text'>Brands</h6>
                <span className='dark-grey-text fs-6'>Only Top</span>
              </span>
            </div>
          </div> */}

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
            <p className='main-grey-text'>street, area Name, Jordan</p>
            <h6 className='dark-grey-text'>Email</h6>
            <p className='main-grey-text'>
              <a href="mailto:contact@electrobilesouq.com" className="text-decoration-none">
                contact@electrobilesouq.com
              </a>
            </p>
            <h6 className='dark-grey-text'>Telephone</h6>
            <p className='main-grey-text'>
              <a href="tel:+000000000" className="tel-link text-decoration-none">
                (+00) 000 000 000
              </a>
            </p>
            <div className="social light-grey-text">
              <span><Icon className='mx-1 cursor-pointer' icon={facebook_1} size={16}></Icon></span>
              <span><Icon className='mx-1 cursor-pointer' icon={instagram} size={16}></Icon></span>
              <span><Icon className='mx-1 cursor-pointer' icon={socialTwitter} size={16}></Icon></span>
              <span><Icon className='mx-1 cursor-pointer' icon={youtube} size={16}></Icon></span>
            </div>
          </div>  
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Categories</h6>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>TV & Audio</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Smartphones</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Laptops & PCs</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Gadgets</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Photo & Video</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Gifts</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Books</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>Toys</Link>
          </div>
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Useful Links</h6>
            <a href={googleDrivePDFUrl} download className='main-grey-text text-decoration-none my-2 d-block'>Contact</a>
            <Link to={'/WishList'} className='main-grey-text text-decoration-none my-2 d-block'>Wishlist</Link>
            <a href={googleDrivePDFUrl} download className='main-grey-text text-decoration-none my-2 d-block'>Terms & Conditions</a>
            <a href={googleDrivePDFUrl} download className='main-grey-text text-decoration-none my-2 d-block'>Privacy Policy</a>
          </div>
        </div>
        <div className="col-4 col-md-2">
          <div className="footer-item p-4 text-start">
            <h6 className='dark-grey-text'>Customer Service</h6>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>My Account</Link>
            <Link to={''} className='main-grey-text text-decoration-none my-2 d-block'>My Cart</Link>
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
