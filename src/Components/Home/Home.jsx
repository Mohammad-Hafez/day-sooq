import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import Loader from '../Loader/Loader'
import BiddingSlider from '../BiddingSlider/BiddingSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import StaticProducts from '../StaticProducts/StaticProducts'
import BrandsSlider from '../BrandsSlider/BrandsSlider'

export default function Home() {
  const [IsBannerLoading, setIsBannerLoading] = useState(false);
  const [IsBiddingSliderLoading, setIsBiddingSliderLoading] = useState(false);
  const [IsBrandSliderLoading, setIsBrandSliderLoading] = useState(false);
  const [IsFeaturedCategoriesLoading, setIsFeaturedCategoriesLoading] = useState(false);
  return <>
    <Helmet>
      <title>DAY SOOQ | HOME</title>
    </Helmet>
    {IsBannerLoading || IsBiddingSliderLoading || IsFeaturedCategoriesLoading ? <Loader/> : <>
    <MainSlider setIsBannerLoading={setIsBannerLoading}/>
    <BiddingSlider setIsBiddingSliderLoading={setIsBiddingSliderLoading}/>
    <CategorySlider setIsFeaturedCategoriesLoading={setIsFeaturedCategoriesLoading}/>
    <StaticProducts/>
    <BrandsSlider setIsBrandSliderLoading={setIsBrandSliderLoading}/>
    </>}
    </>
}
