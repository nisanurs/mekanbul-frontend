import React, { useState } from 'react';

const AddRating = ({ onRate }) => {
  const [hover, setHover] = useState(0); // Mouse üzerindeyken hangi yıldızda?
  const [rating, setRating] = useState(0); // Kaç yıldız seçildi?

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => { setRating(index); onRate(index); }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '25px' }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default AddRating;