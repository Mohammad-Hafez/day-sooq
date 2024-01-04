import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet'
import { cartContext } from '../../context/CartContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { ImgBaseURL } from '../ApiBaseUrl';
import { FaTrashAlt } from "react-icons/fa";

export default function WishList() {

  let {getLoggedUserCart , updateProductCount , removeItem , setNumbOfCartItems} = useContext(cartContext);

  let {data , isLoading ,isFetching , refetch} = useQuery('get-my-cart' , getLoggedUserCart );

  let cartItems = data?.data.data.data;

  if (data) {
    setNumbOfCartItems(data?.data?.data.data.length);
  }
  const deleteItem = async (itemId) => {
    try {
      await removeItem(itemId);
      refetch();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return <>
    <Helmet>
      <title>WishList</title>
    </Helmet>
    <div className="container mt-2 mb-4">
      <p className='main-grey-text'>Wishlist</p>
      <div className="row">
        <h5 className='main-orange-text ms-2'>YOUR CART</h5>
        <div className="col-md-8">
          <div className="cart-container brdr p-3">
            {cartItems.map((item)=> <div key={item._id} className="cart-item m-2 mb-3 brdr border-0 border-bottom pb-3 rounded-0">
              <div className="row g-2">
                <div className="col-sm-2">
                  <div className="cartItemImage brdr p-2 rounded">
                    <img src={ImgBaseURL + item.variant.imageCover} alt={item.variant.product.name + 'image'} className='img-fluid rounded' loading='lazy' />
                  </div>
                </div>
                <div className="col-sm-10">
                  <div className="cartItemData d-flex flex-column justify-content-between py-2 h-100">
                    <div className="itemName d-flex align-items-start justify-content-between">
                      <div className="name">
                        <h6 className='m-0 dark-grey-text'>{item.variant.product.name}</h6>
                        <p className='m-0'>Color : {item.variant.color}</p>
                      </div>
                      <div className="deleteItem">
                        <span className='dark-red-text cursor-pointer' onClick={() => deleteItem(item._id)}><FaTrashAlt/></span>
                      </div>
                    </div>
                    <div className="itemPrice d-flex align-items-start justify-content-between">
                      <h6 className='m-0 dark-grey-text'> {item.price + item.variant.extraPrice } JOD</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>

    </>
}
