import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet'
import { cartContext } from '../../context/CartContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { ImgBaseURL } from '../ApiBaseUrl';
import { FaTrashAlt } from "react-icons/fa";

export default function WishList() {


  return <>
    <Helmet>
      <title>WishList</title>
    </Helmet>
    <div className="container">
      
    </div>
    </>
}
