import React from 'react' ;
import Navbar from '../Navbar/Navbar';
import TopHeaderInfo from '../TopHeaderInfo/TopHeaderInfo';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';

export default function Header({UserToken}) {

  const getAllCategories =  () =>axios.get(ApiBaseUrl + `categories`);

  let {data} = useQuery('categories-name' , getAllCategories , {cacheTime : 30000})

  return<>
  <div className="container d-flex flex-column justify-content-center">
    <TopHeaderInfo/>
  </div>
  <div className="container mb-3 position-sticky top-0 z-3 bg-white py-2 rounded-bottom">
    <HeaderSearch UserToken={UserToken} categories={data?.data?.data?.data}/>
  </div>

  <Navbar  categories={data?.data?.data?.data}/>
  </>
}
