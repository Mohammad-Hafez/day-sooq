import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import PricesMenu from '../PricesMenu/PricesMenu';

export default function SideMenu({setFilterMethod , FilterMethod , setCategory}) {
  return <>
  <div className="sideMenu font-roboto">
    <CategoriesMenu setCategory={setCategory} axios={axios} useQuery={useQuery} ApiBaseUrl={ApiBaseUrl}/>
    <PricesMenu FilterMethod={FilterMethod} setFilterMethod={setFilterMethod}/>
  </div>
    </>
}
