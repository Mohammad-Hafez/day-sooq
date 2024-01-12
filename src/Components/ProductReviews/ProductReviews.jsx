import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ApiBaseUrl } from '../ApiBaseUrl';
import StarRating from '../StarRating/StarRating';

export default function ProductReviews({ product }) {
  // Define a function to fetch product ratings
  const getRating = async () => {
    const response = await axios.get(ApiBaseUrl + `reviews/rating/${product._id}`);
    return response.data; // Assuming the response contains the product ratings
  };

  // Use React Query to fetch data
  const { data, isLoading, isError } = useQuery('get-ratings', getRating);

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
              <p className='mb-0 me-2'>Average Rating:</p>
              <StarRating averageRating={data.data.ratingReviews.reduce((acc, review) => acc + review.avgRating, 0) / data.data.ratingReviews.length} />
              </div>
              <p className='mb-0'>Ratings Distribution:</p>
              <ul className=''>
                {data.data.ratingReviews.map((review, index) => (
                  <li key={index} className='d-flex m-0 p-0'>
                    <StarRating averageRating={review.avgRating} /> 
                    <p className='ms-2'>({review.nunmberOfRating})</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-sm-6">
          {/* Additional content for the second column, if needed */}
        </div>
      </div>
    </div>
  );
}
