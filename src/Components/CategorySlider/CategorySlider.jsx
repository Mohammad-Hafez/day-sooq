import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl';
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';

export default function CategorySlider({ setIsFeaturedCategoriesLoading }) {
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
  ];

  let navigate = useNavigate();
  const getFeaturedCategories = () => {
    return axios.get(ApiBaseUrl + `categories`);
  };

  let { data, isLoading } = useQuery('categorySlider', getFeaturedCategories, {
    cacheTime: 300000,
  });

  useEffect(() => {
    setIsFeaturedCategoriesLoading(isLoading);
  }, [isLoading, setIsFeaturedCategoriesLoading]);

  const handleSelectCategory = (category) => {
    navigate(`CategoryProducts/${category?.name}/${category._id}`);
  };
  return (
    <div className="categoriesSec light-grey-bg p-3 mb-5">
      <div className="container">
        <div className="allCategoriesContainer position-relative">
          <div className="header">
            <h4>Categories</h4>
          </div>
          <div className="row align-itmes-stretch g-3 justify-content-center ">
                <Carousel
                  value={data?.data?.data?.data} 
                  numVisible={5}
                  numScroll={1}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={(product, index) => (
                    <div key={index} className='h-100 px-2'>
                      <div className="category-container bg-white text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center" onClick={() => { handleSelectCategory(product) }}>
                        <h6 className='font-roboto fw-bold mb-3'>{product.name}</h6>
                        <img src={ImgBaseURL + product?.image} loading='lazy' className='img-fluid flex-grow-1 mb-2 rounded object-fit-contain' alt={product.name + 'image'} />
                        <button className='go-Btn d-flex align-items-center justify-content-center ms-auto'><IoArrowForwardOutline /></button>
                      </div>
                    </div>
                  )}
                />
``          </div>
        </div>
      </div>
    </div>
  );
}
