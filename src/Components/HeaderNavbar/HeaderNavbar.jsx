import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function HeaderNavbar({ categories }) {
  const [activeLink, setActiveLink] = useState(null);
  const url = useParams();

  const getAllSubcategories = () => axios.get(ApiBaseUrl + `subcategories`);
  const { data: SubcategoriesNameResponse } = useQuery(
    'get Subcategories', getAllSubcategories, { cacheTime: 10000 }
  );

  useEffect(() => {
    if (!url.category) {
      setActiveLink(null);
    }
  }, [url]);

  const handleNavItemClick = (name) => {
    setActiveLink(name);
  };

  const NavItem = ({ to, activeLink, name }) => (
    <NavDropdown
      title={name}
      id="basic-nav-dropdown"
      color='danger'
      className={`text-danger ${activeLink === name ? 'active' : ''}`}
    >
      {SubcategoriesNameResponse?.data?.data.data
        .filter(subcategory => subcategory?.category?._id === to)
        .map(subCat => (
          <NavDropdown.Item key={subCat?._id}>
            <Link
              to={`/SubCategoryProducts/${name}/${subCat?.name}/${encodeURIComponent(subCat?._id)}`}
              className="nav-link" 
            >
              {subCat?.name}
            </Link>
          </NavDropdown.Item>
        ))}
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Link
          to={`/CategoryProducts/${name}/${encodeURIComponent(to)}`}
          className="nav-link" 
          onClick={() => handleNavItemClick(name)} 
        >
          All {name} Products
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <div className="container-fluid text-uppercase">
      <Navbar expand="lg" className="py-0 dark-blue-bg text-light">
        <div className="container w-75 mx-auto font-Poppins">
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <CiMenuBurger />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-around w-100">
              {categories?.map((category, index) => (
                <NavItem
                  key={index}
                  name={category.name}
                  to={category._id}
                  activeLink={activeLink}
                />
              ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}