import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet'
import { cartContext } from '../../context/CartContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { ImgBaseURL } from '../ApiBaseUrl';
import { FaTrashAlt } from "react-icons/fa";
import { WishListContext } from '../../context/WishListContext';
import { IoBagAddSharp } from "react-icons/io5";

export default function WishList() {

const {addToCart} = useContext(cartContext);

const {getLoggedWishlist} = useContext(WishListContext);

let {data , isLoading , isFetching , refetch} = useQuery('get-my-fav' , getLoggedWishlist );

const favorites = data?.data.data.favorites;

return <>
    <Helmet>
      <title>WishList</title>
    </Helmet>
    {isLoading && <Loader/> }
    {data && 
    <div className="container my-3">
      <p className='main-grey-text'>Wishlist</p>
      <div className="px-1 w-75 mx-auto">
        <h5 className='main-orange-text ms-2 font-Poppins fw-bolder'>Wishlist</h5>
        {favorites?.map((item)=> <div key={item._id} className="fav-item">
          <div className="fav-container blue-brdr rounded-4 p-3 font-roboto mb-3">
              <div className="row g-2">
                <div className="col-sm-2">
                  <div className="cartItemImage brdr p-2 rounded">
                    <img src={ImgBaseURL + item.product.variants[0].imageCover} alt={item.product.name + 'image'} className='img-fluid rounded' loading='lazy' />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="cartItemData d-flex flex-column justify-content-between py-2 h-100">
                    <h6 className='m-0 light-blue-text fw-bolder'>{item.product.name }</h6>
                    <h6>Rate</h6>
                    {item.product?.description?.split(',').map((item, index) => <li className='mb-1 ms-1' key={index}>{item.trim()}</li> )}
                  </div>
                </div>
                <div className="col-sm-2  d-flex flex-column align-items-center justify-content-between">
                    <div className="deleteItem text-center">
                        <span className='dark-red-text cursor-pointer' ><FaTrashAlt/></span>
                      </div>
                      <h5 className='m-0 dark-grey-text fw-bolder'>
                      {item.product.priceDiscount.value > 0
                            ? item.product.priceDiscount.type === 'percentage'
                              ? (item.product.price + item.product.variants[0].extraPrice) *
                                (item.product.priceDiscount.value / 100)
                              : (item.product.price + item.product.variants[0].extraPrice) - item.product.priceDiscount.value
                        :(item.product.price + item.product.variants[0].extraPrice)} JOD
                        </h5>
                      <button className='btn-orange rounded-pill py-2 w-100' onClick={()=>{addToCart(item.product.variants[0]._id , 1)}}>Add To Cart <IoBagAddSharp className='pb-1 fs-4'/></button>
                </div>
              </div>
            </div>
          </div>
          )}
      </div>
    </div>
}
    {isFetching && <Loader/>}
    </>
}
