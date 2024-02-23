import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { ApiBaseUrl } from '../ApiBaseUrl';
import Loader from '../Loader/Loader';
import ProductCard from '../ProductCard/ProductCard';

export default function BrandProducts() {
  let { brand , name } = useParams();
  const getBrandProducts = ()=>{
    return axios.get(ApiBaseUrl + `products?brand=${brand}`)
  }
  const { data, isLoading, isFetching } = useQuery(
    ['get-brand-products', brand],
    getBrandProducts ,
    {cacheTime : 3000}
  );
  
  let allProducts = data?.data.data.data;

  return <>
    <Helmet>
      <title>{name} Products</title>
    </Helmet>
    <div className="container">
    {isLoading || isFetching  ? <Loader/> :
        <div className="row my-4">
          {allProducts.map((product) => <div key={product._id} className="col-6 col-sm-4 col-md-3">
            <div className="p-3">
            <ProductCard product={product} category={'any'}/>
            </div>
            </div>
            )}
        </div>
  }
    </div>
    </>
}
