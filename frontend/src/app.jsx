import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';

function App() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    return (
        <div className="app-container">
            <Header userInfo={userInfo} setUserInfo={setUserInfo} />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage setUserInfo={setUserInfo} />} />
                    <Route path="/register" element={<RegisterPage setUserInfo={setUserInfo} />} />
                    <Route path="/album/:id" element={<AlbumPage userInfo={userInfo} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;