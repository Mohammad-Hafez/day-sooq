import React, { useEffect } from 'react'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import { Carousel } from 'primereact/carousel';

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
    autoplaySpeed: 2000,
  };
  const getBanners = ()=>{
    return axios.get(ApiBaseUrl + `banners`)
  }
  let {data , isLoading } = useQuery('mainBanner' , getBanners )
  useEffect(() => {
    setIsBannerLoading(isLoading);
  }, [isLoading, setIsBannerLoading]);

  return <>
  <div className="container mainSlider position-relative mb-3">
        <Slider {...settings} className='rounded'>
          <div className='firstSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                {/* <p className='fs-1 fw-light'>
                  {data?.data?.data?.data[0].description}
                  <br />
                  
                </p> */}
                </div>
              </div>
              <div className="col-6">
                <img alt='img1' src={ImgBaseURL +  data?.data?.data?.data[0]?.image} loading='lazy' className='img-fluid'/>
              </div>
            </div>
          </div>
          <div className='thirdSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                <p className='fs-1 fw-light'>
                {data?.data?.data?.data[1]?.description}
                </p>
                </div>
              </div>
              <div className="col-6">
                <img alt='img2' src={ImgBaseURL +  data?.data?.data?.data[1]?.image} className='img-fluid'/>
              </div>
            </div>
          </div>
          <div className='secSlide'>
            <div className="row">
              <div className="col-6 text-center d-flex align-items-center justify-content-center flex-column">
                <div className="labelContainer d-flex align-items-center justify-content-center flex-column">
                <p className='fs-1 fw-light'>
                {data?.data?.data?.data[2]?.description}
                </p>
                </div>
              </div>
              <div className="col-6">
              <img alt='img3' src={ImgBaseURL +  data?.data?.data?.data[2]?.image} className='img-fluid py-3'/>
              </div>
            </div>
          </div>
        </Slider>    
        

  </div>
        </>
}
