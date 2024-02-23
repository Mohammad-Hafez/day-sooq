import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import {ApiBaseUrl , ImgBaseURL} from '../ApiBaseUrl'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import SimilarProduct from '../SimilarProduct/SimilarProduct'
import { TabView, TabPanel } from 'primereact/tabview';
import ProductSummary from '../ProductSummary/ProductSummary'
import BiddingSummary from '../BiddingSummary/BiddingSummary'
import { RiAuctionLine } from "react-icons/ri";
import StarRating from '../StarRating/StarRating';
import ProductReviews from '../ProductReviews/ProductReviews'


export default function ProductDetails() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let {id} = useParams();

  const getProduct = ()=> axios.get(ApiBaseUrl + `products/${id}`);

  let {data , isLoading , refetch , isFetching } = useQuery('product-details' , getProduct , {cacheTime:1000});

  let product = (data?.data?.data?.data);

  const isBiddingEnded = new Date(product?.endDate) < new Date();

  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]._id);

  const splitDescription = product?.description?.split(',').map((item, index) => <li className='mb-1' key={index}>{item.trim()}</li> )

  const colors = product?.variants.map((newProduct , index)=>  <div
                                                                  key={index}
                                                                  onClick={() => setSelectedVariant(newProduct)}
                                                                  className={`color rounded me-1 ${selectedVariant?._id === newProduct._id ? 'selected' : ''}`}
                                                                  style={{
                                                                    background: `linear-gradient(182deg, #F2FFF7 0%, ${newProduct?.color} 100%)`,
                                                                    border: selectedVariant?._id === newProduct._id ? '2px solid #000' : 'none',
                                                                  }}
                                                              >
                                                            </div>
                                                          );

  useEffect(()=>{refetch()},[id])
  return <>
  {isLoading || isFetching ?<Loader/>: <>
  {product && <>
    <Helmet>
      <title>{product.name?.split(' ').slice(0, 3).join(' ')}</title>
    </Helmet>
    <div className="container my-4">
      <div className="product-path mb-5">
        <p className='main-grey-text'>{product?.subCategory?.category.name} / {product?.subCategory?.name} / {product?.name}</p>
      </div>
      <div className="row mb-3">
        <div className="col-6 col-md-8">
          <div className="row">
            <div className="col-md-5">
              <div className="product-images p-2 pt-4">
                <Slider {...settings}>
                  {product?.variants[0].images?.map((img , index)=><img className='img-fluid rounded' key={index}  src={'https://electrobile-souq.onrender.com/' + img}  loading='lazy' alt={product.name + ' image'} />)}
                </Slider>  
              </div>
            </div>
            <div className="col-md-7">
              <div className="product-details ps-2">
                <div className="product-category mb-4">
                  <p className='main-grey-text'>{product?.subCategory?.category.name} / {product?.subCategory?.name}</p>
                  {product?.isAction &&
                    isBiddingEnded ? (
                      <h5>
                        <span className='badge dark-red-bg'>Bidding Ended <RiAuctionLine className='fs-6'/></span>
                      </h5>
                    ) : (
                      !product?.startDate || new Date(product?.startDate) > new Date() ? (
                        <h5>
                          <span className='badge dark-grey-bg'>Bidding Not Started Yet <RiAuctionLine className='fs-6'/></span>
                        </h5>
                      ) : (
                        <>
                          <h5>
                            <span className='badge dark-green-bg'>Bidding Available <RiAuctionLine className='fs-6'/></span>
                          </h5>
                        </>
                      )
                    )                  
                  }
                </div>
                <div className="product-data">
                  <div className="p-name">
                    <h4 className='light-blue-text'>{product?.name}</h4>
                  </div>
                  <div className="p-rate">
                    <p className='fs-5'>
                      <StarRating averageRating={product?.ratingsAverage} />
                    </p>
                  </div>
                  <div className="p-descripton">
                    <ul className='main-grey-text'>{splitDescription}</ul>
                  </div>
                  <div className="p-sku">
                    <p className='main-grey-text'>SKU : <span className='dark-grey-text'>{product?.variants[0].sku}</span></p>
                  </div>
                  <div className="p-brand mb-3">
                    <h6 className='dark-grey-text'>Brand</h6>
                    <img src={ImgBaseURL + product?.brand.image} className='w-25 cursor-pointer' alt={product?.name + `image`} loading='lazy' />
                  </div>
                  <div className="p-variants">
                    <h6 className='dark-grey-text'>colors</h6>
                    <div className="p-colors d-flex">
                      {colors}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4">
          {product?.isAction && <BiddingSummary refetch={refetch} RiAuctionLine={RiAuctionLine} product={product} quantity={product?.quantity} SelectedVariant={selectedVariant ? selectedVariant : product?.variants[0]}/>}
          {product?.isAction === false && <ProductSummary product={product} quantity={product?.quantity} SelectedVariant={selectedVariant ? selectedVariant : product?.variants[0]}/>}
        </div>
      </div>
      <div className="px-4">
        <h6 className='main-orange-text mb-0'>Similar Products :</h6>
        {product && <SimilarProduct subCategory={product?.subCategory._id}/>}
      </div>
      <div className="reviews px-5">
        <TabView className='brdr p-2'>
          {/* <TabPanel header="Description" className='dark-grey-text'></TabPanel> */}
          <TabPanel header="Reviews">
            <ProductReviews product={product}/>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </>}

  </>}
      </>
}
