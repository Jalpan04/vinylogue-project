import React from 'react';
import './StarRating.css';

const Star = ({ filled, half, onClick, onMouseEnter, onMouseLeave }) => (
    <span
        className="star"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
    {half ? '◐' : filled ? '★' : '☆'}
  </span>
);

const StarRating = ({ rating, setRating }) => {
    const hoverRating = (newRating) => {
        // We can add a hover effect here if desired
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((starValue) => (
                <Star
                    key={starValue}
                    filled={rating >= starValue}
                    half={rating === starValue - 0.5}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => hoverRating(starValue)}
                    onMouseLeave={() => hoverRating(0)}
                />
            ))}
            <span className="rating-value">{rating * 2}/10</span>
        </div>
    );
};

export default StarRating;