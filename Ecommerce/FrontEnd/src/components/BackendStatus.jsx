import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const BackendStatus = () => {
    const [status, setStatus] = useState('checking'); // checking, connected, disconnected

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    setStatus('connected');
                } else {
                    setStatus('disconnected');
                }
            } catch (e) {
                setStatus('disconnected');
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, []);

    if (status === 'connected') return null; // Hide if connected to keep UI clean, or show a small dot

    return (
        <div className={`fixed bottom-20 right-4 z-50 px-3 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold transition-colors ${status === 'connected'
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
            {status === 'connected' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {status === 'connected' ? 'Backend Live' : 'Backend Disconnected'}
        </div>
    );
};

export default BackendStatus;
