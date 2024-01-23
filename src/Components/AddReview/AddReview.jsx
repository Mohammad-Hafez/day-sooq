import axios from 'axios';
import React, { useState } from 'react';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { toast } from 'react-hot-toast';

export default function AddReview({ IoIosStar, product , refetch}) {
  const user = localStorage.getItem("DaySooqUser");
  const [rating, setRating] = useState(0);
  const [ReviewStatus, setReviewStatus] = useState('Your Review');
  const [reviewText, setReviewText] = useState('');
  const headers = {
    'Authorization': `Bearer ${user}`
  };
  const addReview = async () => {
    try {
      const reviewData = {
        review: reviewText,
        rating: rating,
        product: product._id
      };
      const {data} = await axios.post(ApiBaseUrl + 'reviews', reviewData, { headers });
      refetch()
      setRating(0);
      setReviewText('');
      toast.success('Your Review Added Successfully.', {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
    });

    } catch (error) {
      toast.error("An Error Occured, Please Try Again.", {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
      });  

      console.error('Error adding review', error);
    }
  };

  const selectStars = (star)=>{
    setRating(star)
    switch (star) {
      case 1:
        setReviewStatus ('Unacceptable');
        break;
      case 2:
        setReviewStatus ( 'Weak');
        break;
      case 3:
        setReviewStatus ( 'Acceptable');
        break;
      case 4:
        setReviewStatus ( 'Good');
        break;
      case 5:
        setReviewStatus ( 'Excellent');
        break;
      default:
        setReviewStatus ('Your Review');
    }
  }
  return (
    <>
      <div className="addReviw border-start px-4 d-flex flex-column align-items-start justify-content-start h-100">
        <h5 className='dark-grey-text fw-bolder mb-3'>Add Review</h5>
        <div className="addStarsContainer mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <IoIosStar
              key={star}
              className={`cursor-pointer makeStar fs-5 ${star <= rating ? 'star' : 'light-grey-text'}`}
              onClick={() => selectStars(star)}              
            />
          ))}
          <span className='ms-3'>({ReviewStatus})</span>
        </div>
        <textarea
          rows="4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="form-control mb-3 reviewComment"
          style={{resize:'none'}}
        /> 
        <button className="btn dark-blue-btn rounded-pill px-4 text-light" onClick={addReview}>
          Submit Review
        </button>
      </div>
    </>
  );
}

