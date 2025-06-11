// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <div className="max-w-md">
                <div className="mb-6">
                    <img
                        src="public/undraw_page-not-found_6wni.svg" // Replace with your SVG or illustration path
                        alt="Page not found"
                        className="w-64 mx-auto"
                    />
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-2">Page not found</h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for might have been moved, deleted, or never existed.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
