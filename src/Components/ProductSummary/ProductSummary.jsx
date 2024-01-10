import React, { useContext, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { cartContext } from '../../context/CartContext';
import { IoBagAddSharp } from "react-icons/io5";
import {heart} from 'react-icons-kit/ionicons/heart'
import { Icon } from 'react-icons-kit'
import { WishListContext } from '../../context/WishListContext'

export default function ProductSummary({ product, quantity , SelectedVariant }) {
  const { addToCart } = useContext(cartContext);
  const {addToFav} = useContext(WishListContext)

  const [productCount, setProductCount] = useState(1);

  const incrementCount = () => {
    if (productCount < quantity) {
      setProductCount(productCount + 1);
    }
  };

  const decrementCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  return (
    <>
      <div className="p-summary">
        <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start font-Poppins">
          <div className="delivery d-flex align-items-center justify-content-between w-100 mb-3">
            <p className='m-0 light-grey-text'>Delivery :</p>
            <div className="free-badge light-gtreen-bg px-2 rounded-pill">
              <span className=''>free</span>
            </div>
          </div>
          <button className='w-100 grey-outline-btn mb-4 py-2 fs-5 d-flex align-items-center justify-content-center addToFavBtn' onClick={()=> addToFav(product._id)}><span>Wishlist</span> <Icon className='ms-2 heart' icon={heart} size={22}></Icon></button>
          <h4 className='main-grey-text mb-3'>
            Total Price : 
            <span className='ms-1 dark-grey-text'>
              {product?.priceDiscount?.value > 0
                ? product?.priceDiscount.type === 'percentage'
                  ? (product.price + SelectedVariant?.extraPrice - product.price * (product.priceDiscount.value / 100)) * productCount
                  : (product.price + SelectedVariant?.extraPrice - product.priceDiscount.value) * productCount
                : (product.price + SelectedVariant?.extraPrice)  * productCount}  JOD
            </span>
          </h4>
          <div className="quantity-control w-75 mb-4">
            <button className='brdr w-100 d-flex align-items-center justify-content-between px-3 py-1'>
              <span><FaPlus onClick={incrementCount} size={15} /></span>
              <span>{productCount}</span>
              <span><FaMinus onClick={decrementCount} size={15} /></span>
            </button>
          </div>
          <button className='btn-orange rounded-pill w-100 py-2 fs-5' onClick={()=>addToCart(SelectedVariant._id , productCount)}>Add to Cart <IoBagAddSharp/></button>
        </div>
      </div>
    </>
  );
}
