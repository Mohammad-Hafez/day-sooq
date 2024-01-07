import axios from 'axios'
import React , {useEffect} from 'react'
import { useQuery } from 'react-query'
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import { useNavigate } from 'react-router-dom'

export default function BrandsSlider({setIsBrandSliderLoading}) {
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
        {data?.data?.data?.data.map((brand)=> <div key={brand._id} className="col-4 col-md-3 col-lg-2">
            <div className='brand-container p-2 h-100 cursor-pointer' onClick={()=> handleSelectBrand(brand)}>
              <img src={ ImgBaseURL+brand.image} alt={brand.name} className='w-100 h-100 object-fit-contain'/>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    </>
}
