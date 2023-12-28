import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { text_justify } from 'react-icons-kit/ikons/text_justify';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { heart } from 'react-icons-kit/ionicons/heart';
import { androidPerson } from 'react-icons-kit/ionicons/androidPerson';
import { ic_local_mall } from 'react-icons-kit/md/ic_local_mall';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApiBaseUrl from '../ApiBaseUrl';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function HeaderSearch({ UserToken }) {
  let navigate = useNavigate();

  const [AllCategoriesName, setAllCategoriesName] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [SearchVal, setSearchVal] = useState('');
  const [SearchResult, setSearchResult] = useState(null);

  const getAllCategories = async () => {
    let { data } = await axios.get(ApiBaseUrl + `categories`);
    setAllCategoriesName(data?.data?.data?.map((category) => category.name));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleProfileClick = () => {
    if (UserToken) {
      console.log('hiiii');
    } else {
      navigate('/Authorization');
    }
  };

  const handleNavSearch = async () => {
    let { data } = await axios.get(
      ApiBaseUrl +
        `products${SelectedCategory ? `/${SelectedCategory}/category` : ''}?limit=5&name=${SearchVal}`
    );
    setSearchResult(data?.data.data);
  };

  const handleCloseClick = () => {
    setSearchResult(null);
    setSearchVal('');
  };

  return (
    <>
      <div className="search-header">
        <div className="row align-items-center">
          <div className="col-sm-3">
            <div className="logo d-flex align-items-center justify-content-around">
              <span>
                <Icon icon={text_justify} className="main-grey-text"></Icon>
              </span>
              <span>
                <h3 className="p-0 m-0">
                  <Link
                    className="logo text-decoration-none font-quest dark-blue-text m-0 p-0"
                    to={''}
                  >
                    Electrobile{' '}
                    <span className="font-Rowdies main-orange-text">Souq</span>
                  </Link>{' '}
                </h3>
              </span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="headerSearchInput">
              <div className="p-inputgroup brdr-blue rounded-pill">
                <InputText
                  placeholder="Search for Products"
                  value={SearchVal}
                  className="nav-search position-relative border-0 ms-3"
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                />
                <Dropdown
                  value={SelectedCategory}
                  onChange={(e) => setSelectedCategory(e.value)}
                  showClear
                  placeholder="All Categories"
                  options={AllCategoriesName}
                  className="border-0 main-orange-text"
                />
                <Button
                  icon="pi pi-search"
                  className="main-orange-bg border-0 rounded-end-pill text-light"
                  onClick={handleNavSearch}
                  disabled={!SearchVal}
                />
              </div>
              {SearchResult ? (
                <>
                  <div className="search-results w-75 ms-4 bg-light rounded-bottom p-2 pt-4 position-relative">
                    <IoIosCloseCircleOutline
                      className="close-btn"
                      onClick={handleCloseClick}
                    />
                    {SearchResult.map((product) => (
                      <div
                        key={product._id}
                        className="search-result-item rounded bg-white w-100 d-flex align-items-center justify-content-between p-2"
                      >
                        <img
                          className="object-fit-contain"
                          src={`https://electrobile-souq.onrender.com/${product.variants[0].imageCover}`}
                          alt={product.name + ' image'}
                        />
                        <h6 className="m-0 main-grey-text">{product.name}</h6>
                        <p className="font-Roboto fw-bold dark-blue-text m-0">
                          {product.priceDiscount.value > 0
                            ? product.priceDiscount.type === 'percentage'
                              ? product.price *
                                (product.priceDiscount.value / 100)
                              : product.price - product.priceDiscount.value
                            : product.price}
                          JOD
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="profileContainer d-flex align-items-center justify-content-center">
              <Icon
                size={22}
                icon={androidPerson}
                className="main-grey-text me-2 cursor-pointer"
                onClick={handleProfileClick}
              ></Icon>
              <Icon
                size={22}
                icon={heart}
                className="main-grey-text me-2 cursor-pointer"
              ></Icon>
              <span className="cart-icon position-relative me-2 main-grey-text d-flex align-items-center">
                <Icon
                  size={22}
                  icon={ic_local_mall}
                  className="me-1 cursor-pointer"
                ></Icon>
                <span className="cart-budget">0.00 JOD</span>
              </span>
              {UserToken ? (
                <FiLogOut className="dark-red-text fs-4 cursor-pointer" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
