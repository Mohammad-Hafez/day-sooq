import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import BrandsMenu from '../BrandsMenu/BrandsMenu';

export default function SideMenu() {

  return <>
  <div className="sideMenu font-roboto">
    <CategoriesMenu axios={axios} useQuery={useQuery} ApiBaseUrl={ApiBaseUrl}/>
    <BrandsMenu axios={axios} useQuery={useQuery} ApiBaseUrl={ApiBaseUrl}/>
  </div>
    </>
}
