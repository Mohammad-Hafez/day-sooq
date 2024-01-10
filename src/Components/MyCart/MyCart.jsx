import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/CartContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { ImgBaseURL } from '../ApiBaseUrl';
import { FaPlus, FaMinus } from 'react-icons/fa';
import CartSummary from '../CartSummary/CartSummary';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function MyCart() {

  let navigate = useNavigate()

  let {getLoggedUserCart , updateProductCount , removeItem } = useContext(cartContext);

  let {data , isLoading ,isFetching , refetch} = useQuery('get-my-cart' , getLoggedUserCart );

  let cartItems = data?.data.data.data;

  const [productCounts, setProductCounts] = useState({});

  const incrementCount = (item) => {
    const currentCount = productCounts[item._id] || item.quantity;
    const newCount = currentCount + 1;
    if (newCount <= item.variant.quantity) {
      setProductCounts({ ...productCounts, [item._id]: newCount });
      updateProductCount(item._id , item.variant._id , newCount)
    }
  };

  const decrementCount = (item) => {
    const currentCount = productCounts[item._id] || item.quantity;
    const newCount = currentCount - 1;
    if (currentCount > 0) {
      setProductCounts({ ...productCounts, [item._id]: newCount});
      updateProductCount(item._id , item.variant._id , newCount)
    }
  };

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
      <title>SHOPPING CART</title>
    </Helmet>
    {isLoading ? <Loader/>: <>
    {data &&     <div className="container mt-2 mb-4">
      <p className='main-grey-text'>Cart</p>
      <div className="row">
        <h5 className='main-orange-text ms-2 font-Poppins fw-bolder'>YOUR CART</h5>
        
        <div className="col-md-8 mb-3">
          <div className="cart-container brdr p-3 font-roboto">
            {cartItems.length === 0 && <h3 className='light-blue-text'>Explore our products & add items to your cart.</h3>}
            {cartItems.map((item)=> <div key={item._id} className="cart-item m-2 mb-3 brdr border-0 border-bottom pb-3 rounded-0">
              <div className="row g-2">
                <div className="col-sm-2">
                  <div className="cartItemImage brdr p-2 rounded">
                    <img onClick={()=> navigate(`/ProductDetails/${item.variant.product._id}`)} src={ImgBaseURL + item.variant.imageCover} alt={item.variant.product.name + 'image'} className='img-fluid rounded cursor-pointer' loading='lazy' />
                  </div>
                </div>
                <div className="col-sm-10">
                  <div className="cartItemData d-flex flex-column justify-content-between py-2 h-100">
                    <div className="itemName d-flex align-items-start justify-content-between">
                      <div className="name">
                        <h6 className='m-0 light-blue-text fw-bolder cursor-pointer' onClick={()=> navigate(`/ProductDetails/${item.variant.product._id}`)} >{item.variant.product.name}</h6>
                        <p className='m-0'>Color : {item.variant.color}</p>
                      </div>
                      <div className="deleteItem">
                        <span className='dark-red-text cursor-pointer' onClick={() => deleteItem(item._id)}><FaTrashAlt/></span>
                      </div>
                    </div>
                    <div className="itemPrice d-flex align-items-start justify-content-between">
                      <h6 className='m-0 dark-grey-text'> {(item.price + item.variant.extraPrice) * (productCounts[item._id] || item.quantity) } JOD</h6>
                      <div className='brdr d-flex align-items-center justify-content-between px-3 py-1 light-grey-bg'>
                        <span className='cursor-pointer'><FaPlus onClick={() => incrementCount(item)} size={15}/></span>
                        <span className='mx-4'>{productCounts[item._id] || item.quantity}</span>
                        <span className='cursor-pointer'><FaMinus onClick={() => decrementCount(item)} size={15} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
        <div className="col-md-4">
          {cartItems && <CartSummary itemsNum={cartItems.length}/> }
        </div>
      </div>
    </div>
    }
    </>}
    {isFetching && <Loader />}
    </>
}
