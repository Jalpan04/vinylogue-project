const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        username: { type: String, required: true }, // Store username for easy display
        albumId: { type: String, required: true }, // From Spotify
        albumName: { type: String, required: true },
        albumArtist: { type: String, required: true },
        albumCover: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 10 },
        reviewText: { type: String },
    },
    { timestamps: true }
);

// Ensure a user can only review an album once
reviewSchema.index({ user: 1, albumId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;