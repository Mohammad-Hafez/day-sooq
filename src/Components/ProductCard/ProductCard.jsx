import React, { useContext } from 'react'
import { ImgBaseURL } from '../ApiBaseUrl'
import { Icon } from 'react-icons-kit'
import {ic_local_mall} from 'react-icons-kit/md/ic_local_mall'
import {heart} from 'react-icons-kit/ionicons/heart'
import { GoGitCompare } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/CartContext'
     
export default function ProductCard({product , category }) {
  let navigate = useNavigate();

  const { addToCart } = useContext(cartContext);

  const handleCardClick = ()=>{
    if (category === 'big-deals' || category ===  'bidding' || category ===  'similar') {
      navigate(`/ProductDetails/${product._id}`)
      console.log();
    }else{
      navigate(`/ProductDetails/${product.variant.product._id}`)
    }
  }

  const addToCartFromCard = ()=>{
    if (category === 'big-deals' || category ===  'bidding' || category ===  'similar') {
      addToCart(product?.variants[0]?._id , 1)
    }else{
      addToCart(product?.variant?._id , 1)
    }

  }
  return <>
              <div className="slide-item slide-container brdr px-3 py-2 d-flex flex-column justify-content-between h-100" >
              <p className='cardCategory me-auto mt-2'>Category</p>
              <div className="card-product-info mb-2" onClick={handleCardClick}>
                <h6 className='cardProductName fw-bolder '>{product?.name}</h6>
                <div className="slide-img over-flow-hidden">
                  {category === 'big-deals' || category ===  'bidding' || category ===  'similar'? <>
                    <img  className='img-fluid h-100 w-100' src={ImgBaseURL + product?.variants[0]?.imageCover} loading='lazy' alt={product.name + ' image'} />
                  </> : <>
                    <img  className='img-fluid mb-2 flex-grow-1' src={ImgBaseURL + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} />
                  </>}
                </div>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between w-100">
                {category === 'big-deals' || category ===  'bidding' || category ===  'similar'? <>
                    {category === 'similar' && 
                      <div className="salePrice">
                        <h6 className='font-Roboto fw-bold dark-grey-text'>
                          {product.priceDiscount.value > 0
                                    ? product.priceDiscount.type === 'percentage'
                                      ? product.price *
                                        (product.priceDiscount.value / 100)
                                      : product.price - product.priceDiscount.value
                          : product.price} JOD
                        </h6>
                      </div>
                    }
                    {category === 'big-deals' && 
                      <div className="salePrice">
                        <h6 className='font-Roboto  dark-grey-text before-price'>
                          {product?.price} JOD</h6>
                        <h6 className='font-Roboto fw-bold pink-text'>
                          {product.priceDiscount.value > 0
                                  ? product.priceDiscount.type === 'percentage'
                                    ? product.price *
                                      (product.priceDiscount.value / 100)
                                    : product.price - product.priceDiscount.value
                                  : product.price} JOD
                        </h6>
                      </div>
                    }
                    {category ===  'bidding' && 
                      <div className="prices">
                        <h6 className='font-Roboto fw-bold dark-grey-text'>                          
                          {product.priceDiscount.value > 0
                                  ? product.priceDiscount.type === 'percentage'
                                    ? product.price *
                                      (product.priceDiscount.value / 100)
                                    : product.price - product.priceDiscount.value
                                  : product.price} JOD
                        </h6>
                        <h6 className='font-Roboto fw-bold main-orange-text'>{product.price - product.biddingGap} JOD</h6>
                      </div>
                    }
                </> : <>
                <h6 className='font-Roboto fw-bold dark-grey-text'>
                  {product.variant.product.priceDiscount.value > 0
                            ? product.variant.product.priceDiscount.type === 'percentage'
                              ? product.variant.product.price *
                                (product.variant.product.priceDiscount.value / 100)
                              : product.variant.product.price - product.variant.product.priceDiscount.value
                  : product.variant.product.price} JOD
                </h6>
                </>}
                <div className="actionBtns position-relative">
                  <div className="toggleBtns">
                    <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1'><GoGitCompare/></button>
                    <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1 pb-2'><Icon className='p-0 m-0' icon={heart} size={22}></Icon></button>
                  </div>
                  <button className='go-Btn addCart-btn d-flex align-items-center justify-content-center ms-auto pb-2' onClick={addToCartFromCard}><Icon className='p-0 m-0' icon={ic_local_mall} size={22}></Icon></button>
                </div>
              </div>
            </div>

    </>
}
