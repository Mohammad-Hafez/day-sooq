import React, { useContext } from 'react'
import { ImgBaseURL } from '../ApiBaseUrl'
import { Icon } from 'react-icons-kit'
import {ic_local_mall} from 'react-icons-kit/md/ic_local_mall'
import {heart} from 'react-icons-kit/ionicons/heart'
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/CartContext'
import { WishListContext } from '../../context/WishListContext'
import ProductPrice from '../ProductPrice/ProductPrice'
import { RiAuctionLine } from "react-icons/ri";

export default function ProductCard({product , category }) {
  let navigate = useNavigate();

  let isBiddingEnded = new Date(product?.endDate) < new Date();

  const { addToCart } = useContext(cartContext);
  const {addToFav} = useContext(WishListContext)

  const handleCardClick = ()=>{
    if (category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category === 'any') {
      navigate(`/ProductDetails/${product._id}`)
      console.log();
    }else{
      navigate(`/ProductDetails/${product.variant.product._id}`)
    }
  }

  const addToCartFromCard = ()=>{
    if (category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category === 'any') {
      addToCart(product?.variants[0]?._id , 1)
    }else{
      addToCart(product?.variant?._id , 1)
    }
  }

  const addToFavFromCard = ()=>{
    if (category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category === 'any') {
      addToFav(product?._id )
    }else{
      addToFav(product?.variant?._id)
    }
  }

  return <>
    <div className="slide-item slide-container brdr px-3 py-2 d-flex flex-column justify-content-between h-100 position-relative" >
      {category === 'bidding' ?
        !isBiddingEnded ? (
            <span className='position-absolute end-0 me-3 green-bg rounded px-2 text-white'>
              available <RiAuctionLine/>
            </span>
          ) : (
            <span className='position-absolute end-0 me-3 dark-red-bg rounded px-2 text-white'>
              End <RiAuctionLine/>
            </span>
          )
          : null
      }
      <p className='cardCategory me-auto mt-2'>
      {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category === 'any'? <>
        { category === 'any' ? product?.subCategory.category.name :
          product?.subCategory.name
        }
          </> : <>
          { product?.variant.product.subCategory.category[0].name }
          </>}
      </p>
      <div className="card-product-info mb-2 flex-grow-1 d-flex flex-column justify-content-between" onClick={handleCardClick}>
        {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category ===  'any' ? <>
            <h6 className='cardProductName fw-bolder '>{product?.name}</h6>
            </> : <>
            <h6 className='cardProductName fw-bolder '>{product?.variant.product.name}</h6>
            </>}
          <div className="slide-img over-flow-hidden flex-grow-1">
            {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category ===  'any'? <>
              <img  className='img-fluid h-100 w-100 rounded object-fit-contain' src={ImgBaseURL + product?.variants[0]?.imageCover} loading='lazy' alt={product.name + ' image'} />
            </> : <>
              <img  className='img-fluid mb-2 rounded object-fit-contain' src={ImgBaseURL + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} />
            </>}
          </div>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-between w-100">
        <ProductPrice product={product} category={category}/>
        <div className="actionBtns position-relative">
          <div className="toggleBtns mb-3">
            <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1 pb-2' onClick={addToFavFromCard}><Icon className='mt-1' icon={heart} size={22}></Icon></button>
          </div>
          <button className='go-Btn addCart-btn d-flex align-items-center justify-content-center ms-auto pb-2' onClick={addToCartFromCard}><Icon className='p-0 m-0' icon={ic_local_mall} size={22}></Icon></button>
        </div>
      </div>
    </div>
    </>
}
