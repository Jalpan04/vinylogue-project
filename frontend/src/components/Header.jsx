import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png'; // 1. Import your logo image
import './Header.css';

const Header = ({ userInfo, setUserInfo }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <header className="site-header">
            <Link to="/" className="logo-link">
                {/* 2. Replace the text with an img tag */}
                <img src={logoImage} alt="Vinylogue Logo" className="logo-image" />
            </Link>
            <nav>
                {userInfo ? (
                    <>
                        <span className="user-greeting">Hi, {userInfo.username}</span>
                        <button onClick={logoutHandler} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;