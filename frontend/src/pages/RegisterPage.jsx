import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const RegisterPage = ({ setUserInfo }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State is now an object to hold field-specific errors
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        // Clear previous errors
        setErrors({});

        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        setLoading(true);
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
            // Set errors from the backend response, or a general error
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: err.response?.data?.message || 'An error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            {/* Display a general error if one exists */}
            {errors.general && <p className="auth-error">{errors.general}</p>}

            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} required
                    />
                    {/* Display username-specific error */}
                    {errors.username && <p className="field-error">{errors.username}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email" id="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                    />
                    {/* Display email-specific error */}
                    {errors.email && <p className="field-error">{errors.email}</p>}
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
                    {/* Display password confirmation error */}
                    {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p className="auth-redirect-link">
                Have an Account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;