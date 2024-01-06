import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function CategorySlider({setIsFeaturedCategoriesLoading}) {
  let navigate = useNavigate()
  const getFeaturedCategories = ()=>{
    return axios.get(ApiBaseUrl + `categories`)
  }
  let { data , isLoading } = useQuery('categorySlider' , getFeaturedCategories ,{
    cacheTime : 300000  ,
  });
     
    useEffect(() => {
      setIsFeaturedCategoriesLoading(isLoading);
    }, [isLoading, setIsFeaturedCategoriesLoading]);
  
    const handleSelectCategory = (category) =>{
      navigate(`CategoryProducts/${category}`)
    }
  return <>
  <div className="categoriesSec light-grey-bg p-3 mb-5">
    <div className="container">
      <div className="allCategoriesContainer">
        <div className="header">
          <h4>Categories</h4>
        </div>
        <div className="row align-itmes-stretch g-3 justify-content-center">
          {data?.data?.data?.data.map((category )=> <div className="col-6 col-md-4 col-lg-3" key={category.id}>
              <div className="category-container bg-white text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center" onClick={()=>{handleSelectCategory(category.name)}}>
                <h6 className='font-roboto fw-bold mb-3'>{category.name}</h6>
                <img src={ImgBaseURL + category.image} loading='lazy' className='img-fluid flex-grow-1 mb-2 rounded' alt={category.name + 'image'}/>
                <button className='go-Btn d-flex align-items-center justify-content-center ms-auto'><IoArrowForwardOutline /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
    </>
}
