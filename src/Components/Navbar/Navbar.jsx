import React, { useState ,useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiMenuBurger } from "react-icons/ci";

export default function Navbar({categories}) {

  const location = useLocation();
  const [activeLink, setActiveLink] = useState();

  const NavItem = ({ to, activeLink, onClick }) => (
    <li className="nav-item">
      <Link to={`CategoryProducts/${encodeURIComponent(to)}`} className={`nav-link px-3 text-light ${activeLink === to ? 'active' : ''}`} onClick={() => onClick(to)}>
        {to}
      </Link>
    </li>
  );
  
  useEffect(()=>{
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setActiveLink(lastSegment || '');
  }, [location.pathname]);

  return <>
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg py-0 dark-blue-bg text-light">
      <div className="container w-75 mx-auto">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><CiMenuBurger/></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-around w-100">
            {categories?.map((category) => <NavItem to={category.name} activeLink={activeLink} onClick={setActiveLink} />)}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  </>
}
