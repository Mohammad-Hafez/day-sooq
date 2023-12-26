import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import ApiBaseUrl from '../ApiBaseUrl'
export default function BrandsSlider({setIsBrandSliderLoading}) {
  const getFeaturedBrands = ()=>{
    return axios.get(ApiBaseUrl + `brands`)  
  }
  
  let {data} = useQuery('featured-brands' , getFeaturedBrands , {cacheTime : 300000} )
  return <>
  <div className="brandSliderContainer pt-2 my-3">
    <div className="title text-center">
      <h4 className='font-Poppins main-orange-text'>Popular <span className='fw-bolder font-Rowdies'>Brands</span></h4>
    </div>
    <div className="container featuredBrandsContainer p-3">
      <div className="row g-3">
        {data?.data?.data?.data.map((brand)=> <div className="col-4 col-md-3 col-lg-2">
            <div key={brand._id} className='brand-container p-2 h-100 cursor-pointer'>
              <img src={ `https://electrobile-souq.onrender.com/`+brand.image} alt={brand.name} className='w-100 h-100 object-fit-contain'/>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    </>
}
