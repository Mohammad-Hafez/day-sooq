import React, { useEffect } from 'react';
import Slider from "react-slick";
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl';

export default function MainSlider({ setIsBannerLoading }) {
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

  const getBanners = () => {
    return axios.get(ApiBaseUrl + `banners`);
  };

  let { data, isLoading } = useQuery('mainBanner', getBanners);

  useEffect(() => {
    setIsBannerLoading(isLoading);
  }, [isLoading, setIsBannerLoading]);

  const sliderData = data?.data?.data?.data.filter(item => item.type === 'slider');

  return (
    <div className="container mainSlider position-relative mb-3">
      <Slider {...settings} className='rounded'>
        {sliderData && sliderData.map((item, index) => (
          <div key={index}>
            <img src={ImgBaseURL + item.image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
