import React, { useEffect } from 'react'
import img1 from '../../assets/6058a70910ae31c1bbcb06ed5792f274.png'
import img2 from '../../assets/b96a8f62f6fb6ab9082a364fc4ae74da.png'
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl , ImgBaseURL } from '../ApiBaseUrl';

export default function StaticProducts() {
  const getBanners = () => {
    return axios.get(ApiBaseUrl + `banners`);
  };

  let { data } = useQuery('mainBanner', getBanners);
  const ad = data?.data?.data?.data.filter(item => item.type === 'ads');
  return <>
  <div className="container mb-5">
    <div className="row g-3">
      <div className="col-md-6">
        <div className="staticProductLeft d-flex align-items-center justify-content-around p-2">
          <div className="title">
            <h4 className='font-roboto white-text'>
            PORTABLE SPEAKERS
              <br />
              COLLECTION <span className='fw-bold'>2024</span>
            </h4>
          </div>
          <div className="staticProductImg">
            {ad ? <img src={ImgBaseURL + ad[0]?.image} alt="speaker"  /> : null}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="staticProductRight d-flex align-items-center justify-content-around p-2">
          <div className="title">
            <h4 className='font-roboto white-text'>
              ALL ACCESSORIES
              <br />
              FOR <span className='fw-bold'>GAMERS</span>
            </h4>
          </div>
          <div className="staticProductImg">
          {ad ? <img src={ImgBaseURL + ad[1]?.image} alt="ps-controller"  /> : null}
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
}
