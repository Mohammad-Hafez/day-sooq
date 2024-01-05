import React from 'react';
import { Carousel } from 'primereact/carousel';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsSlider({ products, slider }) {
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <>
    <div className="container">
      <Carousel
        value={products}
        numVisible={4}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={(product, index) => (
          <div key={index} className='h-100 px-2'>
            <ProductCard product={product} category={slider} />
          </div>
        )}
      />
      </div>
    </>
  );
}
