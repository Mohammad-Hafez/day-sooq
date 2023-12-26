import axios from 'axios';
import React, { useEffect } from 'react';
import ApiBaseUrl from '../ApiBaseUrl';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function BestSlider({ setIsBestSliderLoading }) {
  const getBestSellers = () => {
    return axios.get(ApiBaseUrl + `products/bestSelling?limit=10`);
  };

  const { data, isLoading } = useQuery('Best-selling-slider', getBestSellers, { cacheTime: 300000 });

  useEffect(() => {
    setIsBestSliderLoading(isLoading);
  }, [isLoading, setIsBestSliderLoading]);

  let settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
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
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="header">
        <h4>Bestsellers</h4>
      </div>
      <div className="BestSlider-container p-4">
        <Slider {...settings} className='rounded'>
          {data?.data?.data?.data.map((product) => (
            <div key={product.variant._id} className="slide-item">
              <h6>{product.variant.product.name}</h6>
              <img src={'https://electrobile-souq.onrender.com/' + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
