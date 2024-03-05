import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';

export default function Navbar({ categories }) {
  const [activeLink, setActiveLink] = useState(null);
  let url =useParams()

  const NavItem = ({ to, activeLink, onClick, name }) => (
    <li className="nav-item">
      <Link
        to={`CategoryProducts/${name}/${encodeURIComponent(to)}`}
        className={`nav-link px-3 text-light ${activeLink === name ? 'active' : ''}`}
        onClick={() => {
          onClick(name);
        }}
      >
        {name}
      </Link>
    </li>
  );
        useEffect(()=>{
          if (!url.category) {
            setActiveLink(null)
          }
        },[url])
  return (
    <div className="container-fluid text-uppercase">
      <nav className="navbar navbar-expand-lg py-0 dark-blue-bg text-light">
        <div className="container w-75 mx-auto font-Poppins">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <CiMenuBurger />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-around w-100">
              {categories?.map((category, index) => (
                <NavItem key={index} name={category.name} to={category._id} activeLink={activeLink} onClick={setActiveLink} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
