import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import PricesMenu from '../PricesMenu/PricesMenu';
import ColorsMenu from '../ColorsMenu/ColorsMenu';

export default function SideMenu({setCategory , setMaxPrice , setMinPrice , maxPrice , minPrice , SelectedColors , setSelectedColors}) {
  return <>
  <div className="sideMenu font-roboto">
    <CategoriesMenu setCategory={setCategory} axios={axios} useQuery={useQuery} ApiBaseUrl={ApiBaseUrl}/>
    <PricesMenu setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} maxPrice={maxPrice} minPrice={minPrice} />
    <ColorsMenu SelectedColors={SelectedColors} setSelectedColors={setSelectedColors}/>
  </div>
    </>
}
