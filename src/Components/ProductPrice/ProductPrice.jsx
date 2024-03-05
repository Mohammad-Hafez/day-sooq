import React from 'react';

const calculateDiscountedPrice = (price, discount) => {
  return discount.value > 0
    ? discount.type === 'percentage'
      ? price * (discount.value / 100)
      : price - discount.value
    : price;
};

export default function ProductPrice({ category, product }) {
  const renderSimilarOrAnyPrice = () => {
    if (category === 'similar' || category === 'any') {
      return (
        <div className="salePrice">
          <h6 className='font-Roboto fw-bold dark-grey-text'>
            {calculateDiscountedPrice(product.price, product.priceDiscount)} JOD
          </h6>
        </div>
      );
    }
    return null;
  };

  const renderBigDealsPrice = () => {
    if (category === 'big-deals') {
      return (
        <div className="salePrice">
          <h6 className='font-Roboto dark-grey-text before-price'>
            {product?.price} JOD
          </h6>
          <h6 className='font-Roboto fw-bold pink-text'>
            {calculateDiscountedPrice(product.price, product.priceDiscount)} JOD
          </h6>
        </div>
      );
    }
    return null;
  };

  const renderBiddingPrice = () => {
    if (category === 'bidding') {
      return (
        <div className="prices">
          <h6 className='font-Roboto fw-bold dark-grey-text'>
            {calculateDiscountedPrice(product.price, product.priceDiscount)} JOD
          </h6>
          <h6 className='font-Roboto fw-bold main-orange-text'>
            {product.variants[0]?.extraPrice ? product.variants[0]?.extraPrice : 0 + product.variants[0]?.current_price ? product.variants[0]?.current_price : calculateDiscountedPrice(product?.price, product?.priceDiscount)} JOD
          </h6>
        </div>
      );
    }
    return null;
  };

  const renderDefaultPrice = () => {
    return (
      <h6 className='font-Roboto fw-bold dark-grey-text'>
        {calculateDiscountedPrice(product.variant?.product.price, product.variant?.product.priceDiscount)} JOD
      </h6>
    );
  };

  return (
    <>
      {(category === 'big-deals' || category === 'bidding' || category === 'similar' || category === 'any') ? (
        <>
          {renderSimilarOrAnyPrice()}
          {renderBigDealsPrice()}
          {renderBiddingPrice()}
        </>
      ) : (
        renderDefaultPrice()
      )}
    </>
  );
}
