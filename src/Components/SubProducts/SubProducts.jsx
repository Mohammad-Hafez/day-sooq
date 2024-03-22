import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { ApiBaseUrl } from '../ApiBaseUrl';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';

export default function SubProducts() {
  let { category ,subCat, id } = useParams();
  const getSubCategoryProducts = ()=>{
    return axios.get(ApiBaseUrl + `subCategories/${id}/products`)
  }
  const { data, isLoading, isFetching } = useQuery(
    ['get-subCategory-products', subCat],
    getSubCategoryProducts ,
    {cacheTime : 3000}
  );
  
  let allProducts = data?.data.data.data;
  return <>
    <Helmet>
      <title>{subCat} Products</title>
    </Helmet>
    <div className="container px-5">
    {isLoading ? <Loader/> : <>
    {data && <div className="row mt-3 mb-4 gy-3">
        {allProducts.map((product) => <div key={product._id} className="col-6 col-sm-4 col-md-3">
          <ProductCard product={product} category={category === 'auction' ? 'bidding' : 'any'}/>
          </div>
          )}
    </div>
    }
    </>
  }
    </div>
    </>
}
