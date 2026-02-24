import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation after mount
        const animTimer = setTimeout(() => setIsVisible(true), 100);

        // Finish splash screen after 3 seconds
        const finishTimer = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3500);

        return () => {
            clearTimeout(animTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-white overflow-hidden font-sans">
            <div
                className={`transform transition-all duration-1000 ease-out flex flex-col items-center ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-5'
                    }`}
            >
                {/* Brand Name */}
                <h1 className="text-6xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">
                    SHOPIEE
                </h1>

                {/* Tagline */}
                <p className="mt-3 text-sm font-medium text-gray-500 tracking-widest uppercase">
                    Shop Smart. Live Better.
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;
