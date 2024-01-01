import React from 'react'
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsSlider({products , settings , slider}) {
  return <>
        <Slider {...settings} className='rounded'>
          {products?.map((product , index) => <ProductCard product={product} key={index} category={slider}/> )}
        </Slider>

    </>
}
