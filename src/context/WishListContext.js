import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ApiBaseUrl } from "../Components/ApiBaseUrl";
import { toast } from 'react-hot-toast';

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
    
    useEffect(()=>{
        if (user) {
            getWishList()
        }
        },[user]);

    function addToFav(productId) {
        return axios.post(ApiBaseUrl + `favorites` ,{product : productId} , {headers})
        .then((response)=>{
            toast.success('Product Added Successfully.', {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
            });
            return response;
        })
        .catch((error)=>{
          if (!user) {
            toast.error("You Can't Add Product Until login. Please Login", {
                className: 'first-z mt-5 bg-main-light ',
                duration: 3000,
              });  
            return error;    
            }else{
            toast.error(error.response.data.message, {
                className: 'first-z mt-5 bg-main-light ',
                duration: 2000,
              });  
            return error;
            }
        })
    }

    function removeFav(favId, productId) {
        return axios
          .delete(ApiBaseUrl + `favorites/${favId}`, {
            headers,
            data: {
              product: productId,
            },
          })
          .then((response) => {
            toast.success('Product Removed Successfully.', {
              className: 'first-z mt-5 bg-main-light ',
              duration: 2000,
            });
            return response;
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
              className: 'first-z mt-5 bg-main-light ',
              duration: 2000,
            });
            return error;
          });
      }
        
        return <>
        <WishListContext.Provider value={{NumFavItems , addToFav , getLoggedWishlist , removeFav }}>
            {props.children}
        </WishListContext.Provider>
    </>
};
