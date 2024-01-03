import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";

export let cartContext = createContext();
export function CartContextProvider(props) {

    const [cartId, setCartId] = useState();
    const [numbOfCartItems, setNumbOfCartItems] = useState();

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
            console.log(response.data.data.data.length);
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
        return axios.delete(ApiBaseUrl + `/api/v1/cart/${productId}` ,
        {
            headers
        }
        ).then((response) => response)
        .catch((erorr) => erorr)
    }

    function updateProductCount(productId , count){
        return axios.put(ApiBaseUrl + `/api/v1/cart/${productId}` ,
        {
            count
        },
        {
            headers
        }
        ).then((response) => response)
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
    return <>
    <cartContext.Provider value={{setNumbOfCartItems , numbOfCartItems , onlinePayment, addToCart , getLoggedUserCart , removeItem , updateProductCount }}>
        {props.children}
    </cartContext.Provider>
    </>
}