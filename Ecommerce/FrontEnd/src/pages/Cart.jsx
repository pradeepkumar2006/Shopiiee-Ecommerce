import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold">My Cart</h1>
                <span className="ml-auto text-sm text-gray-500 font-medium">{cart.length} Items</span>
            </div>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-6 text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors active:scale-95"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="p-4 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-bold text-lg">₹{item.price}</span>

                                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 hover:bg-white rounded transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 hover:bg-white rounded transition-colors"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-gray-500 font-medium">Total Price</span>
                        <span className="text-2xl font-extrabold">₹{getCartTotal()}</span>
                    </div>
                    <button
                        onClick={() => navigate('/checkout', { state: { fromCart: true } })}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-black/20"
                    >
                        Checkout
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
