import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl'
import Loader from '../Loader/Loader'

export default function MyOrders() {

  const user = localStorage.getItem("DaySooqUser") ;
  let headers = {
      'Authorization': `Bearer ${user}` 
  };

  const getAllOrders = ()=>{
    return axios.get(ApiBaseUrl + `orders/myOrders` , {headers} )
  }
  let {data , isLoading} = useQuery('getAllOrders' , getAllOrders , {cacheTime:10000});

  let orders = data?.data.data.orders ;
  return <>
    <Helmet>
      <title>My Orders</title>
    </Helmet>
    {isLoading && <Loader/>}
    {data && 
      <div className="container font-roboto">
        <div className="p-1 w-75 mx-auto my-2">
          <h5 className='main-orange-text ms-2 font-Poppins fw-bolder'>My Orders</h5>
          {orders?.map((order)=> <div key={order._id} className="order-item">
            <div className="order-container blue-brdr rounded-4 p-3 mb-3">
              <div className="row g-2">
                <div className="col-sm-5">
                  <div className="brdr rounded p-2 Invoice" >
                    <h3 className='main-orange-text fw-bold m-0 mb-2'>Invoice Number : {order.code}</h3>
                    <h5 className='light-grey-text'>Date : {order.createdAt.slice(0, 10)}</h5>
                    <h5 className='light-grey-text'>Shipping to : {order.cards[0].user.firstName + ' '+ order.cards[0].user.lastName }</h5>
                    <h6 className='light-grey-text fw-bolder'>Address : {order.strAddress + ' / ' + order.city + ' / ' + order.country }</h6>
                    <h6 className='light-grey-text fw-bolder'>Payment : {order.paymentMethod }</h6>
                    <h6 className='light-grey-text fw-bolder'>shipping Fee : {order.shipping_cost === 0 ? <span className='light-green-text'>Free</span> :order.shipping_cost + 'JOD' }</h6>
                    <h5 className='main-grey-text fw-bolder'>Total Price : {order.totalPrice} JOD</h5>
                    
                  </div>
                </div>
                <div className="col-sm-7">
                  <div className="orderItemData d-flex flex-column py-2 h-100">
                    {order.cards.map((product , index)=> <div key={product._id} className='orderProducts'>
                      <h5 className='fe-bloder light-blue-text fw-bold'>
                        <span className='main-grey-text'>Product {index +1} :</span> {product.variant.product.name}
                      </h5>
                    </div> )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    }
    </>
}
