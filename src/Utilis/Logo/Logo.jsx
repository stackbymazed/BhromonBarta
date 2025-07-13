import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <img
                src="https://i.ibb.co/ycDfP4ts/bromon-Barta.png"
                alt="logo"
                className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">BhromonBarta</span>
        </div>
    );
};

export default Logo;