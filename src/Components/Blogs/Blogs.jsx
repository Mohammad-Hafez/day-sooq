import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import ApiBaseUrl from '../ApiBaseUrl'
import Slider from 'react-slick';

export default function Blogs({setIsBlogsLoading}) {
  let BestSettings = {
    Infinity : false ,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
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
          slidesToShow: 1,
          initialSlide: 2
        },
      },
    ],
  };

  const getBlogs = ()=>{
    return axios.get(ApiBaseUrl + `blogs`)
  }
  let {data , isLoading} = useQuery('Blogs-Slider' , getBlogs)
  useEffect(()=>{
    setIsBlogsLoading(isLoading)},
    [isLoading , setIsBlogsLoading])
  return <>
  <div className="review-slider-Container light-grey-bg mb-5">
    <div className="container">

    </div>
  </div>
    </>
}
