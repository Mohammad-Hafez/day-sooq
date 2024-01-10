import React , {useContext}from 'react';
import { IoBagCheck } from "react-icons/io5";
import {heart} from 'react-icons-kit/ionicons/heart'
import { Icon } from 'react-icons-kit'
import { WishListContext } from '../../context/WishListContext'

export default function BiddingSummary({ product, SelectedVariant, RiAuctionLine }) {
  const isBiddingEnded = new Date(product.endDate) < new Date();

  const {addToFav} = useContext(WishListContext)

  return (
    <>
      <div className="p-summary">
        <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start font-Poppins mb-3">
          <div className="delivery d-flex align-items-center justify-content-between w-100 mb-3">
            <p className='m-0 light-grey-text'>Delivery :</p>
            <div className="free-badge light-gtreen-bg px-2 rounded-pill">
              <span className=''>free</span>
            </div>
          </div>
          <button onClick={()=> addToFav(product._id)} className='w-100 grey-outline-btn cursor-pointer mb-4 py-2 fs-5 d-flex align-items-center justify-content-center addToFavBtn'>Wishlist <Icon className='heart ms-2' icon={heart} size={22}></Icon></button>
          <h5 className='main-grey-text mb-3'>
            <span className='ms-1 dark-grey-text'>
              Start Bidding : <span className='fw-bolder'>{!isBiddingEnded
                ? "Bidding Ended"
                : product?.priceDiscount?.value > 0
                  ? product?.priceDiscount.type === 'percentage'
                    ? ((product.price + SelectedVariant?.extraPrice) - ((product.price + SelectedVariant?.extraPrice) * (product.priceDiscount.value / 100)))
                    : (product.price + SelectedVariant?.extraPrice - product.priceDiscount.value)
                  : (product.price + SelectedVariant?.extraPrice)} JOD </span>
            </span>
          </h5>

          <h5 className='main-orange-text mb-3'>
            <span className='ms-1'>
              Highest Bid : <span className='fw-bolder'>{SelectedVariant?.current_price} JOD</span> <RiAuctionLine />
            </span>
          </h5>

          {isBiddingEnded && (
            <button className='btn dark-blue-btn text-light rounded-pill w-100 py-2 fs-5' onClick={() => console.log("hii")} disabled={isBiddingEnded}>
              Buy It Now <IoBagCheck />
            </button>
          )}
        </div>
        <button className='btn btn-orange rounded-pill w-100 py-2 fs-5' onClick={() => console.log("Bid Now")} disabled={isBiddingEnded}>
          Bid Now <RiAuctionLine />
        </button>
      </div>
    </>
  );
}
