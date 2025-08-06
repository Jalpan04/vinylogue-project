const express = require('express');
const router = express.Router();
const { createAlbumReview, getReviewsForAlbum } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAlbumReview);
router.route('/:albumId').get(getReviewsForAlbum);

module.exports = router;