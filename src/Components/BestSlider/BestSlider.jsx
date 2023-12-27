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

export default function BestSlider({ setIsBestSliderLoading }) {
  const getBestSellers = () => {
    return axios.get(ApiBaseUrl + `products/bestSelling?limit=10`);
  };

  const { data, isLoading } = useQuery('Best-selling-slider', getBestSellers, { cacheTime: 300000 });

  useEffect(() => {
    setIsBestSliderLoading(isLoading);
  }, [isLoading, setIsBestSliderLoading]);

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

  return (
    <div className="container mb-5">
      <div className="header">
        <h4>Bestsellers</h4>
      </div>
      <div className="BestSlider-container position-relative">
        <Slider {...BestSettings} className='rounded'>
          {data?.data?.data?.data.map((product) => (
            <div key={product.variant._id} className="slide-item slide-container brdr px-3 py-2 d-flex flex-column justify-content-between">
              <p className='cardCategory me-auto'>Category</p>
              <div className="card-product-info">
                <h6 className='cardProductName fw-bolder'>{product.variant.product.name}</h6>
                <img  className='img-fluid mb-2' src={'https://electrobile-souq.onrender.com/' + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} />
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between w-100">
                <h6 className='font-Roboto fw-bold dark-grey-text'>{product.variant.product.price} JOD</h6>
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
