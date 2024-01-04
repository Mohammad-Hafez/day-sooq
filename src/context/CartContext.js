import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";

export let cartContext = createContext();
export function CartContextProvider(props) {

    const [numbOfCartItems, setNumbOfCartItems] = useState();
    const [TotalPrice, setTotalPrice] = useState()

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
        }
    }

    useEffect(()=>{
        getCart();
    },[numbOfCartItems]);

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

    function onlinePayment(cartId , shippingAddress){
        return axios.post(ApiBaseUrl + `/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,
        {
            shippingAddress : shippingAddress
        },
        {
            headers
        }
        ).then((response) => response)
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
    <cartContext.Provider value={{setNumbOfCartItems, numbOfCartItems, TotalPrice, applyPromoCode, onlinePayment, addToCart, getLoggedUserCart, removeItem, updateProductCount }}>
        {props.children}
    </cartContext.Provider>
    </>
}