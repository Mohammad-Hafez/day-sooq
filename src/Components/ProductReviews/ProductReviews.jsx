import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import StarRating from '../StarRating/StarRating';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

const generateFixedRatings = (ratingReviews) => {
  const fixedRatings = Array.from({ length: 5 }, (_, index) => {
    const foundRating = ratingReviews.find((review) => review.rating === index + 1);
    return foundRating ? foundRating.nunmberOfRating : 0;
  });
  return fixedRatings;
};

export default function ProductReviews({ product }) {
  const getRating = async () => {
    const response = await axios.get(ApiBaseUrl + `reviews/rating/${product._id}`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery('get-ratings', getRating);

  let  averageRating = data?.data?.ratingReviews?.reduce((acc, review) => acc + review.avgRating, 0) / data?.data?.ratingReviews?.length
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h5>Product Ratings:</h5>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching ratings</p>}
          {data && (
            <div>
              <div className="avrg d-flex align-items-center">
                <p className="mb-0 me-2">Average Rating:</p>
                <StarRating averageRating={'2.5'} />
                <span className='dark-grey-text ms-2'>{averageRating}</span>
                <span className='ms-2 fs-6'>({data.data.ratingReviews.length} Reviews)</span>
                
              </div>
              <p className="mb-0">Ratings Distribution:</p>
              <ul className="distribution-rate">
                {generateFixedRatings(data.data.ratingReviews).map((numberOfRating, index) => (
                  <li key={index} className="d-flex m-0 p-0 star my-1 align-items-center">
                    {[...Array(index + 1)].map((_, i) => (
                      <IoIosStar key={i} />
                    ))}
                    {[...Array(5 - index - 1)].map((_, i) => (
                      <IoIosStarOutline key={i} />
                    ))}
                    <span className="ms-2 light-grey-text">({numberOfRating})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-sm-6">{/* Additional content for the second column, if needed */}</div>
      </div>
    </div>
  );
}
