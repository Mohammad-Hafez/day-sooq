import axios from 'axios'
import React , {useEffect} from 'react'
import { useQuery } from 'react-query'
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'primereact/carousel';

export default function BrandsSlider({setIsBrandSliderLoading}) {
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

  let navigate = useNavigate()
  const getFeaturedBrands = ()=>{
    return axios.get(ApiBaseUrl + `brands`)  
  }
  
  let {data , isLoading} = useQuery('featured-brands' , getFeaturedBrands , {cacheTime : 300000} );

  useEffect(() => {
    setIsBrandSliderLoading(isLoading);
  }, [isLoading, setIsBrandSliderLoading]);
  
  const handleSelectBrand = (brand) =>{
    navigate(`BrandProducts/${brand._id}/${brand.name}`)
  }

  return <>
  <div className="brandSliderContainer pt-2 mb-5 position-relative">
    <div className="title text-center">
      <h4 className='font-Poppins main-orange-text'>Popular <span className='fw-bolder font-Rowdies'>Brands</span></h4>
    </div>
    <div className="container brdr featuredBrandsContainer p-3">
      <div className="row g-3">
                        <Carousel
                  value={data?.data?.data?.data} 
                  numVisible={6}
                  numScroll={2}
                  responsiveOptions={responsiveOptions}
                  itemTemplate={(product, index) => (
                    <div key={index} className='h-100 px-2'>
                      <div className="category-container bg-white text-center p-3 h-100 d-flex flex-column justify-content-center align-items-center" onClick={() => { handleSelectBrand(product) }}>
                        <img src={ImgBaseURL + product?.image} loading='lazy' className='img-fluid flex-grow-1 mb-2 rounded object-fit-contain' alt={product.name + 'image'} />
                      </div>
                    </div>
                  )}
                />

      </div>
    </div>
  </div>
    </>
}
