import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Banknote, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart, showToast, placeOrder, user } = useShop();

    const isFromCart = state?.fromCart;
    const directProduct = state?.product;
    const directQuantity = state?.quantity;

    const orderItems = isFromCart ? cart : (directProduct ? [{ ...directProduct, quantity: directQuantity }] : []);

    if (orderItems.length === 0) {
        setTimeout(() => navigate('/products'), 0);
        return null;
    }

    const totalAmount = isFromCart ? getCartTotal() : (directProduct.price * directQuantity);

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        paymentMethod: 'cod'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.mobile || !formData.address) {
            showToast('Please fill all details', 'error');
            return;
        }

        setIsSubmitting(true);
        const result = await placeOrder({
            items: orderItems,
            totalAmount,
            shippingDetails: { ...formData, email: user?.email || 'guest@shopiee.com' },
            paymentMethod: formData.paymentMethod
        });
        setIsSubmitting(false);

        if (result.success) {
            showToast(`Order Placed Successfully! Amount: ₹${totalAmount}`, 'success');
            if (isFromCart) clearCart();
            navigate('/orders');
        } else {
            showToast('Failed to place order. Try again.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 animate-fade-in">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors">
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold">Checkout</h1>
            </div>

            <div className="p-4 space-y-4">
                {/* Order Summary */}
                <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Order Summary
                    </h2>
                    <div className="space-y-4">
                        {orderItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <img src={item.image} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm line-clamp-1">{item.name}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                        <p className="font-bold text-sm">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="border-t border-dashed border-gray-200 pt-3 mt-3 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Total Amount</span>
                            <span className="text-lg font-bold text-black">₹{totalAmount}</span>
                        </div>
                    </div>
                </section>

                {/* Shipping Form */}
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                    <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Shipping Details</h2>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500 ml-1">Full Name</label>
                                <input
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all border border-transparent focus:border-gray-200"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500 ml-1">Mobile Number</label>
                                <input
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all border border-transparent focus:border-gray-200"
                                    placeholder="9876543210"
                                    type="tel"
                                    maxLength={10}
                                    required
                                    value={formData.mobile}
                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-gray-500 ml-1">Address</label>
                                <textarea
                                    className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all border border-transparent focus:border-gray-200 resize-none"
                                    placeholder="Street, City, Pincode"
                                    rows="3"
                                    required
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4">Payment Method</h2>
                        <div className="space-y-3">
                            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'upi' ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-100 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    className="accent-black w-5 h-5"
                                    checked={formData.paymentMethod === 'upi'}
                                    onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CreditCard className="h-4 w-4 text-gray-800" />
                                        <span className="font-semibold text-gray-900 text-sm">UPI / Card</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Pay securely via UPI or Cards</p>
                                </div>
                            </label>

                            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-100 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    className="accent-black w-5 h-5"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Banknote className="h-4 w-4 text-gray-800" />
                                        <span className="font-semibold text-gray-900 text-sm">Cash on Delivery</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Pay when you receive the order</p>
                                </div>
                            </label>
                        </div>
                    </section>
                </form>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                <div>
                    <p className="text-xs text-gray-500 font-medium">Total Payable</p>
                    <p className="text-2xl font-extrabold tracking-tight">₹{totalAmount}</p>
                </div>
                <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="bg-black text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/20 active:scale-95 transition-transform disabled:bg-gray-500"
                >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
