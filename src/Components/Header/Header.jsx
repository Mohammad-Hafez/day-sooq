import React from 'react' ;
import { Icon } from 'react-icons-kit'
import {socialTwitter} from 'react-icons-kit/ionicons/socialTwitter' ;
import {facebook_1} from 'react-icons-kit/ikons/facebook_1';
import {youtube} from 'react-icons-kit/ikons/youtube'
import {instagram} from 'react-icons-kit/entypo/instagram'
import {text_justify} from 'react-icons-kit/ikons/text_justify'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {heart} from 'react-icons-kit/ionicons/heart'
import {androidPerson} from 'react-icons-kit/ionicons/androidPerson'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import {ic_local_mall} from 'react-icons-kit/md/ic_local_mall'
export default function Header() {
  return<>
  <div className="container d-flex flex-column justify-content-center mb-3">
      <div className="topHeader d-flex align-items-center justify-content-between position-relative mt-1 mb-3 pb-2">
        <div className="lang light-grey-text border-0 border-end pe-3 "><i className="fa-solid fa-globe me-1 rotate small-icon cursor-pointer"></i><span className='cursor-pointer'>Languages</span></div>
        <div className="social light-grey-text">
          <span><Icon className='mx-1 cursor-pointer' icon={facebook_1} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={instagram} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={socialTwitter} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={youtube} size={16}></Icon></span>
        </div>
      </div>
      <div className="search-header">
        <div className="row align-items-center">
          <div className="col-sm-3">
            <div className="logo d-flex align-items-center justify-content-around">
              <span><Icon icon={text_justify} className='main-grey-text'></Icon></span>
              <span><h3 className='p-0 m-0'><Link className='logo text-decoration-none font-quest dark-blue-text m-0 p-0' to={''}>Electrobile <span className='font-Rowdies main-orange-text'>Souq</span></Link> </h3></span> 
            </div>
          </div>
          <div className="col-sm-6">
            <div className="headerSearchInput">
              <div className="p-inputgroup brdr-blue rounded-pill">
                <InputText placeholder="Search for Products" className='nav-search position-relative border-0 ms-3'/>
                <Dropdown optionLabel="name" placeholder="All Categories" className='nav-dropDown border-0 main-orange-text'/>
                <Button  icon="pi pi-search" className='main-orange-bg border-0 rounded-end-pill text-light'/>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="profileContainer d-flex align-items-center justify-content-center">
              <Icon size={22} icon={androidPerson} className='main-grey-text me-2 cursor-pointer'></Icon>
              <Icon size={22} icon={heart} className='main-grey-text me-2 cursor-pointer'></Icon>
              <Icon size={22} icon={ic_local_mall} className='main-grey-text me-2 cursor-pointer'></Icon>
            </div>
          </div>
        </div>
      </div>
  </div>
  <Navbar/>
  </>
}
