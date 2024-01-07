import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import SideMenu from '../SideMenu/SideMenu';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';

export default function AllProducts() {
const [FilterMethod, setFilterMethod] = useState();
const [PageNum, setPageNum] = useState('1');
const [LimNum, setLimNum] = useState('30');
const [SortMethod, setSortMethod] = useState('-price');

const getAllProducts = ()=>{
  return axios.get(ApiBaseUrl + `products?page=${PageNum}&limit=${LimNum}&sort=${SortMethod}`); 
}
let {data , isFetching , isLoading , refetch } = useQuery('get-products' , getAllProducts , {cacheTime : 3000})

  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    <div className="container">
      <div className="row mt-3 mb-4 gy-3">
        <div className="col-3">
          <SideMenu setFilterMethod={setFilterMethod} FilterMethod={FilterMethod}/>
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-6 col-sm-4 col-md-3">
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}
