import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ title, review, rating, createdAt }) => {
    return (
        <div className='review-card'>
            <h5>{title}</h5>
            <p>{review}</p>
            <div className='rating'>
                {[...Array(5).map((_, index) => {
                    const ratingValue = index + 1;

                    return (
                        <Star
                            key={index}
                            size={18}
                            fill={ratingValue <= rating ? "gold" : "none"}
                            stroke={ratingValue <= rating ? "gold" : "currentColor"}
                            style={{ marginRight: '5px' }}
                        />
                    );
                })]}
            </div>
            <p><em>{new Date(createdAt).toLocaleDateString()}</em></p>
        </div>
    );
};

export default ReviewCard;