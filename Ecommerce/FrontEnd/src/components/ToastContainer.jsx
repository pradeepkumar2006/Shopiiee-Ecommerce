import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, XCircle } from 'lucide-react';

const ToastContainer = () => {
    const { toast } = useShop();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (toast) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [toast]);

    if (!toast) return null;

    return (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg border ${toast.type === 'error'
                    ? 'bg-red-50 border-red-100 text-red-800'
                    : 'bg-black text-white border-gray-800'
                }`}>
                {toast.type === 'error'
                    ? <XCircle className="w-4 h-4" />
                    : <CheckCircle className="w-4 h-4" />
                }
                <span className="text-sm font-medium">{toast.message}</span>
            </div>
        </div>
    );
};

export default ToastContainer;
