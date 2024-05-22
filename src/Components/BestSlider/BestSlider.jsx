import axios from 'axios';
import React, { useEffect } from 'react';
import {ApiBaseUrl} from '../ApiBaseUrl'
import { useQuery } from 'react-query';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ProductsSlider from '../ProductsSlider/ProductsSlider';

export default function BestSlider({ setIsBestSliderLoading }) {
  const getBestSellers = () => {
    return axios.get(ApiBaseUrl + `products/bestSelling?limit=10`);
  };

  const { data, isLoading } = useQuery('Best-selling-slider', getBestSellers, { cacheTime: 300000 });

  useEffect(() => {
    setIsBestSliderLoading(isLoading);
  }, [isLoading, setIsBestSliderLoading]);

  let BestSettings = {
    infinite: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
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
          initialSlide: 0,
        },
      },
    ],
  };

  let products = data?.data?.data?.data ;

  return (
    <div className="container mb-5 position-relative">
      <div className="header">
        <h4>Best sellers</h4>
      </div>
      <div className="BestSlider-container">
        <ProductsSlider products={products} settings={BestSettings} slider={'best-selling'}/>
      </div>
    </div>
  );
}
