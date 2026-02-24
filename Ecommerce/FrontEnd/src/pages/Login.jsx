import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Eye, EyeOff, Mail, Lock, Phone } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', mobile: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, register, showToast } = useShop();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (isLogin) {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                showToast('Login Successful!', 'success');
                navigate('/products');
            } else {
                setError(result.message);
            }
        } else {
            const result = await register(formData.email, formData.password, formData.mobile);
            if (result.success) {
                showToast('Account Created! Please Login.', 'success');
                setIsLogin(true);
            } else {
                setError(result.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white animate-fade-in">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-500 mb-8">
                    {isLogin ? 'Enter your details to sign in' : 'Sign up to get started'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1">
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Mobile (Register Only) */}
                        {!isLogin && (
                            <div className="relative animate-fade-in">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                                    value={formData.mobile}
                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-400 shadow-xl shadow-black/10 mt-2"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(''); }}
                            className="font-bold text-black hover:underline ml-1"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
