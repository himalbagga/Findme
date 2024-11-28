const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route   POST /api/reviews
// @desc    Save a review
router.post('/', async (req, res) => {
  try {
    const { title, review, rating } = req.body;

    const newReview = new Review({
      title,
      review,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review saved successfully' });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Failed to save review' });
  }
});

// @route   GET /api/reviews
// @desc    Get all reviews
router.get('/reviews/:userId', async (req, res) => {
  try {
    const { userId } = req.params.userId;
    const reviews = await Review.find({ userId: req.params.userId });
    
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this user." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

module.exports = router;