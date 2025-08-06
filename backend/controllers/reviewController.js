// /backend/controllers/reviewController.js

const Review = require('../models/reviewModel');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createAlbumReview = async (req, res) => {
    const { rating, reviewText, albumId, albumName, albumArtist, albumCover } = req.body;

    if (!rating || !albumId) {
        return res.status(400).json({ message: 'Rating and Album ID are required.' });
    }

    const alreadyReviewed = await Review.findOne({ user: req.user._id, albumId });

    if (alreadyReviewed) {
        return res.status(400).json({ message: 'Album already reviewed' });
    }

    const review = new Review({
        user: req.user._id,
        username: req.user.username,
        rating: Number(rating),
        reviewText,
        albumId,
        albumName,
        albumArtist,
        albumCover,
    });

    try {
        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(400).json({ message: 'Could not save review', error: error.message });
    }
};

// @desc    Get reviews for an album
// @route   GET /api/reviews/:albumId
// @access  Public
const getReviewsForAlbum = async (req, res) => {
    try {
        const reviews = await Review.find({ albumId: req.params.albumId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ message: 'Could not fetch reviews', error: error.message });
    }
};

// This is the crucial part!
module.exports = { createAlbumReview, getReviewsForAlbum };