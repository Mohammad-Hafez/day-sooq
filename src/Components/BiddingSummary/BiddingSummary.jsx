import React from 'react';

export default function BiddingSummary({ product, SelectedVariant }) {
  const isBiddingEnded = new Date(product.endDate) < new Date();

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
          <button className='w-100 grey-outline-btn mb-4 py-2 fs-5'>Wishlist</button>
          <h4 className='main-grey-text mb-3'>
            <span className='ms-1 dark-grey-text'>
              {isBiddingEnded
                ? "Bidding Ended"
                : product?.priceDiscount?.value > 0
                  ? product?.priceDiscount.type === 'percentage'
                    ? (product.price + SelectedVariant?.extraPrice - product.price * (product.priceDiscount.value / 100))
                    : (product.price + SelectedVariant?.extraPrice - product.priceDiscount.value)
                  : (product.price + SelectedVariant?.extraPrice)} JOD
            </span>
          </h4>
          {!isBiddingEnded && (
            <button className='btn-orange rounded-pill w-100 py-2 fs-5' onClick={() => console.log("hii")}>Buy It Now</button>
          )}
        </div>
      </div>
    </>
  );
}
