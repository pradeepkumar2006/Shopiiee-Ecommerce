import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const ShopProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState(null);
    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const response = await fetch(`${API_URL}/products`);
            if (response.ok) {
                setProducts(await response.json());
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const fetchProductById = async (id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            return response.ok ? await response.json() : null;
        } catch (e) {
            return null;
        }
    };

    const fetchReviews = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/products/${productId}/reviews`);
            return response.ok ? await response.json() : [];
        } catch (e) {
            return [];
        }
    };

    const postReview = async (productId, reviewData) => {
        try {
            const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            const data = await response.json();
            if (response.ok) {
                showToast('Review posted successfully');
                return data;
            } else {
                showToast(data.message || 'Failed to post review', 'error');
                return null;
            }
        } catch (err) {
            showToast('Network error', 'error');
            return null;
        }
    };

    // Auth Logic (Email/Password)
    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                setIsAuthenticated(true);
                setUser(data.user);
                fetchOrders(data.user.email);
                fetchWishlist(data.user.email);
                fetchCart(data.user.email);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (e) {
            return { success: false, message: 'Server Error' };
        }
    };

    const register = async (email, password, mobile) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, mobile })
            });

            const data = await res.json();
            if (res.ok) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (e) {
            return { success: false, message: 'Server Error' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setCart([]);
        setOrders([]);
        setWishlist([]);
    };

    // Cart Logic
    const fetchCart = async (email) => {
        try {
            const userEmail = email || user?.email;
            if (!userEmail) return;
            const res = await fetch(`${API_URL}/cart/${userEmail}`);
            if (res.ok) {
                setCart(await res.json());
            }
        } catch (e) {
            console.error("Fetch Cart Failed", e);
        }
    };

    const addToCart = async (product, quantity = 1) => {
        if (!user) {
            showToast('Please login to add to cart', 'error');
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        showToast(`Added ${product.name} to cart`);

        try {
            await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_email: user.email, product_id: product.id, quantity })
            });
        } catch (e) {
            console.error('Failed to sync cart', e);
        }
    };

    const removeFromCart = async (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
        if (!user) return;
        try {
            await fetch(`${API_URL}/cart/${user.email}/${id}`, { method: 'DELETE' });
        } catch (e) { }
    };

    const updateQuantity = async (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
        if (!user) return;
        try {
            await fetch(`${API_URL}/cart/quantity`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_email: user.email, product_id: id, delta })
            });
        } catch (e) { }
    };

    const clearCart = async () => {
        setCart([]);
        if (!user) return;
        try {
            await fetch(`${API_URL}/cart/clear/${user.email}`, { method: 'DELETE' });
        } catch (e) { }
    };

    const moveToCart = async (product) => {
        await addToCart(product);
        const isLocalWishlisted = wishlist.find(w => w.id === product.id);
        if (isLocalWishlisted) {
            await toggleWishlist(product);
        }
    };

    const getCartTotal = () => cart.reduce((t, i) => t + (i.price * i.quantity), 0);

    // Order Logic
    const placeOrder = async (orderData) => {
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                fetchOrders(user?.email || 'guest@shopiee.com');
                return { success: true };
            }
            return { success: false };
        } catch (e) {
            return { success: false };
        }
    };

    const fetchOrders = async (email) => {
        try {
            const userEmail = email || user?.email;
            if (!userEmail) return;

            const res = await fetch(`${API_URL}/orders/${userEmail}`);
            if (res.ok) {
                setOrders(await res.json());
            }
        } catch (e) {
            console.error("Fetch Orders Failed", e);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchOrders(user?.email);
                return true;
            }
            return false;
        } catch (e) {
            console.error("Update Order Status Failed", e);
            return false;
        }
    };

    // Wishlist Logic
    const fetchWishlist = async (email) => {
        try {
            const userEmail = email || user?.email;
            if (!userEmail) return;

            const res = await fetch(`${API_URL}/wishlist/${userEmail}`);
            if (res.ok) {
                setWishlist(await res.json());
            }
        } catch (e) {
            console.error("Fetch Wishlist Failed", e);
        }
    };

    const toggleWishlist = async (product) => {
        if (!user) {
            showToast('Please login to add to wishlist', 'error');
            return;
        }

        const isLocalWishlisted = wishlist.find(w => w.id === product.id);

        // Optimistic UI update
        if (isLocalWishlisted) {
            setWishlist(prev => prev.filter(w => w.id !== product.id));
            showToast('Removed from wishlist');
        } else {
            setWishlist(prev => [...prev, product]);
            showToast('Added to wishlist');
        }

        try {
            const res = await fetch(`${API_URL}/wishlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_email: user.email, product_id: product.id })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                // Revert if failed
                fetchWishlist(user.email);
            }
        } catch (e) {
            fetchWishlist(user.email);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ShopContext.Provider value={{
            user, isAuthenticated, products, loadingProducts, fetchProductById, fetchReviews, postReview,
            login, register, logout,
            cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, fetchCart, moveToCart,
            orders, placeOrder, fetchOrders, updateOrderStatus,
            wishlist, toggleWishlist, fetchWishlist,
            toast, showToast
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
