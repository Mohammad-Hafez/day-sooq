import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { Tree } from 'primereact/tree';

export default function Navbar({ categories }) {
  const [selectedKey, setSelectedKey] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const url = useParams();

  useEffect(() => {
    console.log(filteredSubcategories);
  }, [filteredSubcategories]);

  const getAllSubcategories = () => axios.get(ApiBaseUrl + `subcategories`);
  const { data: SubcategoriesNameResponse } = useQuery(
    'get Subcategories', getAllSubcategories, { cacheTime: 10000 }
  );

  useEffect(() => {
    if (!url.category) {
      setActiveLink(null);
    }
  }, [url]);

  // Transform categories data into the format expected by PrimeReact Tree
  const treeData = categories?.map(category => ({
    key: category?._id,
    label: category?.name,
    children: category?.subcategories?.map(subcategory => ({
      key: subcategory?._id,
      label: subcategory?.name,
      // You can add more nested levels for sub-subcategories if needed
    }))
  }));

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
              {/* Render PrimeReact Tree component */}
              <Tree value={treeData} selectionMode="single" collapseIcon  selectionKeys={selectedKey} onSelectionChange={(e) => setSelectedKey(e.value)}  expandIcon={true} togglerTemplate />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


  // const NavItem = ({ to, activeLink, onClick, name }) => (
    {/* <li className="nav-item">
      <Link
        to={`CategoryProducts/${name}/${encodeURIComponent(to)}`}
        className={`nav-link px-3 text-light ${activeLink === name ? 'active' : ''}`}
        onClick={() => {
          onClick(name);
          setfilteredSubcategories(SubcategoriesNameResponse?.data.data.data.filter(subcategory => subcategory?.category._id === to)) 
          handleCategoryChange(to);
        }}
      >
        {name}
      </Link>
    </li> */}
  // );
              {/* {categories?.map((category, index) => (
             <NavItem
               key={index}
               name={category.name}
               to={category._id}
               activeLink={activeLink}
               onClick={setActiveLink}
             />
              ))} */}




