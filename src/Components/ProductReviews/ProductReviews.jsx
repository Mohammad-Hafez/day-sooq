import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import StarRating from '../StarRating/StarRating';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import AddReview from '../AddReview/AddReview';
import AllComments from '../AllComments/AllComments';

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

  const { data, isLoading, isError , refetch:refetchRatings } = useQuery('get-ratings', getRating);

  const totalNumberOfReviews = data?.data?.ratingReviews?.reduce((acc, review) => acc + review.nunmberOfRating, 0);
  let averageRating = data?.data?.ratingReviews?.reduce((acc, review) => acc + review.avgRating, 0) / totalNumberOfReviews;

  if (isNaN(averageRating) || totalNumberOfReviews === 0) {
    averageRating = 0; 
  }

  if (!isNaN(averageRating)) {
    averageRating = Math.abs(averageRating % 1) === 0.5 ? Math.floor(averageRating) + 0.5 : Math.round(averageRating);
  }

  return (
    <div className="container">
      <div className="row brdr border-0 border-bottom rounded-0 pb-4">
        <div className="col-md-6">
          <h5 className='fw-bolder dark-grey-text'>Product Ratings:</h5>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching ratings</p>}
          {data && (
            <div>
              <div className="avrg d-flex align-items-center">
                <p className="mb-0 me-2">Average Rating:</p>
                <StarRating averageRating={averageRating} />
                <span className='dark-grey-text ms-2'>{averageRating}</span>
                <span className='ms-2 fs-6'>({totalNumberOfReviews} Reviews)</span>
                
              </div>
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
        <div className="col-md-6">
        <AddReview IoIosStar={ IoIosStar} IoIosStarOutline={IoIosStarOutline} product={product} refetch={refetchRatings} />
      </div>
      </div>
      <AllComments product={product._id} refetchRatings={refetchRatings} />
    </div>
  );
}
