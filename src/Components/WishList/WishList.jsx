import React, { useContext } from 'react';
import { Helmet } from 'react-helmet'
import { cartContext } from '../../context/CartContext';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { ImgBaseURL } from '../ApiBaseUrl';
import { FaTrashAlt } from "react-icons/fa";
import { WishListContext } from '../../context/WishListContext';
import { IoBagAddSharp } from "react-icons/io5";
import StarRating from '../StarRating/StarRating';
import { useNavigate } from 'react-router-dom';


export default function WishList() {
  let navigate = useNavigate()

const {addToCart} = useContext(cartContext);

const {getLoggedWishlist , removeFav} = useContext(WishListContext);

let {data , isLoading , isFetching , refetch} = useQuery('get-my-fav' , getLoggedWishlist );

const favorites = data?.data.data.favorites;

const handleRemoveFav = async (favId, variantId) => {
  try {
    await removeFav(favId, variantId);
    const updatedFavorites = favorites.filter((item) => item._id !== favId);
    refetch(updatedFavorites);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};

return <>
    <Helmet>
      <title>WishList</title>
    </Helmet>
    {isLoading && <Loader/> }
    {data && 
    <div className="container my-3">
      <div className="px-1 w-75 mx-auto">
        <h5 className='main-orange-text ms-2 font-Poppins fw-bolder'>Wishlist</h5>
        {favorites?.length === 0 && <div className="blue-brdr blue-brdr rounded-4 p-3 font-roboto mb-3">
          <h3 className='light-blue-text'>Explore our products & add items to your WishList.</h3>
        </div> }
        {favorites?.map((item)=> <div key={item._id} className="fav-item">
          <div className="fav-container blue-brdr rounded-4 p-3 font-roboto mb-3" >
              <div className="row g-2">
                <div className="col-sm-2">
                  <div className="cartItemImage brdr p-2 rounded" onClick={()=> navigate(`/ProductDetails/${item.product._id}`)}>
                    <img src={ImgBaseURL + item.product.variants[0].imageCover} alt={item.product.name + 'image'} className='img-fluid cursor-pointer rounded' loading='lazy' />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="cartItemData d-flex flex-column justify-content-between py-2 h-100">
                    <p className='main-grey-text m-0'>{item.product.subCategory.category.name +' / ' + item.product.subCategory.name}</p>
                    <h6 className='m-0 light-blue-text fw-bolder cursor-pointer' onClick={()=> navigate(`/ProductDetails/${item.product._id}`)}>{item.product.name }</h6>
                    <h6 className='rate d-flex align-items-center'> <StarRating averageRating={item.product.ratingsAverage} /> <span className='ms-2 main-grey-text'>({item.product.ratingsQuantity})</span></h6>
                    {item.product?.description?.split(',').slice(0, 3).map((item, index) =><li className='mb-1 ms-1' key={index}>{item.trim()}</li> )}
                  </div>
                </div>
                <div className="col-sm-2  d-flex flex-column align-items-center justify-content-between">
                    <div className="deleteItem text-center">
                        <span className='dark-red-text cursor-pointer' onClick={()=> {handleRemoveFav(item._id, item.product.variants[0]._id)}} ><FaTrashAlt/></span>
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
