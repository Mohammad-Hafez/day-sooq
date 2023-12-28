import React from 'react'
import { Icon } from 'react-icons-kit'
import {socialTwitter} from 'react-icons-kit/ionicons/socialTwitter' ;
import {facebook_1} from 'react-icons-kit/ikons/facebook_1';
import {youtube} from 'react-icons-kit/ikons/youtube'
import {instagram} from 'react-icons-kit/entypo/instagram'

export default function TopHeaderInfo() {
  return <>
    <div className="topHeader d-flex align-items-center justify-content-between position-relative mt-1 mb-3 pb-2">
        <div className="lang light-grey-text border-0 border-end pe-3 "><i className="fa-solid fa-globe me-1 rotate small-icon cursor-pointer"></i><span className='cursor-pointer'>Languages</span></div>
        <div className="social light-grey-text">
          <span><Icon className='mx-1 cursor-pointer' icon={facebook_1} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={instagram} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={socialTwitter} size={16}></Icon></span>
          <span><Icon className='mx-1 cursor-pointer' icon={youtube} size={16}></Icon></span>
        </div>
      </div>

    </>
}
