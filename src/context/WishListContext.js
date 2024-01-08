import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";

export let WishListContext = createContext();

export function WishListContextProvider(props){
    const user = localStorage.getItem("DaySooqUser") ;
    let headers = {
        'Authorization': `Bearer ${user}` 
    };

    const [NumFavItems, setNumFavItems] = useState();

    function getLoggedWishlist () { 
        return axios.get(ApiBaseUrl + `favorites/myFavorites` ,
        {headers}).then((response) => response)
        .catch((error) => error)
     };

     async function getWishList(){
        let response = await getLoggedWishlist();
        if (response?.data?.status === 'success') {
            setNumFavItems(response.data.data.favorites.length)
        }
     }
    
    useEffect(()=>{getWishList()},[user]);

    function addToFav(productId) {
        return axios.post(ApiBaseUrl + `favorites` ,{product : productId} , {headers})
        .then((response)=>response)
        .catch((error)=>error)
    }

    return <>
        <WishListContext.Provider value={{NumFavItems , addToFav }}>
            {props.children}
        </WishListContext.Provider>
    </>
};
