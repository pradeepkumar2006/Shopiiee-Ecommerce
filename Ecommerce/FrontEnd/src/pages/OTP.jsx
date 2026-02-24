import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const OTP = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { verifyOtp, user } = useShop();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [user, navigate]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 4) return;

        setLoading(true);
        const result = await verifyOtp(otpValue);
        setLoading(false);

        if (result.success) {
            navigate('/products');
        } else {
            setError(result.message || 'Incorrect OTP');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Code</h1>
                <p className="text-gray-500 mb-8">
                    We have sent the verification code to your mobile number ending in {user?.mobile?.slice(-4)}
                </p>

                <form onSubmit={handleVerify} className="space-y-8">
                    <div className="flex justify-between gap-2">
                        {otp.map((data, index) => (
                            <input
                                className="w-14 h-14 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    {timer > 0 ? (
                        <p className="text-gray-500">Resend code in 00:{timer < 10 ? `0${timer}` : timer}</p>
                    ) : (
                        <button
                            onClick={() => setTimer(30)}
                            className="text-black font-semibold hover:underline"
                        >
                            Resend Code
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OTP;
