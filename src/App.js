import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider} from 'primereact/api';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Authorization from './Components/Authorization/Authorization';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import NotFound from './Components/NotFound/NotFound';
import { CartContextProvider } from './context/CartContext';
import MyCart from './Components/MyCart/MyCart';
import WishList from './Components/WishList/WishList';
import ShippingForm from './Components/ShippingForm/ShippingForm';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import AllProducts from './Components/AllProducts/AllProducts';
import { WishListContextProvider } from './context/WishListContext';

function App() {
  const [UserData, setUserData] = useState(null);
  const [UserToken, setUserToken] = useState(null);

  function saveUserData(){
    let encodedPharmacistToken = localStorage.getItem("DaySooqUser");
    let decodedPharmacistToken = jwtDecode(encodedPharmacistToken);
    setUserData(decodedPharmacistToken);
    setUserToken(encodedPharmacistToken)
  }
  const Logout = ()=>{
    localStorage.removeItem("DaySooqUser");
    setUserData(null);
    setUserToken(null)
  }
  useEffect(() => {
    if (UserToken) {
      if (UserData.exp * 1000 < Date.now()) {
        Logout();
      } 
    }
  }, []);
    
  return (
    
    <PrimeReactProvider>
      <CartContextProvider>
        <WishListContextProvider>
      <Router>
          <Routes>
            <Route path="" element={<Layout UserToken={UserToken} Logout={Logout}/>} >
              <Route index element={<Home />} />
              <Route path="Authorization" element={<Authorization saveUserData={saveUserData}/>} /> 
              <Route path="ProductDetails/:id" element={<ProductDetails UserToken={UserToken}/>} /> 
              <Route path="MyCart" element={<MyCart UserToken={UserToken}/>} /> 
              <Route path="WishList" element={<WishList UserToken={UserToken}/>} /> 
              <Route path="CategoryProducts/:category" element={<CategoryProducts UserToken={UserToken}/>} /> 
              <Route path="BrandProducts/:brand/:name" element={<BrandProducts UserToken={UserToken}/>} /> 
              <Route path="ShippingForm" element={<ShippingForm UserToken={UserToken}/>} /> 
              <Route path="AllProducts" element={<AllProducts UserToken={UserToken}/>} /> 
              <Route path="*" element={<NotFound/>} /> 
            </Route>
          </Routes>
          </Router>
          </WishListContextProvider>
      </CartContextProvider>
    </PrimeReactProvider>
  );
}

export default App;
