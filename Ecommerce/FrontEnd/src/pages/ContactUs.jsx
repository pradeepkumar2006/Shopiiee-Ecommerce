import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ContactUs = () => {
    const navigate = useNavigate();
    const { showToast } = useShop();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                showToast("Your message has been sent successfully!", "success");
                setFormData({ name: '', email: '', message: '' });
            } else {
                showToast("Failed to send message. Please try again later.", "error");
            }
        } catch (e) {
            showToast("Network error. Could not connect to the server.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                        <ArrowLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-gray-900">Contact Us</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-10 lg:py-16">
                <div className="text-center mb-10">
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">GET IN <span className="text-[#F42C37]">TOUCH</span></h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">We're here to help! Send us your inquiries or feedback and our team will get back to you within 24 hours.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Contact Info */}
                    <div className="bg-white p-8 lg:p-12 rounded-[30px] shadow-sm flex flex-col justify-center">
                        <h3 className="text-2xl font-black text-gray-900 mb-8">Contact Information</h3>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl flex-shrink-0">
                                    <MapPin className="text-[#F42C37] h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Address</h4>
                                    <p className="text-gray-500 mt-1">123 E-Commerce Blvd, Tech City, India 600001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl flex-shrink-0">
                                    <Phone className="text-[#F42C37] h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Phone</h4>
                                    <p className="text-gray-500 mt-1">+91 98765 43210</p>
                                    <p className="text-gray-500 mt-1 text-sm">(Mon-Fri: 9 AM to 6 PM)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl flex-shrink-0">
                                    <Mail className="text-[#F42C37] h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                                    <p className="text-gray-500 mt-1">support@shopiee.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 lg:p-12 rounded-[30px] shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-sm md:text-base">
                            <div className="flex flex-col gap-1.5">
                                <label className="font-bold text-gray-800">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    placeholder="John Doe"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#F42C37]/30 transition-all font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="font-bold text-gray-800">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    placeholder="johndoe@example.com"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#F42C37]/30 transition-all font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 mb-2">
                                <label className="font-bold text-gray-800">Your Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    placeholder="How can we help you?"
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#F42C37]/30 transition-all font-medium resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#F42C37] text-white font-bold text-lg rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-black transition-colors active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md w-full"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message
                                        <Send className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
