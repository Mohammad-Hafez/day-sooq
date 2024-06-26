import React, {useContext,useEffect,useState } from 'react';
import { Icon } from 'react-icons-kit';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { heart } from 'react-icons-kit/ionicons/heart';
import { androidPerson } from 'react-icons-kit/ionicons/androidPerson';
import { ic_local_mall } from 'react-icons-kit/md/ic_local_mall';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { cartContext } from '../../context/CartContext';
import { AiOutlineLogin } from "react-icons/ai";
import { useQuery } from 'react-query';
import { IoFilterCircleSharp } from "react-icons/io5";
import {bell} from 'react-icons-kit/fa/bell'
import { Sidebar } from 'primereact/sidebar';
import logo from '../../assets/Logo daysooq V09.png'
export default function HeaderSearch({ UserToken , categories , Logout}) {
  let navigate = useNavigate();

  let {numbOfCartItems } = useContext(cartContext);

  const [activeLink, setActiveLink] = useState();

  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [SearchVal, setSearchVal] = useState('');
  const [SearchResult, setSearchResult] = useState(null);

  const [Notifications, setNotifications] = useState(null)
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [IsUnread, setIsUnread] = useState(false)

  const handleNavSearch = async () => {
    let { data } = await axios.get( ApiBaseUrl +
        `products${SelectedCategory ? `/${SelectedCategory}/category` : ''}?limit=5&name=${SearchVal}`
    );
    setSearchResult(data?.data.data);
  };

  const handleCloseClick = () => {
    setSearchResult(null);
    setSearchVal('');
  };

  const user = localStorage.getItem('DaySooqUser');
  
  const headers = {
    'Authorization': `Bearer ${user}`,
  };
  
  const readAllNotifications = async () => {
    await axios.patch(ApiBaseUrl + `notifications/markAllAsRead`, {}, { headers: headers });
    notificationsRefetch()
  };
  
  const getMyNotifications = ()=> axios.get(ApiBaseUrl  + `notifications/myNotifications` ,{ headers })
  const { data:notificationsResponse , refetch : notificationsRefetch } = useQuery('my-notifications', getMyNotifications, { cacheTime: 5000 ,  enabled: !!user});
  useEffect(()=>{
    if (notificationsResponse) {
      const notifications = notificationsResponse?.data?.data.notifications;
      const unreadNotification = notifications.some(notification => !notification.read);
      setIsUnread(unreadNotification);
      setNotifications(notifications)
    }
  }, [notificationsResponse])
  
  const getMyProfile = () => axios.get(ApiBaseUrl + `users/profile`, { headers });
  const { data:ProfileResponse  } = useQuery('my-profile', getMyProfile, { cacheTime: 5000 ,  enabled: !!user});

  return (
    <>
      <Sidebar visible={visibleSidebar} position="right" className='pt-0 mt-0' onHide={() => {setVisibleSidebar(false) ; setIsUnread(false);}}>
        <h4>My Notifications</h4>
        <hr />
        {Notifications?.map((notification , index)=> <div key={index} className={`d-flex ${notification?.read ? 'bg-light blue-brdr' : "bg-muted" }  flex-column justify-content-start p-2 my-2 border`}>
            <h5 className='dark-blue-text'>{notification?.title}</h5>
            <h6 className='text-muted opacity-50'>{notification?.createdAt?.slice(0,10)}</h6>
            <p>{notification?.body}</p>
        </div>)}
      </Sidebar>
      <div className="search-header">
        <div className="row align-items-center gy-2 navRow">
          <div className="col-6 col-lg-3 LogoConatiner">
            <div className="logo d-flex align-items-center justify-content-start">
              <span className='me-2'>
                <IoFilterCircleSharp className="dark-blue-text fs-2 cursor-pointer zoom" onClick={()=>navigate('/AllProducts')}/>
              </span>
              <span>
                <h3 className="p-0 m-0">
                  <Link className="logo text-decoration-none font-quest dark-blue-text m-0 p-0" to={''} >
                    <img src={logo} className='w-50' alt="" />
                  </Link>
                </h3>
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-6 SearchContainer">
            <div className="headerSearchInput position-relative">
              <div className="p-inputgroup brdr-blue rounded-pill">
                <InputText placeholder="Search for Products"
                  value={SearchVal} className="nav-search position-relative border-0 ms-3"
                  onChange={(e) => { setSearchVal(e.target.value); }}
                />
                <Dropdown
                  value={SelectedCategory} onChange={(e) => setSelectedCategory(e.value)}
                  showClear placeholder="All Categories"
                  options={categories?.map((category) => category.name)} className="border-0 main-orange-text categoriesDropDown"
                />
                <Button icon="pi pi-search" className="main-orange-bg border-0 rounded-end-pill text-light" onClick={handleNavSearch} disabled={!SearchVal} />
              </div>
              {SearchResult ? (
                <>
                  <div className="search-results w-75 ms-4 bg-light rounded-bottom p-2 pt-4">
                    <IoIosCloseCircleOutline className="close-btn" onClick={handleCloseClick} />
                    {SearchResult.map((product) => (
                      <div key={product._id} className="search-result-item rounded bg-white w-100 d-flex align-items-center justify-content-between p-2 mb-1 cursor-pointer"
                        onClick={()=>navigate(`/ProductDetails/${product._id}`)} >
                        <img className="object-fit-contain" src={ImgBaseURL + product.variants[0].imageCover} alt={product.name + ' image'} />
                        <h6 className="m-0 main-grey-text">{product.name}</h6>
                        <p className="font-Roboto fw-bold dark-blue-text m-0">
                          {product.priceDiscount.value > 0
                            ? product.priceDiscount.type === 'percentage'
                              ? product.price * (product.priceDiscount.value / 100)
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
          <div className="col-6 col-lg-3 IconsContainer">
            <div className="profileContainer d-flex align-items-center justify-content-center">
              {UserToken ? <>
              <span className='fs-6 dark-blue-text font-Rowdies me-3'>
                Hi, {ProfileResponse?.data.data.data.firstName}
              </span>
                <span className={`cursor-pointer profile-dropdown dropdown-toggle ${activeLink === '' ? ' active' : ''}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <Icon size={22}  icon={androidPerson} className="main-grey-text me-2 cursor-pointer" ></Icon>
                </span>
                <div className="dropdown-menu profile-menu text-center font-Poppins" aria-labelledby="navbarDropdown">
                  <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main ${activeLink === 'MyOrders' ? ' active' : ''}`} to={`MyOrders`} onClick={() => setActiveLink('MyOrders')} >
                    My Orders
                    </Link>
                  </span>
                  <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main ${activeLink === 'ProfileDetails' ? ' active' : ''}`} to={`ProfileDetails`} onClick={() => setActiveLink('ProfileDetails')}>
                    Profile Details
                    </Link>
                  </span>
                  <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main${activeLink === 'ChangePassword' ? ' active' : ''}`} to={`ChangePassword`} onClick={() => setActiveLink('ChangePassword')} >
                    change Password
                    </Link>
                  </span>
                  <hr className='my-1'/>
                  <span className="nav-itemdropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item text-main`} onClick={Logout} >
                    Logout <FiLogOut className="fs-4 pb-1 cursor-pointer"/>
                    </Link>
                  </span>
                </div>
                <span className='position-relative'>
                  {IsUnread ? <span className='unReadNotification rounded-circle'></span> : null}
                  <Icon size={20} icon={bell} className="main-grey-text me-2 cursor-pointer" onClick={()=>{setVisibleSidebar(!visibleSidebar); readAllNotifications()}} ></Icon>
                </span>
                <Icon size={22} icon={heart} className="main-grey-text me-2 cursor-pointer" onClick={()=>navigate('/WishList')} ></Icon>
                <span className="cart-icon position-relative me-1 main-grey-text d-flex align-items-center">
                  <Icon onClick={()=> navigate('/MyCart')} size={22} icon={ic_local_mall} className="me-1 cursor-pointer" ></Icon>
                  {numbOfCartItems > 0 &&<span className='main-orange-bg text-white cart-num rounded-circle d-flex align-items-center justify-content-center p-2'>{numbOfCartItems}</span> } 
                </span>
              </> :
                <span className='dark-blue-text cursor-pointer text-uppercase' onClick={()=> navigate('/Authorization')}>Have an Acount ?
                  <AiOutlineLogin size={22}  className="ms-1" />
                </span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
