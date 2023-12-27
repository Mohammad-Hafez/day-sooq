import axios from 'axios';
import React, { useEffect } from 'react';
import ApiBaseUrl from '../ApiBaseUrl';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { Icon } from 'react-icons-kit'
import {ic_local_mall} from 'react-icons-kit/md/ic_local_mall'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
export default function DealsSlider({setIsDealsSliderLoading}) {
  const getBestSellers = () => {
    return axios.get(ApiBaseUrl + `products/bigDeal?limit=10`);
  };

  const { data, isLoading } = useQuery('big-Deal-slider', getBestSellers, { cacheTime: 300000 });

  useEffect(() => {
    setIsDealsSliderLoading(isLoading);
  }, [isLoading, setIsDealsSliderLoading]);

  let BestSettings = {
    Infinity : false ,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow : <MdKeyboardArrowRight/> ,
    prevArrow : <MdKeyboardArrowLeft /> ,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2
        },
      },
    ],
  };

  return (
    <div className="container mb-5">
      <div className="header">
        <h4>Big Deals</h4>
      </div>
      <div className="BestSlider-container position-relative">
        <Slider {...BestSettings} className='rounded'>
          {data?.data?.data?.data.map((product) => (
            <div key={product._id} className="slide-item brdr bg-white text-center align-self-stretch px-3 py-2 h-100 d-flex flex-column justify-content-center align-items-center">
              <h6>{product.name}</h6>
              {/* <img  className='img-fluid flex-grow-1 mb-2' src={'https://electrobile-souq.onrender.com/' + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} /> */}
              <button className='go-Btn d-flex align-items-center justify-content-center ms-auto pb-2'><Icon className='p-0 m-0' icon={ic_local_mall} size={22}></Icon></button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
