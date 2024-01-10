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
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { WishListContextProvider } from './context/WishListContext';
import SuccessOrder from './Components/SuccessOrder/SuccessOrder';
import { Icon } from 'react-icons-kit';
import {wifiOff} from 'react-icons-kit/feather/wifiOff'
import { Offline } from "react-detect-offline";
import  { Toaster } from 'react-hot-toast';
import MyOrders from './Components/MyOrders/MyOrders';

function App() {
  const [UserToken, setUserToken] = useState(null);

  function saveUserData(){
    let encodedPharmacistToken = localStorage.getItem("DaySooqUser");
    setUserToken(encodedPharmacistToken)
  }
  const Logout = () => {
    localStorage.removeItem("DaySooqUser");
    setUserToken(null);
  };
  
  useEffect(() => {
    const storedUserToken = localStorage.getItem('DaySooqUser');
    if (storedUserToken) {
      const decodedUserToken = jwtDecode(storedUserToken);
      if (decodedUserToken.exp * 1000 < Date.now()) {
        Logout();
      } else {
        setUserToken(storedUserToken);
      }
    }
  }, []);        
  return (
    
    <PrimeReactProvider>
      <CartContextProvider>
        <WishListContextProvider>
        <Offline> <div className='network p-3 bg-danger text-light rounded align-items-center d-flex position-absolute bottom-0 start-0 m-4'> <Icon icon={wifiOff} className='me-2'></Icon> Faild Network Conection</div> </Offline>
        <Toaster/>
      <Router>
          <Routes>
            <Route path="" element={<Layout UserToken={UserToken} Logout={Logout}/>} >
              <Route index element={<Home />} />
              <Route path="Authorization" element={<Authorization saveUserData={saveUserData}/>} /> 
              <Route path="ProductDetails/:id" element={<ProductDetails UserToken={UserToken}/>} /> 
              <Route path="MyCart" element={<ProtectedRoutes> <MyCart UserToken={UserToken}/> </ProtectedRoutes> } /> 
              <Route path="WishList" element={<ProtectedRoutes> <WishList UserToken={UserToken}/> </ProtectedRoutes>} /> 
              <Route path="CategoryProducts/:category/:id" element={<CategoryProducts UserToken={UserToken}/>} /> 
              <Route path="BrandProducts/:brand/:name" element={<BrandProducts UserToken={UserToken}/>} /> 
              <Route path="ShippingForm" element={<ProtectedRoutes><ShippingForm UserToken={UserToken}/> </ProtectedRoutes> } /> 
              <Route path="SuccessOrder" element={<ProtectedRoutes><SuccessOrder UserToken={UserToken}/> </ProtectedRoutes> } /> 
              <Route path="MyOrders" element={<ProtectedRoutes><MyOrders UserToken={UserToken}/> </ProtectedRoutes> } /> 
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
