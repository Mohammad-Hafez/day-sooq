import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiBaseUrl, ImgBaseURL } from '../ApiBaseUrl';
import StarRating from '../StarRating/StarRating';

export default function AllComments({ product , refetchRatings}) {
  const getAllComments = () => {
    return axios.get(ApiBaseUrl + `reviews?product=${product}`);
  };

  const getRatingStatus = (rating) => {
    switch (rating) {
      case 1:
        return 'Unacceptable';
      case 2:
        return 'Weak';
      case 3:
        return 'Acceptable';
      case 4:
        return 'Good';
      case 5:
        return 'Excellent';
      default:
        return 'Unknown';
    }
  };

  let { data , refetch: refetchComments } = useQuery('getComments', getAllComments, { cacheTime: 1000000 });

  const handleRefetch = async () => {
    await refetchRatings();
    await refetchComments();
  };

  return (
    <>
      <div className="AllCommentsContainer">
        {data?.data?.data?.data.map((comment, index) => (
          <div key={index} className="comment mb-3 border-0 brdr border-bottom p-3 rounded-0 d-flex align-items-start justify-content-start">
            <div className="userImg me-5 font-Poppins d-flex flex-column justify-content-start align-items-center">
              <img src={ImgBaseURL + comment?.user?.image} loading="lazy" className="object-fit-contain rounded-circle" style={{ width: '5vw', minWidth: '35px' }} alt={comment?.user?.firstName + 'Image'} />
              <h5 className="fw-bolder dark-grey-text">{comment?.user?.firstName}</h5>
              <p className="fw-bold ">{comment?.createdAt?.slice(0, 10)}</p>
            </div>
            <div className="commentData">
              <h6 className="mb-1 commentStatus">{getRatingStatus(comment?.rating)}</h6>
              <StarRating averageRating={comment?.rating} />
              <p className="light-grey-text font-roboto">{comment?.review}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

