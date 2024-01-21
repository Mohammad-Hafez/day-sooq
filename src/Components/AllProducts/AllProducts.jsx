import React, { useEffect, useState } from 'react'
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
const [PageNum, setPageNum] = useState('1');
const [LimNum, setLimNum] = useState('8');
const [SortMethod, setSortMethod] = useState('-price');
const [selectedLimit, setSelectedLimit] = useState('30');
const [Category, setCategory] = useState(null)
const [Color, setColor] = useState(null)
const [Size, setSize] = useState(null)
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000000);
const [Status, setStatus] = useState(null)

const getAllProducts = ()=>{
  console.log('max price =>' + maxPrice);
  console.log('min price =>' + minPrice);
  return axios.get(ApiBaseUrl + `products?price[lt]=${maxPrice}&price[gt]=${minPrice}&page=${PageNum ? PageNum : '0'}&limit=${LimNum}&sort=${SortMethod}&${Category?`&category=${Category}`:null}`); 
}

let {data , isFetching , isLoading , refetch } = useQuery('get-products' , getAllProducts , {cacheTime : 3000})

const onPageChange = (event) => {
  const newPageNum = event.page + 1; 
  setPageNum(newPageNum.toString());
};

const limitOptions = [
  { label: '12', value: '12' },
  { label: '16', value: '16' },
  { label: '20', value: '20' },
];

const onLimitChange = (event) => {
  const newLimit = event.value;
  setLimNum(newLimit);
  setSelectedLimit(newLimit);
  
};

useEffect(()=>{
  if (data) {
      refetch();
  }
},[PageNum , LimNum , SortMethod , Category , Color ,Size , maxPrice , minPrice ,Status]);

  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    <div className="container">
      {isLoading && <Loader/> }
      <div className="row mt-3 mb-4 gy-3">
        <div className="col-3">
          <SideMenu maxPrice={maxPrice} minPrice={minPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCategory={setCategory} setColor={setColor} setStatus={setStatus} setSize={setSize}/>
        </div>
        <div className="col-9">
          <div className=" brdr rounded p-3 mb-3">
            <h2 className='m-0'>All Products</h2>
            <BsGrid3X3GapFill/>
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
          {data?.data.data.data.length === 0?<><h2>No Available Data</h2>
                    <Paginator
                      first={PageNum ? parseInt(PageNum, 10) - 1 : 1} 
                      rows={parseInt(1, 10)}
                      totalRecords={20}
                      onPageChange={onPageChange}
                    />
                    </>:
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
        }
        </div>
      </div>
      {isFetching && <Loader/>}
    </div>
    </>
}
