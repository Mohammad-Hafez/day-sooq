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

export default function DealsSlider({setIsDealsSliderLoading}) {
  const getBigDeals = () => {
    return axios.get(ApiBaseUrl + `products/bigDeal?limit=10`);
  };

  const { data, isLoading } = useQuery('big-Deal-slider', getBigDeals, { cacheTime: 300000 });

  useEffect(() => {
    setIsDealsSliderLoading(isLoading);
  }, [isLoading, setIsDealsSliderLoading]);

  let DealsSettings = {
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <MdKeyboardArrowRight />,
    prevArrow: <MdKeyboardArrowLeft />,
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
          initialSlide: 2,
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
        <Slider {...DealsSettings} className='rounded'>
          {data?.data?.data?.data.map((product) => (
            <div key={product._id} className="slide-item slide-container brdr px-3 py-2 d-flex flex-column justify-content-between my-3">
              <p className='cardCategory me-auto'>Category</p>
              <div className="card-product-info mb-2">
                <h6 className='cardProductName fw-bolder'>{product?.name}</h6>
                <div className="slide-img over-flow-hidden">
                  <img  className='img-fluid h-100 w-100' src={'https://electrobile-souq.onrender.com/' + product?.variants[0]?.imageCover} loading='lazy' alt={product.name + ' image'} />
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between w-100">
                <div className="salePrice">
                  <h6 className='font-Roboto  dark-grey-text before-price'>
                    {product?.price} JOD</h6>
                  <h6 className='font-Roboto fw-bold pink-text'>
                    {product.priceDiscount.value > 0
                            ? product.priceDiscount.type === 'percentage'
                              ? product.price *
                                (product.priceDiscount.value / 100)
                              : product.price - product.priceDiscount.value
                            : product.price} JOD
                  </h6>
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
  );
}
