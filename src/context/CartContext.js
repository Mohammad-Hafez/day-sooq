import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";
import { toast } from 'react-hot-toast';

export let cartContext = createContext();

export function CartContextProvider(props) {


    const user = localStorage.getItem("DaySooqUser") ;
    const [numbOfCartItems, setNumbOfCartItems] = useState();
    const [TotalPrice, setTotalPrice] = useState()
    const [AllCartsId, setAllCartsId] = useState()
    let headers = {
        'Authorization': `Bearer ${user}` 
    }

    function getLoggedUserCart(){
        return axios.get(ApiBaseUrl + `cards/myCards` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }

    async function getCart(){
        let response = await getLoggedUserCart()
        if (response?.data?.status === 'success') {
            setNumbOfCartItems(response.data.data.data.length);
            setTotalPrice(response.data.data.data.reduce((sum, product) => {
                const productPrice = (product.price + product.variant.extraPrice) * product.quantity;
                return sum + productPrice;
            }, 0))
            setAllCartsId(response.data.data.data.map((cart)=>cart._id))
        }
    }

    useLayoutEffect(() => {
        getCart();
    },[user]);

    function addToCart(productId, quantity) {
        const cartItem = {
            variant: productId,
            quantity: quantity,
        };
        return axios.post(ApiBaseUrl + `cards`, 
        cartItem , 
        { headers }
        ).then((response) => {
            toast.success('Product Added Successfully.', {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });
            getCart()
            return response
        })
        .catch((erorr) => {
            toast.error("The product is already in your cart.", {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
              });  
            return erorr;
        })
    }
        
    function removeItem(productId){
        return axios.delete(ApiBaseUrl + `cards/${productId}` ,
        {
            headers
        }
        ).then((response) => {    
            toast.success('Product Deleted Successfully.', {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });
            getCart()
            return response
            }
        )
        .catch((erorr) => {
            toast.error("An Error Occured", {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });  
            return erorr
        })
    }

    function updateProductCount(cartId ,variantId , quantity ){
        const cartItem = {
            variant: variantId,
            quantity: quantity,
        };
        return axios.patch(ApiBaseUrl + `cards/${cartId}` ,
            cartItem ,
        {
            headers
        }
        ).then((response) => {   
            toast.success('count Updated Successfully.', {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });
        
            getCart()
            return response
            })
        .catch((erorr) => {
            toast.error("An Error Occured", {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });  
            return erorr
        })
    }

    function placeOrder(paymentMethod , values){
        return axios.post(ApiBaseUrl + `checkOut/${paymentMethod}` ,
        {
            cards: values.cards ,
            country: values.country ,
            city: values.city ,
            phone: values.phone ,
            strAddress: values.strAddress ,
            coupon: values.coupon 
        },
        {
            headers
        }
        ).then((response) => {
            if (paymentMethod === 'cash' && response.data.status === 'success' ) {
                window.location.href = '/SuccessOrder'
            }else if (paymentMethod === 'card' && response.data.status === 'success' ) {
                const stripeUrl = response.data.session.url;
                window.location.href = stripeUrl;
            }
        })
        .catch((erorr) => erorr)
    }

    function applyPromoCode (promoCode , totalPrice){
        return axios.post(ApiBaseUrl + 'coupons/applyCoupon' , 
        {
            promoCode :promoCode , 
            totalPrice :totalPrice ,
        },
        {
            headers
        }).then((response) => {           
            // getCart()
            return response
            })
        .catch((erorr) => erorr)
    }

    return <>
    <cartContext.Provider value={{setNumbOfCartItems, AllCartsId, numbOfCartItems, TotalPrice, applyPromoCode, placeOrder, addToCart, getLoggedUserCart, removeItem, updateProductCount , getCart }}>
        {props.children}
    </cartContext.Provider>
    </>
}