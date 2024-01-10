import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import Loader from '../Loader/Loader'
import BiddingSlider from '../BiddingSlider/BiddingSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import StaticProducts from '../StaticProducts/StaticProducts'
import BrandsSlider from '../BrandsSlider/BrandsSlider'
import BestSlider from '../BestSlider/BestSlider'
import DealsSlider from '../DealsSlider/DealsSlider'
import Blogs from '../Blogs/Blogs'
import EmailTab from '../EmailTab/EmailTab'

export default function Home() {
  const [IsBannerLoading, setIsBannerLoading] = useState(false);
  const [IsBiddingSliderLoading, setIsBiddingSliderLoading] = useState(false);
  const [IsBrandSliderLoading, setIsBrandSliderLoading] = useState(false);
  const [IsBestSliderLoading, setIsBestSliderLoading] = useState(false);
  const [IsDealsSliderLoading, setIsDealsSliderLoading] = useState(false);
  const [IsFeaturedCategoriesLoading, setIsFeaturedCategoriesLoading] = useState(false);
  const [IsBlogsLoading, setIsBlogsLoading] = useState(false);
  
  return <>
    <Helmet>
      <title>DAY SOOQ | HOME</title>
    </Helmet>
    <MainSlider setIsBannerLoading={setIsBannerLoading}/> 
    <BiddingSlider setIsBiddingSliderLoading={setIsBiddingSliderLoading}/>
    <CategorySlider setIsFeaturedCategoriesLoading={setIsFeaturedCategoriesLoading}/>
    <StaticProducts/>
    <BrandsSlider setIsBrandSliderLoading={setIsBrandSliderLoading}/>
    <BestSlider setIsBestSliderLoading={setIsBestSliderLoading}/>
    <DealsSlider setIsDealsSliderLoading={setIsDealsSliderLoading}/>
    <Blogs setIsBlogsLoading={setIsBlogsLoading}/>
    <EmailTab/>
    {IsBannerLoading || IsBiddingSliderLoading || IsFeaturedCategoriesLoading || IsBrandSliderLoading || IsBestSliderLoading || IsDealsSliderLoading || IsBlogsLoading ? <Loader/> : <></>}
    </>
}
