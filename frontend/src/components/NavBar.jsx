import React from 'react';

const NavBar = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <nav className="bg-yellow-400 p-4 text-white flex justify-between items-center">
            <div className="flex-1 text-center text-lg font-semibold lg:text-3xl">
                Recipe Log
            </div>
            <button
                onClick={handleRefresh}
                className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md"
            >
                Refresh
            </button>
        </nav>

    );
};

export default NavBar;
