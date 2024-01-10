import React from 'react';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ averageRating }) => {
  const maxStars = 5;
  const roundedRating = Math.round(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;

        if (starValue <= roundedRating) {
          return <span key={index} className="star-icon star-filled star"><IoIosStar/></span>;
        } else if (hasHalfStar && starValue === roundedRating + 1) {
          return <span key={index} className="star-icon star-half star"><IoIosStarHalf/></span>;
        } else {
          return <span key={index} className="star-icon star-outline star"><IoIosStarOutline/></span>;
        }
      })}
    </div>
  );
};

export default StarRating;
