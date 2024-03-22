import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import SideMenu from '../SideMenu/SideMenu';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import Loader from '../Loader/Loader'
import ProductCard from '../ProductCard/ProductCard'
import { BsGrid3X3GapFill } from "react-icons/bs";
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
const [GridPage, setGridPage] = useState('col-12 col-sm-6 col-md-4 col-lg-3')
const getAllProducts = () => {
  const colorQueryParam = SelectedColors.length > 0 ? `&color=${SelectedColors.join(',')}` : '';
  return axios.get(
    ApiBaseUrl +
      `products?price[lt]=${maxPrice}&price[gt]=${minPrice}&isUsed=${IsUsed}${Size ? `&size=${Size}` : ''}&page=${PageNum ? PageNum : '0'}&limit=${LimNum}&sort=${SortMethod}${Category ? `&category=${Category}` : ''}${colorQueryParam}`
  );
};

let {data:AllProductsResponse , isLoading , refetch:AllProductsFetch } = useQuery('get-products' , getAllProducts , {cacheTime : 3000})

const onPageChange = (newPageNum) => {
  const totalPages = Math.ceil(AllProductsResponse?.data.numOfDocs / AllProductsResponse?.data.results);
  if (newPageNum >= 1 && newPageNum <= totalPages) {
    setPageNum(newPageNum.toString());
    AllProductsFetch();
  }
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
  const newLimit = event?.value;
  setLimNum(newLimit);
  setSelectedLimit(newLimit);
  AllProductsFetch();
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
  const selectedSort = event?.value;
  const [sortField] = selectedSort?.split('_');
  setSortMethod(sortField);
  AllProductsFetch();
};

useEffect(()=>{
  if (AllProductsResponse) {
    AllProductsFetch();
  }
},[PageNum , LimNum , SortMethod , Category , SelectedColors ,Size , maxPrice , minPrice ,IsUsed , onPageChange]);

  return <>
    <Helmet>
      <title>All Products</title>
    </Helmet>
    <div className="container allproducts">
      {isLoading? <Loader/> : 
      <div className="row mt-3 mb-4 gy-3">
        <div className="col-5 col-md-3">
          <SideMenu 
            setIsUsed={setIsUsed} IsUsed={IsUsed} setSize={setSize} SelectedColors={SelectedColors} 
            setSelectedColors={setSelectedColors} maxPrice={maxPrice} minPrice={minPrice} 
            setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCategory={setCategory}
            AllProductsFetch={AllProductsFetch}
          />
        </div>
        <div className="col-7 col-md-9">
          <div className=" brdr rounded p-3 mb-3">
            <h2 className='m-0'>All Products</h2>
            <hr />
            <div className="allProductsHeader d-flex align-items-center justify-content-around">
              <div className="grid-icons">
                <BsGrid3X3GapFill className='me-3 fs-3 light-grey-text cursor-pointer' onClick={()=>setGridPage('col-12 col-sm-6 col-md-3')}/>
                <FaThList className='fs-3 light-grey-text cursor-pointer' onClick={()=>setGridPage('col-12')}/>
              </div>
              <div className="allProductsSorting dropDowns d-flex w-75 justify-content-end align-items-center">
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
              {AllProductsResponse?.data.data.data?.length === 0?<h2>No Available Products</h2>
                :
                AllProductsResponse?.data.data.data?.map((product)=> <div key={product?._id} className={GridPage}>
                    <ProductCard product={product} GridPage={GridPage} category={product?.isAction? 'bidding' : 'any'}/>
                  </div>
                )
              }
              <div className='text-center py-3 font-quest d-flex align-items-center justify-content-center'>
                <span onClick={()=>onPageChange(Number(PageNum) - 1)}>
                  {(PageNum !=='1') && <i className="fa-solid fa-chevron-left fs-5 cursor-pointer mx-2 pt-1"></i> }
                </span>
                <span className='fs-4 fw-bold dark-grey-text'>
                {(PageNum !=='1') && Number(PageNum) - 1} <span className='main-orange-text mx-2'>{PageNum}</span> {AllProductsResponse?.data?.nextPage && (Number(PageNum) + 1)}
                </span>
                {AllProductsResponse?.data?.nextPage &&
                <span onClick={()=>onPageChange((Number(PageNum) + 1))}>
                  
                  <i className="fa-solid fa-chevron-right fs-5 cursor-pointer mx-2 pt-1"></i>
                </span>}
              </div>
        </div>
        </div>
      </div>
      }
    </div>
    </>
}
