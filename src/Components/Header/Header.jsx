import React from 'react' ;
import Navbar from '../Navbar/Navbar';
import TopHeaderInfo from '../TopHeaderInfo/TopHeaderInfo';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
export default function Header({UserToken}) {
  return<>
  <div className="container d-flex flex-column justify-content-center mb-3">
    <TopHeaderInfo/>
    <HeaderSearch UserToken={UserToken}/>
  </div>
  <Navbar/>
  </>
}
