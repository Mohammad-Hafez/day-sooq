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
import { FaThList } from "react-icons/fa";

export default function AllProducts() {
const [PageNum, setPageNum] = useState('1');
const [LimNum, setLimNum] = useState('8');
const [SortMethod, setSortMethod] = useState('-price');
const [selectedLimit, setSelectedLimit] = useState(12);
const [Category, setCategory] = useState(null)
const [SelectedColors, setSelectedColors] = useState([]);
const [Size, setSize] = useState()
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000000);
const [IsUsed, setIsUsed] = useState(false)
const [GridPage, setGridPage] = useState('col-6 col-sm-4 col-md-3')
const getAllProducts = () => {
  const colorQueryParam = SelectedColors.length > 0 ? `&color=${SelectedColors.join(',')}` : '';
  return axios.get(
    ApiBaseUrl +
      `products?price[lt]=${maxPrice}&price[gt]=${minPrice}&isUsed=${IsUsed}${Size ? `&size=${Size}` : ''}&page=${PageNum ? PageNum : '0'}&limit=${LimNum}&sort=${SortMethod}${Category ? `&category=${Category}` : ''}${colorQueryParam}`
  );
};

let {data , isFetching , isLoading , refetch } = useQuery('get-products' , getAllProducts , {cacheTime : 3000})

const onPageChange = (event) => {
  const newPageNum = event.page + 1; 
  setPageNum(newPageNum.toString());
};

const limitOptions = [
  { label: '8', value: '8' },
  { label: '12', value: '12' },
  { label: '16', value: '16' },
  { label: '20', value: '20' },
  { label: '32', value: '32' },
  { label: '40', value: '40' },
];
const onLimitChange = (event) => {
  const newLimit = event.value;
  setLimNum(newLimit);
  setSelectedLimit(newLimit);
  
};


const sortOptions = [
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Name (Z-A)', value: '-name' },
  { label: 'Price (Low to High)', value: 'price' },
  { label: 'Price (High to Low)', value: '-price' },
  { label: 'Rating (Low to High)', value: 'rating' },
  { label: 'Rating (High to Low)', value: '-rating' },
];

const onSortChange = (event) => {
  const selectedSort = event.value;
  const [sortField, sortOrder] = selectedSort.split('_');

  setSortMethod(sortField);
};

useEffect(()=>{
  if (data) {
      refetch();
  }
},[PageNum , LimNum , SortMethod , Category , SelectedColors ,Size , maxPrice , minPrice ,IsUsed]);

  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    <div className="container">
      {isLoading && <Loader/> }
      <div className="row mt-3 mb-4 gy-3">
        <div className="col-3">
          <SideMenu 
            setIsUsed={setIsUsed} IsUsed={IsUsed} setSize={setSize} SelectedColors={SelectedColors} 
            setSelectedColors={setSelectedColors} maxPrice={maxPrice} minPrice={minPrice} 
            setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCategory={setCategory}
          />
        </div>
        <div className="col-9">
          <div className=" brdr rounded p-3 mb-3">
            <h2 className='m-0'>All Products</h2>
            <hr />
            <div className="d-flex align-items-center justify-content-around">
              <div className="grid-icons">
                <BsGrid3X3GapFill className='me-3 fs-3 light-grey-text cursor-pointer' onClick={()=>setGridPage('col-6 col-sm-4 col-md-3')}/>
                <FaThList className='fs-3 light-grey-text cursor-pointer' onClick={()=>setGridPage('col-12')}/>
              </div>
              <div className="dropDowns d-flex w-75 justify-content-end align-items-center">
              <div className=" mt-4 me-2 w-25">
                <Dropdown id='limitNum' value={selectedLimit } options={limitOptions}
                onChange={onLimitChange} placeholder="Products" className='rounded-pill p-0 light-grey-text w-100' />
              </div>
              <div className=" mt-4 w-25">
                <Dropdown
                  id='sortMethod'
                  value={`${SortMethod}`}
                  options={sortOptions}
                  onChange={onSortChange}
                  placeholder="Sort By"
                  className='rounded-pill p-0 light-grey-text w-100'
                />
              </div>
              </div>
            </div>
          </div>
          <div className="row gy-3">
              {data?.data.data.data.length === 0?<h2>No Available Products</h2>
                :
                data?.data.data.data.map((product)=> <div key={product?._id} className={GridPage}>
                    <ProductCard product={product} GridPage={GridPage} category={product?.isAction? 'bidding' : 'any'}/>
                  </div>
                )
              }
            <Paginator first={PageNum ? parseInt(PageNum, 10) - 1 : 1} rows={parseInt(1, 10)} totalRecords={20} onPageChange={onPageChange} />
        </div>
        </div>
      </div>
      {isFetching && <Loader/>}
    </div>
    </>
}
