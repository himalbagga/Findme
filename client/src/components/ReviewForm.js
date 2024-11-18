import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({ title: '', review: '' });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // send form data to bacend hear
    try {
      const response = await axios.post('http://localhost:5001/api/reviews', {
        title: formData.title,
        review: formData.review,
        rating,
      });
      console.log('Review submitted successfully:', response.data);
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Write a Review</h5>
              <h6 className="card-subtitle mb-2 text-muted">Share your experience</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Review Title</label>
                  <input type="text" className="form-control" id="title" value={formData.title} onChange={handleInputChange} placeholder="Summarize your experience" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label">Your Review</label>
                  <textarea className="form-control" id="review" value={formData.review} onChange={handleInputChange} rows="3" placeholder="Tell us what you liked or disliked" required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <div className="d-flex">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <Star
                          key={index}
                          size={24}
                          onClick={() => setRating(ratingValue)}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                          fill={ratingValue <= (hover || rating) ? "gold" : "none"}
                          stroke={ratingValue <= (hover || rating) ? "gold" : "currentColor"}
                          style={{ cursor: 'pointer', marginRight: '5px' }}
                        />
                      );
                    })}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}