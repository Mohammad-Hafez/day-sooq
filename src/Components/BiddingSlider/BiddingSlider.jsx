import axios from 'axios';
import React, { useEffect } from 'react';
import ApiBaseUrl from '../ApiBaseUrl';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { Icon } from 'react-icons-kit'
import {ic_local_mall} from 'react-icons-kit/md/ic_local_mall'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {heart} from 'react-icons-kit/ionicons/heart'
import { GoGitCompare } from "react-icons/go";
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
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    nextArrow : <MdKeyboardArrowRight/> ,
    prevArrow : <MdKeyboardArrowLeft /> ,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          initialSlide: 1
        },
      },
    ],
  };

  return <>
  <div className="biddingSlider py-4 mb-5">
    <div className="container">
      <div className="header d-flex align-items-center justify-content-between">
        <h4>Bidding Products</h4>
        {/* <h5 className='view-all main-blue-text'>View All</h5> */}
      </div>
      <div className="BestSlider-container position-relative">
        <Slider {...BiddingSettings} className='rounded '>
          {data?.data?.data?.data.map((product) => (
            <div key={product._id} className="slide-item slide-container brdr px-3 py-2 d-flex flex-column justify-content-between my-2">
              <p className='cardCategory me-auto'>Category</p>
              <div className="card-product-info d-flex flex-column justify-content-between flex-grow-1">
                <h6 className='cardProductName fw-bolder h-25'>{product.name}</h6>
                <img  className='img-fluid mb-2 flex-grow-1' src={'https://electrobile-souq.onrender.com/' + product.variants[0].imageCover} loading='lazy' alt={product.name + ' image'} />
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between w-100">
                <div className="prices">
                  <h5 className='font-Roboto fw-bold dark-grey-text'>                          
                    {product.priceDiscount.value > 0
                            ? product.priceDiscount.type === 'percentage'
                              ? product.price *
                                (product.priceDiscount.value / 100)
                              : product.price - product.priceDiscount.value
                            : product.price} JOD
                  </h5>
                  <h6 className='font-Roboto fw-bold main-orange-text'>{product.price - product.biddingGap} JOD</h6>
                </div>
                <div className="actionBtns position-relative">
                  <div className="toggleBtns">
                    <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1'><GoGitCompare/></button>
                    <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1 pb-2'><Icon className='p-0 m-0' icon={heart} size={22}></Icon></button>
                  </div>
                  <button className='go-Btn addCart-btn d-flex align-items-center justify-content-center ms-auto pb-2'><Icon className='p-0 m-0' icon={ic_local_mall} size={22}></Icon></button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </div>
  </>
}