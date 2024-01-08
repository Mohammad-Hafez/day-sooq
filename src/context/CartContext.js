import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";

export let cartContext = createContext();

export function CartContextProvider(props) {
    const [numbOfCartItems, setNumbOfCartItems] = useState();
    const [TotalPrice, setTotalPrice] = useState()
    const [AllCartsId, setAllCartsId] = useState()
    let headers = {
        'Authorization': `Bearer ${localStorage.getItem("DaySooqUser")}` 
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

    useEffect(() => {
        getCart();
    },[]);

    function addToCart(productId, quantity) {
        const cartItem = {
            variant: productId,
            quantity: quantity,
        };
        return axios.post(ApiBaseUrl + `cards`, 
        cartItem , 
        { headers }
        ).then((response) => {
            getCart()
            return response
        })
        .catch((erorr) => (erorr))
    }
        
    function removeItem(productId){
        return axios.delete(ApiBaseUrl + `cards/${productId}` ,
        {
            headers
        }
        ).then((response) => {           
            getCart()
            return response
            }
        )
        .catch((erorr) => erorr)
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
            getCart()
            return response
            })
        .catch((erorr) => erorr)
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
            console.log(response.data.session.url)
            const stripeUrl = response.data.session.url;
            // Redirect to Stripe URL
            window.location.href = stripeUrl;})
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