import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                        <ArrowLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-gray-900">About Us</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 lg:px-10 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1">
                        <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6">Who We Are</h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Welcome to <span className="text-[#F42C37] font-bold">SHOPIEE</span>, your number one source for all things electronics, fashion, and lifestyle. We're dedicated to giving you the very best of products, with a focus on dependability, customer service, and uniqueness.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Founded in 2024, SHOPIEE has come a long way from its beginnings. When we first started out, our passion for eco-friendly tech drove us to start our own business.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#F42C37] w-6 h-6" />
                                <span className="font-bold text-gray-800">Quality Assured</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#F42C37] w-6 h-6" />
                                <span className="font-bold text-gray-800">24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#F42C37] w-6 h-6" />
                                <span className="font-bold text-gray-800">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#F42C37] w-6 h-6" />
                                <span className="font-bold text-gray-800">Secure Payments</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="aspect-square bg-[#F42C37] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Team" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
                        </div>
                        <div className="absolute -z-0 bg-yellow-400 w-full h-full rounded-3xl top-6 left-6"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
