import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const RegisterPage = ({ setUserInfo }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post(
                `${API_URL}/api/users/register`,
                { username, email, password },
                config
            );
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <h1>Sign Up</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password" id="confirmPassword" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Have an Account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;