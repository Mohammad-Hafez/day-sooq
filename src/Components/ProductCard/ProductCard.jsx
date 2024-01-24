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

export default function ProductCard({product , category , GridPage}) {
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
    <div className={`slide-item slide-container brdr px-3 py-2 d-flex productCard ${GridPage === 'col-12' ? 'wide align-items-end' : 'flex-column justify-content-between'}  h-100 position-relative`}>
      {category === 'bidding' ?
        !isBiddingEnded ? (
            <p className='position-absolute top-0 mt-2 end-0 me-3 green-bg rounded px-2 text-white'>
              <span className='biddingStatusTxt'>available</span> <RiAuctionLine/>
            </p>
          ) : (
            <p className='position-absolute top-0 mt-2 end-0 me-3 dark-red-bg rounded px-2 text-white'>
              <span className='biddingStatusTxt'>End</span> <RiAuctionLine/>
            </p>
          )
          : null
      }
      <p className={`cardCategory ${GridPage === 'col-12' ? 'align-self-start' : 'me-auto'}  mt-2`}>
      {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category === 'any'? <>
        { category === 'any' ? product?.subCategory.category.name :
          product?.subCategory.name
        }
          </> : <>
          { product?.variant.product.subCategory.category[0].name }
          </>}
      </p>
      <div className={`card-product-info mb-2 ${GridPage === 'col-12' ? 'mx-3 d-flex align-items-center w-75' : 'flex-grow-1 d-flex flex-column justify-content-between'} `} onClick={handleCardClick}>
        {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category ===  'any' ? <>
            <h6 className={`cardProductName fw-bolder ${GridPage === 'col-12' ? 'order-2 align-self-start' : ''}`}>{product?.name}</h6>
            </> : <>
            <h6 className={`cardProductName fw-bolder ${GridPage === 'col-12' ? 'order-2 align-self-start' : ''}`}>{product?.variant.product.name}</h6>
            </>}
          <div className={`slide-img over-flow-hidden ${GridPage === 'col-12' ? 'order-1 w-25 me-2' : 'flex-grow-1'}`}>
            {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category ===  'any'? <>
              <img  className='img-fluid h-100 w-100 rounded object-fit-contain' src={ImgBaseURL + product?.variants[0]?.imageCover} loading='lazy' alt={product.name + ' image'} />
            </> : <>
              <img  className='img-fluid mb-2 rounded object-fit-contain' src={ImgBaseURL + product.variant.imageCover} loading='lazy' alt={product.variant.product.name + ' image'} />
            </>}
          </div>
      </div>
      <div className={`card-footer ${GridPage === 'col-12' ? 'w-25': 'w-100'} d-flex align-items-center justify-content-between`}>
        <div className={`${GridPage === 'col-12' ? '':''}`}>
          <ProductPrice product={product} category={category} />
        </div>
        <div className={`actionBtns position-relative`}>
          <div className={`${GridPage === 'col-12' ? 'toggleBtns-wide mb-3' : 'toggleBtns  mb-3'}`}>
            <button className='go-Btn d-flex align-items-center justify-content-center ms-auto mb-1 pb-2' onClick={addToFavFromCard}><Icon className='mt-1 fs-5' icon={heart}></Icon></button>
          </div>
          <button className='go-Btn addCart-btn d-flex align-items-center justify-content-center ms-auto pb-2' onClick={addToCartFromCard}><Icon className='p-0 m-0 fs-5' icon={ic_local_mall} ></Icon></button>
        </div>
      </div>
    </div>
    </>
}
