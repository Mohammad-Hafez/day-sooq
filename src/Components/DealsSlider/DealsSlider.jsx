import axios from 'axios';
import React, { useEffect } from 'react';
import {ApiBaseUrl} from '../ApiBaseUrl'
import { useQuery } from 'react-query';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ProductsSlider from '../ProductsSlider/ProductsSlider'; 

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
          initialSlide: 2,
        },
      },
    ],
  };

  let products = data?.data?.data?.data
  return (
    <div className="container mb-5 position-relative">
      <div className="header">
        <h4>Big Deals</h4>
      </div>
      <div className="BestSlider-container">
          <ProductsSlider products={products} settings={DealsSettings} slider={'big-deals'}/>
      </div>
    </div>
  );
}
