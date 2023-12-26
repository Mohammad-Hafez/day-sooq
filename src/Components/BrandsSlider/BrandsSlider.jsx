import axios from 'axios'
import React , {useEffect} from 'react'
import { useQuery } from 'react-query'
import ApiBaseUrl from '../ApiBaseUrl'
export default function BrandsSlider({setIsBrandSliderLoading}) {
  const getFeaturedBrands = ()=>{
    return axios.get(ApiBaseUrl + `brands`)  
  }
  
  let {data , isLoading} = useQuery('featured-brands' , getFeaturedBrands , {cacheTime : 300000} );

  useEffect(() => {
    setIsBrandSliderLoading(isLoading);
  }, [isLoading, setIsBrandSliderLoading]);
  
  return <>
  <div className="brandSliderContainer pt-2 mb-5">
    <div className="title text-center">
      <h4 className='font-Poppins main-orange-text'>Popular <span className='fw-bolder font-Rowdies'>Brands</span></h4>
    </div>
    <div className="container brdr featuredBrandsContainer p-3">
      <div className="row g-3">
        {data?.data?.data?.data.map((brand)=> <div key={brand._id} className="col-4 col-md-3 col-lg-2">
            <div className='brand-container p-2 h-100 cursor-pointer'>
              <img src={ `https://electrobile-souq.onrender.com/`+brand.image} alt={brand.name} className='w-100 h-100 object-fit-contain'/>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
    </>
}
