import axios from 'axios';
import React, { useEffect } from 'react';
import {ApiBaseUrl } from '../ApiBaseUrl'
import { useQuery } from 'react-query';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ProductsSlider from '../ProductsSlider/ProductsSlider'; 

export default function BiddingSlider({setIsBiddingSliderLoading}) {
  const getFeaturedBidding = () => {
    return axios.get(ApiBaseUrl + `products?limit=10&isAction=true`);
  };

  const { data, isLoading } = useQuery('Bidding-slider', getFeaturedBidding, { cacheTime: 300000 });

  useEffect(() => {
    setIsBiddingSliderLoading(isLoading);
  }, [isLoading, setIsBiddingSliderLoading]);

  let BiddingSettings = {
    Infinity : false ,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
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
          initialSlide: 1
        },
      },
    ],
  };

  let products = data?.data?.data?.data
  return <>
  <div className="biddingSlider py-4 mb-5">
    <div className="container">
      <div className="header d-flex align-items-center justify-content-between">
        <h4>Bidding Products</h4>
        {/* <h5 className='view-all main-blue-text'>View All</h5> */}
      </div>
      <div className="BestSlider-container position-relative">
        <ProductsSlider products={products} settings={BiddingSettings} slider={'bidding'}/>
      </div>
    </div>
  </div>
  </>
}