import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart, ArrowRight, Loader, Star, UserCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, fetchProductById, fetchReviews, postReview, user, isAuthenticated } = useShop();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const getProductAndReviews = async () => {
            setLoading(true);
            const data = await fetchProductById(id);
            if (data) {
                setProduct(data);
                setLoadingReviews(true);
                const reviewData = await fetchReviews(id);
                setReviews(reviewData);
                setLoadingReviews(false);
            } else {
                setError(true);
            }
            setLoading(false);
        };
        getProductAndReviews();
    }, [id, fetchProductById, fetchReviews]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        navigate('/checkout', { state: { product, quantity } });
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return;

        setSubmittingReview(true);
        const data = await postReview(id, {
            user_email: isAuthenticated ? user.email : 'guest@shopiee.com',
            rating: newReview.rating,
            comment: newReview.comment
        });

        if (data && data.review) {
            setReviews([data.review, ...reviews]);
            setNewReview({ rating: 5, comment: '' });
        }
        setSubmittingReview(false);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader className="h-8 w-8 text-black animate-spin" />
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <p className="text-gray-500 font-medium">Product not found</p>
            <button onClick={() => navigate('/products')} className="mt-4 text-blue-600 underline">Return to Shop</button>
        </div>
    );

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : 5.0;

    return (
        <div className="min-h-screen bg-gray-50 pb-28 md:pb-6 animate-fade-in relative">
            {/* Top Nav (Mobile) */}
            <div className="md:hidden fixed top-0 left-0 right-0 p-4 z-20 flex justify-between items-center pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="pointer-events-auto p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all text-gray-800"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={() => navigate('/cart')}
                    className="pointer-events-auto p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md active:scale-95 transition-all text-gray-800"
                >
                    <ShoppingCart className="h-5 w-5" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto md:px-6 md:py-8 md:grid md:grid-cols-2 md:gap-10 items-start">

                {/* Image Section */}
                <div className="w-full h-[40vh] md:h-[600px] bg-white md:rounded-3xl relative group overflow-hidden shadow-sm border border-gray-100/50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain md:object-cover p-4 md:p-0 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent md:hidden" />
                </div>

                {/* Details Section */}
                <div className="bg-white p-6 md:p-8 rounded-t-3xl md:rounded-3xl -mt-6 md:mt-0 relative z-10 shadow-lg md:shadow-sm border border-gray-100 flex flex-col min-h-[60vh] md:min-h-0">
                    <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

                    {/* Breadcrumb / Category */}
                    <div className="text-sm text-gray-400 font-medium mb-2 hover:text-gray-600 transition-colors uppercase tracking-wider cursor-pointer">
                        {product.category}
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight md:leading-snug">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mt-3 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                            <span className="font-bold text-sm text-yellow-700">{averageRating}</span>
                            <Star className="h-4 w-4 fill-current" />
                        </div>
                        <span className="text-blue-600 font-medium text-sm md:text-base hover:underline cursor-pointer">
                            {reviews.length} Ratings & Reviews
                        </span>
                    </div>

                    <div className="mt-4 flex items-end gap-3">
                        <span className="text-3xl md:text-4xl font-black text-black tracking-tight">
                            ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 mb-1 line-through font-medium">
                            ₹{(product.price * 1.4).toFixed(0).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-1">
                            Save 40%
                        </span>
                    </div>

                    <p className="text-gray-600 mt-6 leading-relaxed text-sm md:text-base">
                        {product.description}
                    </p>

                    {/* Features List (Mocked) */}
                    <ul className="mt-4 space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Available in stock. Ready to ship.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Free Delivery & 14-day Returns.</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Secure Checkout via Stripe & PayPal.</li>
                    </ul>

                    {/* Quantity */}
                    <div className="mt-8 flex items-center gap-6 py-4">
                        <span className="font-bold text-gray-800 text-sm md:text-base uppercase tracking-wider hidden md:block">Quantity</span>
                        <div className="flex items-center gap-4 bg-gray-50/80 rounded-2xl px-3 py-2 border border-gray-200 shadow-inner">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-2 bg-white shadow-sm hover:bg-gray-50 rounded-xl transition-all active:scale-95"
                            >
                                <Minus className="h-4 w-4 md:h-5 md:w-5 text-gray-800 border" />
                            </button>
                            <span className="w-8 md:w-10 text-center font-bold text-lg text-gray-800">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="p-2 bg-white shadow-sm hover:bg-gray-50 rounded-xl transition-all active:scale-95"
                            >
                                <Plus className="h-4 w-4 md:h-5 md:w-5 text-gray-800 border" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Actions (Desktop Inline, Mobile Fixed) */}
                    <div className="hidden md:flex gap-4 mt-6 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 py-4 px-6 border-2 border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-black active:scale-[0.98] transition-all text-gray-800"
                        >
                            <ShoppingCart className="h-5 w-5" /> Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 py-4 px-6 bg-black text-white hover:bg-gray-900 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-black/20"
                        >
                            <ArrowRight className="h-5 w-5" /> Buy Now
                        </button>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex-grow">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

                        {/* Add Review Form */}
                        <form onSubmit={submitReview} className="mb-8 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-2">Write a Review</h3>
                            <div className="flex items-center gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="focus:outline-none"
                                    >
                                        <Star className={`h-6 w-6 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`} />
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                placeholder="What do you think about this product?"
                                className="w-full bg-white p-3 md:p-4 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all mb-3 resize-none h-24 shadow-inner"
                                required
                            />
                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-xl active:scale-95 disabled:bg-gray-400 transition-all w-full md:w-auto shadow-md"
                            >
                                {submittingReview ? 'Posting...' : 'Submit Review'}
                            </button>
                        </form>

                        {/* Review List */}
                        {loadingReviews ? (
                            <p className="text-center text-sm text-gray-500 py-4 animate-pulse">Loading reviews...</p>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                                <p className="text-gray-500 font-medium">No reviews yet.</p>
                                <p className="text-sm text-gray-400 mt-1">Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            <div className="space-y-4 md:space-y-6">
                                {reviews.map((review, i) => (
                                    <div key={review.id || i} className="p-4 md:p-5 border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                                                    <UserCircle2 className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">{review.user_email.split('@')[0]}</p>
                                                    <div className="flex text-yellow-500 mt-0.5">
                                                        {[...Array(5)].map((_, idx) => (
                                                            <Star key={idx} className={`h-3 w-3 ${idx < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {review.created_at && (
                                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed pl-13">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Actions */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button
                    onClick={handleAddToCart}
                    className="flex-[0.4] py-3.5 border-2 border-gray-200 rounded-2xl flex items-center justify-center active:scale-95 transition-all text-gray-800 bg-white"
                >
                    <ShoppingCart className="h-6 w-6" />
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 bg-black text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-black/20 text-lg"
                >
                    Buy Now
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
