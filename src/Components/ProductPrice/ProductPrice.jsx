// import React from 'react'
// export default function ProductPrice({category , product}) {

//   return <>
//           {category === 'big-deals' || category ===  'bidding' || category ===  'similar' || category ===  'any' ? <>
//             {category === 'similar' || category ===  'any' ? <>
//               <div className="salePrice">
//                 <h6 className='font-Roboto fw-bold dark-grey-text'>
//                   {product.priceDiscount.value > 0
//                             ? product.priceDiscount.type === 'percentage'
//                               ? product.price *
//                                 (product.priceDiscount.value / 100)
//                               : product.price - product.priceDiscount.value
//                   : product.price} JOD
//                 </h6>
//               </div>
//               </>
//               : null
//             }
//             {category === 'big-deals' && 
//               <div className="salePrice">
//                 <h6 className='font-Roboto  dark-grey-text before-price'>
//                   {product?.price} JOD</h6>
//                 <h6 className='font-Roboto fw-bold pink-text'>
//                 </h6>
//               </div>
//             }
//             {category ===  'bidding' && 
//               <div className="prices">
//                 <h6 className='font-Roboto fw-bold dark-grey-text'>                          
//                   {product.priceDiscount.value > 0
//                           ? product.priceDiscount.type === 'percentage'
//                             ? product.price *
//                               (product.priceDiscount.value / 100)
//                             : product.price - product.priceDiscount.value
//                           : product.price} JOD
//                 </h6>
//                 <h6 className='font-Roboto fw-bold main-orange-text'>{product.variants[0].extraPrice?product.variants[0].extraPrice : 0 + product.variants[0].current_price?product.variants[0].current_price: '1000'} JOD</h6>
//               </div>
//             }
//         </> : <>
//         <h6 className='font-Roboto fw-bold dark-grey-text'>
//           {product.variant.product.priceDiscount.value > 0
//                     ? product.variant.product.priceDiscount.type === 'percentage'
//                       ? product.variant.product.price *
//                         (product.variant.product.priceDiscount.value / 100)
//                       : product.variant.product.price - product.variant.product.priceDiscount.value
//           : product.variant.product.price} JOD
//         </h6>
//         </>}

//     </>
// }
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
            {product.variants[0].extraPrice ? product.variants[0].extraPrice : 0 + product.variants[0].current_price ? product.variants[0].current_price : '1000'} JOD
          </h6>
        </div>
      );
    }
    return null;
  };

  const renderDefaultPrice = () => {
    return (
      <h6 className='font-Roboto fw-bold dark-grey-text'>
        {calculateDiscountedPrice(product.variant.product.price, product.variant.product.priceDiscount)} JOD
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
