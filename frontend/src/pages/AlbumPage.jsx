import React, { useState, useEffect, useId } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AlbumPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Star = ({ fillPercentage, size, ...props }) => {
    const starId = useId();
    const clipPathId = `clip-${starId}`;
    const sharpStarPath = "M10 1 L12.24 7.18 L19 7.18 L13.88 11.36 L16.12 17.54 L10 13.36 L3.88 17.54 L6.12 11.36 L1 7.18 L7.76 7.18 Z";

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" {...props} aria-hidden="true">
            <defs>
                <clipPath id={clipPathId}>
                    <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
                </clipPath>
            </defs>
            <path d={sharpStarPath} className="star-background" fill="currentColor" />
            <path d={sharpStarPath} className="star-foreground" fill="currentColor" clipPath={`url(#${clipPathId})`} />
        </svg>
    );
};


const AlbumPage = ({ userInfo }) => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0); // The final selected rating (0-5)
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [hover, setHover] = useState(0); // The currently hovered rating (0-5)

    useEffect(() => {
        const fetchAlbumAndReviews = async () => {
            try {
                setLoading(true);
                const albumRes = await axios.get(`${API_URL}/api/spotify/album/${id}`);
                setAlbum(albumRes.data);

                const reviewsRes = await axios.get(`${API_URL}/api/reviews/${id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                setError('Failed to load album data.');
            } finally {
                setLoading(false);
            }
        };
        fetchAlbumAndReviews();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            setError('You must be logged in to leave a review.');
            return;
        }

        if (rating === 0) {
            setError('Please select a rating before submitting.');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const reviewData = {
                albumId: album.id,
                albumName: album.name,
                albumArtist: album.artists.map(a => a.name).join(', '),
                albumCover: album.images[0].url,
                rating: Number(rating),
                reviewText,
            };

            await axios.post(`${API_URL}/api/reviews`, reviewData, config);

            const reviewsRes = await axios.get(`${API_URL}/api/reviews/${id}`);
            setReviews(reviewsRes.data);
            setReviewText('');
            setRating(0);
            setHover(0);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review.');
        }
    };

    // --- UPDATED RATING LOGIC FOR 0.5 STEPS ---
    const handleMouseMove = (e, index) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - left;

        // If mouse is in the left half, it's a half rating (e.g., 2.5)
        // If mouse is in the right half, it's a full rating (e.g., 3.0)
        if (mouseX < width / 2) {
            setHover(index + 0.5);
        } else {
            setHover(index + 1);
        }
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = () => {
        setRating(hover);
    };

    const activeRating = hover || rating;

    if (loading) return <p className="message">Loading...</p>;
    if (error && !album) return <p className="message">{error}</p>;

    return (
        <div className="album-page-grid">
            <div className="album-info-col">
                {album && (
                    <>
                        <img src={album.images[0].url} alt={album.name} className="album-cover-large" />
                        <h1>{album.name}</h1>
                        <h2>{album.artists.map(a => a.name).join(', ')}</h2>
                        <p>{album.release_date.substring(0, 4)}</p>
                        <h3>Tracklist</h3>
                        <ol className="tracklist">
                            {album.tracks.items.map(track => <li key={track.id}>{track.name}</li>)}
                        </ol>
                    </>
                )}
            </div>

            <div className="album-reviews-col">
                <h2>Reviews</h2>
                {userInfo ? (
                    <form onSubmit={submitHandler} className="review-form">
                        <h3>Leave Your Review</h3>
                        {error && <p className="message error">{error}</p>}
                        <div className="form-group">
                            <label>Rating: {activeRating > 0 ? `${activeRating.toFixed(1)} / 5.0` : 'None'}</label>

                            <div
                                className="star-rating"
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClick}
                            >
                                {[...Array(5)].map((_, index) => {
                                    let fillPercentage;
                                    if (activeRating >= index + 1) {
                                        fillPercentage = 100; // Full star
                                    } else if (activeRating === index + 0.5) {
                                        fillPercentage = 50;  // Half star
                                    } else {
                                        fillPercentage = 0;   // Empty star
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className="star-wrapper"
                                            onMouseMove={(e) => handleMouseMove(e, index)}
                                        >
                                            <Star
                                                fillPercentage={fillPercentage}
                                                size={32}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reviewText">Review (Optional)</label>
                            <textarea
                                id="reviewText"
                                rows="4"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                ) : <p className="message">Please log in to leave a review.</p>}

                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <strong>{review.username}</strong>
                                    <div className="review-rating-display">
                                        {[...Array(5)].map((_, index) => {
                                            let fillPercentage = 0;
                                            if (review.rating >= index + 1) {
                                                fillPercentage = 100;
                                            } else if (review.rating === index + 0.5) {
                                                fillPercentage = 50;
                                            }
                                            return <Star key={index} fillPercentage={fillPercentage} size={20} />
                                        })}
                                        <span className="review-rating-text">{review.rating.toFixed(1)} / 5.0</span>
                                    </div>
                                </div>
                                <p>{review.reviewText}</p>
                            </div>
                        ))
                    ) : <p>No reviews yet. Be the first!</p>}
                </div>
            </div>
        </div>
    );
};

export default AlbumPage;