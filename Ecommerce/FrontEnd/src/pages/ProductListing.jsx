import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Home, ShoppingCart, Heart, Loader, Package, Star, ShoppingBag, BadgeCheck, Truck, ShieldCheck, Headset, CreditCard, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();
    const { addToCart, cart, products, loadingProducts, wishlist, toggleWishlist } = useShop();

    const categories = ['All', ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, products]);

    // Scroll to top on load for best experience
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loadingProducts) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader className="h-8 w-8 text-black animate-spin" />
                    <p className="text-gray-500 font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-24 md:pb-8 font-sans">
            {/* Desktop Navbar (Mimicking Image) */}
            <div className="hidden lg:flex items-center justify-between px-10 py-6 max-w-[1600px] mx-auto sticky top-0 bg-white/90 backdrop-blur-md z-50">
                <div className="flex items-center gap-12">
                    <h1 className="text-2xl font-black tracking-widest text-[#F42C37]">SHOPIEE</h1>
                    <nav className="flex items-center gap-8 text-sm font-semibold text-gray-500">
                        <span className="text-black cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => window.scrollTo(0, 0)}>Home</span>
                        <span className="cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => {
                            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}>Shop</span>
                        <span className="cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => navigate('/about')}>About Us</span>
                        <span className="cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => navigate('/blog')}>Blog</span>
                        <span className="cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => navigate('/contact')}>Contact Us</span>
                        <span className="cursor-pointer hover:text-[#F42C37] transition-colors font-bold text-gray-800" onClick={() => navigate('/orders')}>My Orders</span>
                    </nav>
                </div>
                <div className="flex items-center gap-6 text-gray-800">
                    <span className="text-sm font-semibold cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => navigate('/login')}>Login</span>
                    <Search className="h-5 w-5 cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => {
                        document.getElementById('mobile-search')?.focus();
                    }} />
                    <Heart className="h-5 w-5 cursor-pointer hover:text-[#F42C37] transition-colors" onClick={() => navigate('/wishlist')} />
                    <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
                        <ShoppingCart className="h-5 w-5 hover:text-[#F42C37] transition-colors" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#F42C37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search & Header (For functionality) */}
            <div className="lg:hidden px-4 py-3 sticky top-0 bg-white z-50 shadow-sm flex items-center gap-3">
                <h1 className="text-xl font-black text-[#F42C37]">SHOPIEE</h1>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        id="mobile-search"
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-100 pl-9 pr-4 py-2 rounded-full text-sm outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-4 lg:px-10">

                {/* Hero Banner Area */}
                <div className="relative bg-[#E5E5E5] rounded-[30px] lg:rounded-[40px] mt-4 lg:mt-6 overflow-hidden min-h-[400px] lg:min-h-[600px] flex items-center shadow-sm">
                    {/* Background massive text */}
                    <h1 className="absolute text-[100px] lg:text-[250px] font-black text-white/40 leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 tracking-tighter">
                        HEADPHONE
                    </h1>

                    <div className="relative z-10 flex flex-col lg:flex-row w-full items-center justify-between p-8 lg:p-16 h-full">
                        <div className="flex-1 lg:max-w-xl text-center lg:text-left mb-8 lg:mb-0">
                            <h3 className="text-lg lg:text-2xl font-medium text-gray-800 mb-2 lg:mb-4">Beats Solo</h3>
                            <h2 className="text-4xl lg:text-7xl font-black text-gray-900 leading-tight mb-2">Wireless</h2>
                            <h1 className="text-[60px] lg:text-[140px] font-black text-white leading-none drop-shadow-md lg:absolute lg:top-24 lg:-ml-4 select-none pointer-events-none hidden lg:block opacity-90 tracking-tighter mix-blend-overlay">HEADPHONE</h1>

                            <button className="mt-6 lg:mt-32 px-8 py-3.5 bg-[#F42C37] text-white font-bold rounded-full hover:bg-red-600 hover:scale-105 transition-all shadow-lg active:scale-95 text-sm lg:text-base cursor-pointer z-20 relative" onClick={() => { document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                                Shop By Category
                            </button>
                        </div>

                        {/* Hero Image */}
                        <div className="flex-1 relative lg:absolute lg:right-32 lg:top-10 w-full lg:w-auto h-[300px] lg:h-[650px] flex items-center justify-center group pointer-events-none z-10">
                            <img
                                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                                alt="Headphone"
                                className="w-[80%] lg:w-[130%] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-700 pointer-events-auto mix-blend-multiply"
                            />
                        </div>

                        <div className="hidden lg:block absolute right-10 bottom-16 text-right max-w-xs z-20">
                            <p className="font-bold text-gray-800 mb-1">Description</p>
                            <p className="text-sm text-gray-500 leading-relaxed">There are many variations passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                        </div>
                    </div>
                </div>

                {/* Categories Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-8">
                    {/* Row 1 */}
                    <div className="bg-[#1A1A1A] rounded-3xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-end min-h-[220px] lg:min-h-[280px]">
                        <div className="relative z-10">
                            <p className="text-gray-400 font-medium mb-1">Enjoy</p>
                            <h3 className="text-white text-2xl font-bold mb-1">With</h3>
                            <h2 className="text-white/20 text-4xl lg:text-5xl font-black mb-4 tracking-tighter uppercase pointer-events-none">EARPHONE</h2>
                            <button className="px-6 py-2 bg-[#F42C37] text-white text-sm font-bold rounded-full hover:bg-white hover:text-[#F42C37] transition-colors" onClick={() => setActiveCategory('Electronics')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" alt="Earphones" className="absolute -right-4 -bottom-4 w-40 lg:w-48 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 mix-blend-lighten opacity-80" />
                    </div>

                    <div className="bg-[#FEC62D] rounded-3xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-end min-h-[220px] lg:min-h-[280px]">
                        <div className="relative z-10">
                            <p className="text-yellow-900 font-medium mb-1">New</p>
                            <h3 className="text-white text-2xl font-bold mb-1">Wear</h3>
                            <h2 className="text-white/40 text-4xl lg:text-5xl font-black mb-4 tracking-tighter uppercase pointer-events-none drop-shadow-sm">GADGET</h2>
                            <button className="px-6 py-2 bg-white text-[#FEC62D] text-sm font-bold rounded-full hover:bg-black hover:text-white transition-colors" onClick={() => setActiveCategory('Accessories')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" alt="Watch" className="absolute -right-2 top-0 w-36 lg:w-44 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-x-2 transition-transform duration-500 mix-blend-multiply opacity-90" />
                    </div>

                    <div className="lg:col-span-2 bg-[#F42C37] rounded-3xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-end min-h-[220px] lg:min-h-[280px]">
                        <div className="relative z-10">
                            <p className="text-white/80 font-medium mb-1">Trend</p>
                            <h3 className="text-white text-2xl font-bold mb-1">Devices</h3>
                            <h2 className="text-white/30 text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase pointer-events-none">LAPTOP</h2>
                            <button className="px-6 py-2 bg-white text-[#F42C37] text-sm font-bold rounded-full hover:bg-black hover:text-white transition-colors" onClick={() => setActiveCategory('Computers')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80" alt="Laptop" className="absolute -right-8 top-8 w-64 lg:w-96 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 mix-blend-multiply opacity-90" />
                    </div>

                    {/* Row 2 */}
                    <div className="col-span-1 lg:col-span-2 bg-[#E1E4EA] rounded-3xl p-6 lg:p-8 relative overflow-hidden group min-h-[220px] lg:min-h-[280px] flex items-center">
                        <div className="relative z-10 pl-2 lg:pl-10">
                            <p className="text-gray-500 font-medium mb-1">Best</p>
                            <h3 className="text-gray-900 text-3xl lg:text-4xl font-black mb-1">Gaming</h3>
                            <h2 className="text-white text-4xl lg:text-6xl font-black mb-4 tracking-tighter uppercase drop-shadow-sm pointer-events-none">CONSOLE</h2>
                            <button className="px-8 py-2.5 bg-[#F42C37] text-white text-sm font-bold rounded-full hover:bg-black transition-colors" onClick={() => setActiveCategory('Gaming')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" alt="Console" className="absolute -right-4 lg:right-4 top-1/2 -translate-y-1/2 w-48 lg:w-72 object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-translate-x-4 transition-transform duration-500 mix-blend-multiply" />
                    </div>

                    <div className="bg-[#2DCC6F] rounded-3xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-start min-h-[220px] lg:min-h-[280px]">
                        <div className="relative z-10">
                            <p className="text-white/80 font-medium mb-1 pl-1">Play</p>
                            <h3 className="text-white text-2xl font-bold mb-1">Game</h3>
                            <h2 className="text-white/30 text-4xl lg:text-5xl font-black mb-4 tracking-tighter uppercase pointer-events-none">OCULUS</h2>
                            <button className="px-6 py-2 bg-white text-[#2DCC6F] text-sm font-bold rounded-full hover:bg-black hover:text-white transition-colors" onClick={() => setActiveCategory('Gaming')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80" alt="VR VR" className="absolute -right-6 -bottom-6 w-48 lg:w-56 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-4 transition-transform duration-500 mix-blend-multiply" />
                    </div>

                    <div className="bg-[#1272EF] rounded-3xl p-6 lg:p-8 relative overflow-hidden group flex flex-col justify-center min-h-[220px] lg:min-h-[280px]">
                        <div className="relative z-10 pl-2 lg:pl-4">
                            <p className="text-white/80 font-medium mb-1">New</p>
                            <h3 className="text-white text-2xl font-bold mb-1">Amazon</h3>
                            <h2 className="text-white/30 text-4xl lg:text-5xl font-black mb-4 tracking-tighter uppercase pointer-events-none">SPEAKER</h2>
                            <button className="px-6 py-2 bg-white text-[#1272EF] text-sm font-bold rounded-full hover:bg-black hover:text-white transition-colors" onClick={() => setActiveCategory('Electronics')}>Browse</button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=400&auto=format&fit=crop" alt="Speaker" className="absolute -right-8 -bottom-4 w-40 lg:w-56 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 mix-blend-multiply -rotate-12 group-hover:rotate-0" />
                    </div>
                </div>

                {/* Benefits / Services Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 lg:py-20">
                    <div className="flex items-center gap-4 group">
                        <Truck className="w-8 h-8 lg:w-10 lg:h-10 text-[#F42C37] group-hover:-translate-y-1 transition-transform" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm lg:text-base">Free Shipping</h4>
                            <p className="text-xs text-gray-500">Free Shipping On All Order</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10 text-[#F42C37] group-hover:-translate-y-1 transition-transform" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm lg:text-base">Money Guarantee</h4>
                            <p className="text-xs text-gray-500">30 Day Money Back</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <Headset className="w-8 h-8 lg:w-10 lg:h-10 text-[#F42C37] group-hover:-translate-y-1 transition-transform" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm lg:text-base">Online Support 24/7</h4>
                            <p className="text-xs text-gray-500">Technical Support 24/7</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <CreditCard className="w-8 h-8 lg:w-10 lg:h-10 text-[#F42C37] group-hover:-translate-y-1 transition-transform" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm lg:text-base">Secure Payment</h4>
                            <p className="text-xs text-gray-500">All Cards Accepted</p>
                        </div>
                    </div>
                </div>

                {/* Promotional Banner */}
                <div className="bg-[#F42C37] rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between relative overflow-visible mt-20 mb-20 lg:mb-32 min-h-[300px] shadow-2xl shadow-red-500/20">
                    <div className="text-center lg:text-left z-20 text-white flex-1 lg:pl-10">
                        <p className="text-sm lg:text-lg font-bold mb-2">20 % OFF</p>
                        <h2 className="text-6xl lg:text-[80px] font-black leading-none mb-4 uppercase tracking-tighter">FINE<br />SMILE</h2>
                        <p className="text-sm font-medium opacity-90">15 Nov To 7 Dec</p>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-auto h-[150%] lg:h-[180%] z-10 pointer-events-none flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" alt="Promo" className="h-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.5)] scale-110 lg:scale-125 hover:rotate-[-5deg] hover:scale-150 transition-all duration-700 pointer-events-auto mix-blend-multiply opacity-95" />
                    </div>

                    <div className="text-center lg:text-left z-20 text-white flex-1 lg:pl-32 mt-48 lg:mt-0 flex flex-col items-center lg:items-start justify-center h-full">
                        <p className="text-sm lg:text-lg font-bold mb-2">Beats Solo Air</p>
                        <h3 className="text-3xl lg:text-5xl font-bold mb-4">Summer Sale</h3>
                        <p className="text-xs lg:text-sm opacity-90 mb-8 max-w-[280px]">Company that's grown from 270 to 480 employees in the last 12 months.</p>
                        <button className="px-8 py-3 bg-white text-[#F42C37] font-bold rounded-full hover:bg-black hover:text-white transition-colors" onClick={() => { document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            Shop
                        </button>
                    </div>
                </div>

                {/* Dynamic Product Section */}
                <div id="products-section" className="text-center mb-10 pt-10">
                    <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">Best Seller Products</h2>
                    <p className="text-gray-500 text-sm lg:text-base">speakerThere are many variations passages</p>

                    {/* Categories Filter for Best Sellers */}
                    <div className="flex gap-2 mt-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar justify-start lg:justify-center px-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all active:scale-95 border ${activeCategory === cat
                                    ? 'bg-[#F42C37] text-white border-[#F42C37] shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* The dynamic product grid from previously */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 pb-10">
                    {filteredProducts.map(product => {
                        const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
                        const reviewCount = Math.floor(Math.random() * 500) + 10;
                        const originalPrice = (product.price * 1.3).toFixed(0);

                        return (
                            <div
                                key={product.id}
                                className="group bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-xl flex flex-col h-full cursor-pointer relative hover:-translate-y-1 duration-300"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="aspect-square bg-gray-50/50 rounded-xl md:rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center p-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 relative z-0"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(product);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 md:p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
                                    >
                                        <Heart className={`h-4 w-4 md:h-5 md:w-5 transition-colors ${wishlist.some(w => w.id === product.id) ? 'fill-[#F42C37] text-[#F42C37]' : 'text-gray-400 hover:text-[#F42C37]'}`} />
                                    </button>
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <p className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-wider mb-1 px-1">{product.category}</p>
                                        <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 leading-tight px-1 group-hover:text-[#F42C37] transition-colors">
                                            {product.name}
                                        </h3>

                                        <div className="flex items-center gap-1 mt-1.5 mb-2 px-1">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-3 w-3 md:h-3.5 md:w-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 tabular-nums">({reviewCount})</span>
                                        </div>
                                    </div>

                                    <div className="mt-3 px-1">
                                        <div className="flex items-end gap-1.5 mb-1 text-[#F42C37]">
                                            <span className="font-black text-lg md:text-xl tabular-nums">₹{product.price.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400 line-through mb-1 tabular-nums">₹{Number(originalPrice).toLocaleString()}</span>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            className="mt-3 w-full py-2.5 bg-gray-50 border border-gray-200 text-gray-900 font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#F42C37] hover:border-[#F42C37] hover:text-white active:scale-[0.98] transition-all shadow-sm group-hover:bg-[#F42C37] group-hover:border-[#F42C37] group-hover:text-white content-button"
                                        >
                                            <ShoppingCart className="h-4 w-4 pointer-events-none" /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Mobile Bottom Navigation (Sticky) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
                <NavButton icon={Home} label="Home" active onClick={() => window.scrollTo(0, 0)} />
                <NavButton icon={Heart} label="Wishlist" onClick={() => navigate('/wishlist')} />
                <div className="relative">
                    <NavButton icon={ShoppingCart} label="Cart" onClick={() => navigate('/cart')} />
                    {cart.length > 0 && (
                        <span className="absolute -top-1.5 right-1 bg-[#F42C37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                            {cart.length}
                        </span>
                    )}
                </div>
                <NavButton icon={User} label="Profile" onClick={() => navigate('/login')} />
            </div>
        </div>
    );
};

const NavButton = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#F42C37]' : 'text-gray-400 hover:text-gray-800'}`}
    >
        <Icon className={`h-6 w-6 md:h-5 md:w-5 ${active ? 'fill-[#F42C37] text-[#F42C37]' : ''}`} />
        <span className="text-[10px] md:text-xs font-semibold">{label}</span>
    </button>
);

export default ProductListing;
