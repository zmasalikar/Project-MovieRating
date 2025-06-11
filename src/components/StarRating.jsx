import React, { useState } from "react";

const StarRating = ({ movieId, initialRating = 0, readOnly = false }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (value) => {
    if (readOnly) return;
    setRating(value);
    localStorage.setItem(movieId, value);
  };

  return (
    <div className="flex space-x-1 mt-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          className={`cursor-pointer text-xl ${
            value <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
