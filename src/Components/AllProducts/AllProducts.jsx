import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import SideMenu from '../SideMenu/SideMenu';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import Loader from '../Loader/Loader'
import ProductCard from '../ProductCard/ProductCard'
import { BsGrid3X3GapFill } from "react-icons/bs";
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';

export default function AllProducts() {
const [FilterMethod, setFilterMethod] = useState();
const [PageNum, setPageNum] = useState('1');
const [LimNum, setLimNum] = useState('30');
const [SortMethod, setSortMethod] = useState('-price');
const [selectedLimit, setSelectedLimit] = useState('30');
const getAllProducts = ()=>{
  return axios.get(ApiBaseUrl + `products?page=${PageNum}&limit=${LimNum}&sort=${SortMethod}`); 
}
let {data , isFetching , isLoading , refetch } = useQuery('get-products' , getAllProducts , {cacheTime : 3000})

const onPageChange = (event) => {
  const newPageNum = event.page + 1; // PrimeReact Paginator uses 0-based indexing
  setPageNum(newPageNum.toString());
  refetch();
};

const limitOptions = [
  { label: '12', value: '12' },
  { label: '16', value: '16' },
  { label: '20', value: '20' },
  // Add more options as needed
];

const onLimitChange = (event) => {
  const newLimit = event.value;
  setLimNum(newLimit);
  setSelectedLimit(newLimit);
  refetch();
};
  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    <div className="container">
      {isLoading && <Loader/> }
      <div className="row mt-3 mb-4 gy-3">
        <div className="col-3">
          <SideMenu setFilterMethod={setFilterMethod} FilterMethod={FilterMethod}/>
        </div>
        <div className="col-9">
          <div className=" brdr rounded p-3 mb-3">
            <h2 className='m-0'>All Products</h2>
            <div className="p-float-label mt-4">
            <Dropdown
              id='limitNum'
              value={selectedLimit }
              options={limitOptions}
              onChange={onLimitChange}
              placeholder="Product / Page"
              className='rounded-pill p-0 light-grey-text'
              
            />
          </div>
          </div>
          <div className="row gy-3">
            {data?.data.data.data.map((product)=> <div key={product?._id} className="col-6 col-sm-4 col-md-3">
                <ProductCard product={product} category={product?.isAction? 'bidding' : 'any'}/>
              </div>
            )}
             <Paginator
              first={PageNum ? parseInt(PageNum, 10) - 1 : 1} 
              rows={parseInt(1, 10)}
              totalRecords={20}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
      {isFetching && <Loader/>}
    </div>
    </>
}
