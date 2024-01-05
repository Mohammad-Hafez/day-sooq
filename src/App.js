import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrimeReactProvider} from 'primereact/api';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import AllCategories from './Components/AllCategories/AllCategories';
import Authorization from './Components/Authorization/Authorization';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import NotFound from './Components/NotFound/NotFound';
import { CartContextProvider } from './context/CartContext';
import MyCart from './Components/MyCart/MyCart';
import WishList from './Components/WishList/WishList';
import ShippingForm from './Components/ShippingForm/ShippingForm';

function App() {
  const [UserData, setUserData] = useState(null);
  const [UserToken, setUserToken] = useState(null);

  function saveUserData(){
    let encodedPharmacistToken = localStorage.getItem("DaySooqUser");
    let decodedPharmacistToken = jwtDecode(encodedPharmacistToken);
    setUserData(decodedPharmacistToken);
    setUserToken(encodedPharmacistToken)
  }
  useEffect(() => {
    if (localStorage.getItem('DaySooqUser')) {
      const expDate = UserData?.exp * 1000; 
      if (expDate < Date.now()) {
        localStorage.removeItem('DaySooqUser');
        setUserData(null);
        setUserToken(null);
      }
      saveUserData();
    }  
  }, []);
  
  return (
    
    <PrimeReactProvider>
      <CartContextProvider>
      <Router>
          <Routes>
            <Route path="" element={<Layout UserToken={UserToken}/>} >
              <Route index element={<Home />} />
              <Route path="AllCategories" element={<AllCategories />} />
              <Route path="Authorization" element={<Authorization saveUserData={saveUserData}/>} /> 
              <Route path="ProductDetails/:id" element={<ProductDetails UserToken={UserToken}/>} /> 
              <Route path="MyCart" element={<MyCart UserToken={UserToken}/>} /> 
              <Route path="WishList" element={<WishList UserToken={UserToken}/>} /> 
              <Route path="ShippingForm" element={<ShippingForm UserToken={UserToken}/>} /> 
              <Route path="*" element={<NotFound/>} /> 
            </Route>
          </Routes>
          </Router>
      </CartContextProvider>
    </PrimeReactProvider>
     
  );
}

export default App;
