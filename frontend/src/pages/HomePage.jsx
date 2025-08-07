import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const HomePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Find and rate your favorite music.');

    // This useEffect hook runs whenever the 'query' state changes
    useEffect(() => {
        // Don't search if the query is empty
        if (!query.trim()) {
            setResults([]);
            setMessage('Find and rate your favorite music.');
            return;
        }

        setLoading(true);

        // Set a timer to wait 300ms after the user stops typing
        const searchTimer = setTimeout(async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/spotify/search?query=${query}`);
                if (data.length === 0) {
                    setMessage(`No results found for "${query}"`);
                }
                setResults(data);
            } catch (err) {
                // Handle the 429 error gracefully
                if (err.response && err.response.status === 429) {
                    setMessage('Too many requests. Please wait a moment.');
                } else {
                    setMessage('Failed to fetch albums. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms delay

        // This is the cleanup function: it clears the timer if the user types again
        return () => clearTimeout(searchTimer);

    }, [query]); // The hook depends on the 'query'

    return (
        <div className="home-page">
            <h1>Search Albums</h1>
            {/* The form is no longer needed, just the input */}
            <div className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Start typing an album or artist..."
                />
            </div>

            {loading && <p className="message">Searching...</p>}
            {!loading && message && <p className="message">{message}</p>}

            <div className="search-results">
                {results.map((album) => (
                    <Link to={`/album/${album.id}`} key={album.id} className="album-card">
                        <img src={album.images[0]?.url} alt={album.name} loading="lazy" />
                        <h3>{album.name}</h3>
                        <p>{album.artists.map((artist) => artist.name).join(', ')}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;