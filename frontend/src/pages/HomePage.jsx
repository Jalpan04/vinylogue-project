import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const HomePage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Find and rate your favorite music.');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setMessage('');
        try {
            const { data } = await axios.get(`${API_URL}/api/spotify/search?query=${query}`);
            if (data.length === 0) {
                setMessage(`No results found for "${query}"`);
            }
            setResults(data);
        } catch (err) {
            setMessage('Failed to fetch albums. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <h1>Search Albums</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., Abbey Road, Kendrick Lamar..."
                />
                <button type="submit" disabled={loading}>{loading ? '...' : 'Search'}</button>
            </form>

            {message && <p className="message">{message}</p>}

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