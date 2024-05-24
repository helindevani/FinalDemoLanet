import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

const StarRating = ({ onChange, size }: any) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value : any) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col items-center">
      <p className='m-2'>Give Your Rating To Staff</p>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => handleStarClick(starValue)}
              className="cursor-pointer m-2"
            >
              {starValue <= rating ? (
                <BsStarFill className={`text-yellow-500 text-${size}`} />
              ) : (
                <BsStar className={`text-yellow-500 text-${size}`} />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;