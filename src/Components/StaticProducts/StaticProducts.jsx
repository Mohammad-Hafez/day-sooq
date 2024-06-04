import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl';

export default function StaticProducts() {
  const getBanners = () => {
    return axios.get(ApiBaseUrl + `banners`);
  };

  let { data } = useQuery('mainBanner', getBanners);
  const ad = data?.data?.data?.data.filter(item => item.type === 'ads');

  const formatDescription = (description) => {
    if (!description) return { beforeLastWord: '', lastWord: '', rest: '' };

    const words = description.split(' ');
    if (words.length < 2) {
      return { beforeLastWord: '', lastWord: words[0] || '', rest: '' };
    }

    const lastWord = words.pop();
    const beforeLastWord = words.pop();
    const rest = words.join(' ');

    return { beforeLastWord, lastWord, rest };
  };

  const firstAd = formatDescription(ad && ad[0]?.description);
  const secondAD = formatDescription(ad && ad[1]?.description);

  return (
    <div className="container mb-5">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="staticProductLeft d-flex align-items-center justify-content-around p-2">
            <div className="title">
              <h4 className='font-roboto white-text text-capitalize'>
                <span className='text-capitalize d-block mb-1'>{firstAd?.rest}</span> 
                <span className='ms-3 me-2 text-capitalize'>{firstAd?.beforeLastWord}</span>
                <span className='fw-bold font-quest text-capitalize'> {firstAd?.lastWord}</span>
              </h4>
            </div>
            <div className="staticProductImg">
              {ad ? <img className='object-fit-contain' src={ImgBaseURL + `/${ad[0]?.image}`} alt={ad[0]?.description} /> : null}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="staticProductRight d-flex align-items-center justify-content-around p-2">
            <div className="title">
            <h4 className='font-roboto white-text text-capitalize'>
                <span className='text-capitalize d-block mb-1'>{secondAD?.rest}</span> 
                <span className='ms-3 me-2 text-capitalize'>{secondAD?.beforeLastWord}</span>
                <span className='fw-bold font-quest text-capitalize'> {secondAD?.lastWord}</span>
              </h4>
            </div>
            <div className="staticProductImg">
              {ad ? <img src={ImgBaseURL + ad[1]?.image} alt={ad[1]?.description} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
