import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { ApiBaseUrl } from '../ApiBaseUrl'
import ProductCard from '../ProductCard/ProductCard'
export default function SimilarProduct({subCategory}) {
  const getSimilarProducts = ()=> axios.get(ApiBaseUrl + `subCategories/${subCategory}/products`)
  let {data} = useQuery('similar-products' , getSimilarProducts , {cacheTime :1})
  let similarProducts = data?.data?.data?.data.slice(0,4)
  return <>
  <div className="similar">
    <div className="row">
      {similarProducts?.map((product , index)=> <div key={product._id} className="col-6 col-md-3">
        <div className="similar-container p-3">
          <ProductCard product={product} category={'similar'}/>
        </div>
      </div>
      )}
    </div>
  </div>
    </>
}
