// src/components/NavBar.jsx

import React from 'react';

const NavBar = () => {
    const handleRefresh = () => {
        window.location.reload(); // Refresh the page manually
    };

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <div className="text-lg font-semibold">Recipe Tracker</div>
            <button
                onClick={handleRefresh}
                className="bg-blue-700 hover:bg-blue-600 py-2 px-4 rounded-md"
            >
                Refresh
            </button>
        </nav>
    );
};

export default NavBar;
