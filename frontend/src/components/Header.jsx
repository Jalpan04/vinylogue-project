import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <Link to="/" className="logo">
                Vinylogue 💿
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