import React from 'react'
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsSlider({products , settings , slider}) {
  return <>
        <Slider {...settings} className='rounded'>
          {products?.map((product) => <ProductCard product={product} category={slider}/> )}
        </Slider>

    </>
}
