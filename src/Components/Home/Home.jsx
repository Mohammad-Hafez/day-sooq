import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import Loader from '../Loader/Loader'
import BiddingSlider from '../BiddingSlider/BiddingSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import StaticProducts from '../StaticProducts/StaticProducts'

export default function Home() {
  const [IsLoading, setIsLoading] = useState(false)
  return <>
    <Helmet>
      <title>DAY SOOQ | HOME</title>
    </Helmet>
    {IsLoading ? <Loader/> : <>
    <MainSlider setIsLoading={setIsLoading}/>
    <BiddingSlider setIsLoading={setIsLoading}/>
    <CategorySlider setIsLoading={setIsLoading}/>
    <StaticProducts setIsLoading={setIsLoading}/>
    </>}
    </>
}
