import React from 'react'
import Slider from "react-slick";
import img1 from '../../assets/6a6b7790cf6871937e50d56dbf58654a.png'
import img2 from '../../assets/8cd9c64b5fbf922ff7b8a35def91281b.png'
import img3 from '../../assets/b96a8f62f6fb6ab9082a364fc4ae74da.png'
import { useQuery } from 'react-query';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';

export default function MainSlider({setIsBannerLoading}) {
  let settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    // afterChange: function(index) {
    //   console.log(
    //     `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //   );
    // }, for change bg-color dynamic
    autoplaySpeed: 2000,
  };
  const getBanners = ()=>{
    return axios.get(ApiBaseUrl + `banners`)
  }
  let {data , isLoading } = useQuery('mainBanner' , getBanners )

  return <>
  <div className="container position-relative mb-3">
        <Slider {...settings} className='rounded'>
          <div className='firstSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                <p className='fs-1 fw-light'>
                  {data?.data?.data?.data[0].description}
                  <br />
                  
                </p>
                <button className='btn btn-orange align-self-start rounded-pill'>Find Out</button>

                </div>
              </div>
              <div className="col-6">
                <img alt='img1' src={'https://electrobile-souq.onrender.com/' +  data?.data?.data?.data[0].image} loading='lazy' className='img-fluid'/>
              </div>
            </div>
          </div>
          <div className='thirdSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                <p className='fs-1 fw-light'>
                {data?.data?.data?.data[1].description}
                </p>
                <button className='btn btn-primary align-self-start rounded-pill'>Find Out More</button>
                </div>
              </div>
              <div className="col-6">
                <img alt='img2' src={'https://electrobile-souq.onrender.com/' +  data?.data?.data?.data[1].image} className='img-fluid'/>
              </div>
            </div>
          </div>
          <div className='secSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                <p className='fs-1 fw-light'>
                {data?.data?.data?.data[2].description}
                </p>
                <button className='btn btn-primary align-self-start rounded-pill'>Find Out More</button>
                </div>
              </div>
              <div className="col-6">
              <img alt='img3' src={'https://electrobile-souq.onrender.com/' +  data?.data?.data?.data[2].image} className='img-fluid py-3'/>
              </div>
            </div>
          </div>
        </Slider>    
        

  </div>
        </>
}