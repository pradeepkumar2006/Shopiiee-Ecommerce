import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Heart, ShoppingCart, Trash2, Home, Package } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, toggleWishlist, moveToCart, cart } = useShop();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            {/* Header */}
            <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                        <ArrowLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-gray-900">My Wishlist</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm border border-gray-100 mt-4 md:mt-8">
                        <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="h-10 w-10 text-red-500" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Save items you love and buy them later. Let's start shopping!</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mt-4">
                        {wishlist.map(product => (
                            <div key={product.id} className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 relative group flex flex-col h-full">
                                {/* Image */}
                                <div onClick={() => navigate(`/product/${product.id}`)} className="aspect-square bg-gray-50/50 rounded-xl mb-4 p-4 cursor-pointer relative flex items-center justify-center group-hover:bg-gray-100/50 transition-colors">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                                        <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                        <p className="font-black text-black text-lg">₹{product.price.toLocaleString()}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className="p-2 border border-gray-200 rounded-xl active:scale-95 transition-all hover:bg-red-50 group/btn"
                                            title="Remove from wishlist"
                                        >
                                            <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover/btn:text-red-500 transition-colors" />
                                        </button>
                                        <button
                                            onClick={() => moveToCart(product)}
                                            className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:border-black active:scale-[0.98] transition-all shadow-sm group-hover:bg-black group-hover:text-white"
                                        >
                                            <ShoppingCart className="h-4 w-4" /> Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex justify-between items-center z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <NavButton icon={Home} label="Home" onClick={() => navigate('/products')} />
                <NavButton icon={Heart} label="Wishlist" active onClick={() => navigate('/wishlist')} />
                <div className="relative">
                    <NavButton icon={ShoppingCart} label="Cart" onClick={() => navigate('/cart')} />
                    {cart.length > 0 && (
                        <span className="absolute -top-1.5 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                            {cart.length}
                        </span>
                    )}
                </div>
                <NavButton icon={Package} label="Orders" onClick={() => navigate('/orders')} />
            </div>
        </div>
    );
};

const NavButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-black' : 'text-gray-400 hover:text-black'}`}
    >
        <Icon className={`h-6 w-6 md:h-5 md:w-5 ${active ? 'fill-black text-black' : ''}`} />
        <span className="text-[10px] md:text-xs font-medium">{label}</span>
    </button>
);

export default Wishlist;
