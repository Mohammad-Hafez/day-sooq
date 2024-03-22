import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { ApiBaseUrl } from '../ApiBaseUrl'
import ProductCard from '../ProductCard/ProductCard'
export default function SimilarProduct({cat , currentProduct}) {
  const getSimilarProducts = ()=> axios.get(ApiBaseUrl + `products?category=${cat}`)
  let {data} = useQuery('similar-products' , getSimilarProducts , {cacheTime :1000})
  let similarProducts = data?.data?.data?.data.filter(product => product._id !== currentProduct).slice(0,4)
  return <>
  <div className="similar">
    <div className="row">
    {similarProducts && <h6 className='main-orange-text mb-0'>Similar Products :</h6>}
      {similarProducts?.map((product , index)=> <div key={product._id} className="col-6 col-md-4 col-lg-3">
        <div className="similar-container py-3 ">
          <ProductCard product={product} category={'similar'}/>
        </div>
      </div>
      )
      }
    </div>
  </div>
    </>
}
