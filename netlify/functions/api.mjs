import { getStore } from '@netlify/blobs';
import localProducts from '../../Ecommerce/BackEnd/data/products.js';

export default async (req, context) => {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/api\//, '');
    const method = req.method;

    // Initialize Netlify Blobs stores
    const usersStore = getStore('users');
    const ordersStore = getStore('orders');
    const reviewsStore = getStore('reviews');
    const wishlistsStore = getStore('wishlists');
    const cartsStore = getStore('carts');
    const contactsStore = getStore('contacts');

    const parseBody = async () => {
        try { return await req.json(); } catch (e) { return {}; }
    };

    const response = (data, status = 200) => {
        return new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    };

    try {
        // 0. Root
        if (path === '' || path === '/') {
            return new Response('Backend Running on Netlify Functions with Netlify Blobs 🟢');
        }

        // 1. Get Products
        if (method === 'GET' && path === 'products') {
            return response(localProducts);
        }

        // 2. Get Single Product
        if (method === 'GET' && path.startsWith('products/')) {
            const idStr = path.split('/')[1];
            if (path.split('/').length === 2 && idStr) {
                const id = parseInt(idStr);
                const product = localProducts.find(p => p.id === id);
                return product ? response(product) : response({ message: 'Not found' }, 404);
            }
        }

        // 7. Get Reviews
        if (method === 'GET' && path.match(/^products\/\d+\/reviews$/)) {
            const productId = parseInt(path.split('/')[1]);
            const reviewsData = await reviewsStore.get(`reviews_${productId}`, { type: 'json' }) || [];
            return response(reviewsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }

        // 8. Post Review
        if (method === 'POST' && path.match(/^products\/\d+\/reviews$/)) {
            const productId = parseInt(path.split('/')[1]);
            const { user_email, rating, comment } = await parseBody();
            const existingReviews = await reviewsStore.get(`reviews_${productId}`, { type: 'json' }) || [];
            const newReview = { id: Date.now(), product_id: productId, user_email, rating, comment, created_at: new Date().toISOString() };
            existingReviews.push(newReview);
            await reviewsStore.setJSON(`reviews_${productId}`, existingReviews);
            return response({ success: true, review: newReview }, 201);
        }

        // Auth logic
        if (path.startsWith('auth/')) {
            const action = path.split('/')[1];
            const { email, password, mobile } = await parseBody();

            if (action === 'register') {
                const existing = await usersStore.get(email, { type: 'json' });
                if (existing) return response({ message: 'User already exists' }, 400);
                await usersStore.setJSON(email, { id: Date.now(), email, password, mobile_number: mobile, created_at: new Date().toISOString() });
                return response({ message: 'User registered successfully' });
            }

            if (action === 'login') {
                const user = await usersStore.get(email, { type: 'json' });
                if (user && user.password === password) {
                    return response({ message: 'Login Successful', user: { email: user.email, mobile: user.mobile_number, id: user.id } });
                }
                return response({ message: 'Invalid Credentials' }, 400);
            }
        }

        // Orders logic
        if (path === 'orders' && method === 'POST') {
            const { items, totalAmount, shippingDetails, paymentMethod } = await parseBody();
            const email = shippingDetails.email;
            const existingOrders = await ordersStore.get(email, { type: 'json' }) || [];
            const newOrder = {
                id: 'ORD-' + Date.now(),
                customer_name: shippingDetails.name,
                email,
                mobile: shippingDetails.mobile,
                address: shippingDetails.address,
                total_amount: totalAmount,
                payment_method: paymentMethod,
                items,
                status: 'Processing',
                created_at: new Date().toISOString()
            };
            existingOrders.push(newOrder);
            await ordersStore.setJSON(email, existingOrders);
            return response({ success: true }, 201);
        }

        if (method === 'GET' && path.startsWith('orders/')) {
            const email = path.split('/')[1];
            if (path.split('/').length === 2 && email) {
                const userOrders = await ordersStore.get(email, { type: 'json' }) || [];
                return response(userOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            }
        }

        if (method === 'PUT' && path.match(/^orders\/[A-Za-z0-9-]+\/status$/)) {
            const orderId = path.split('/')[1];
            const { status } = await parseBody();
            const { blobs } = await ordersStore.list();
            let updated = false;
            for (const blob of blobs) {
                const emailOrders = await ordersStore.get(blob.key, { type: 'json' });
                if (emailOrders) {
                    const order = emailOrders.find(o => o.id === orderId);
                    if (order) {
                        order.status = status;
                        await ordersStore.setJSON(blob.key, emailOrders);
                        updated = true;
                        break;
                    }
                }
            }
            return response({ success: updated, status });
        }

        // Wishlist
        if (path.startsWith('wishlist')) {
            const parts = path.split('/');
            if (method === 'GET' && parts[1]) {
                const email = parts[1];
                const userWishlistIds = await wishlistsStore.get(email, { type: 'json' }) || [];
                const wishlistProducts = localProducts.filter(p => userWishlistIds.includes(p.id));
                return response(wishlistProducts);
            }
            if (method === 'POST') {
                const { user_email, product_id } = await parseBody();
                const userWishlistIds = await wishlistsStore.get(user_email, { type: 'json' }) || [];

                const index = userWishlistIds.indexOf(product_id);
                if (index > -1) {
                    userWishlistIds.splice(index, 1);
                    await wishlistsStore.setJSON(user_email, userWishlistIds);
                    return response({ success: true, message: 'Removed from wishlist', action: 'removed' });
                } else {
                    userWishlistIds.push(product_id);
                    await wishlistsStore.setJSON(user_email, userWishlistIds);
                    return response({ success: true, message: 'Added to wishlist', action: 'added' });
                }
            }
        }

        // Cart
        if (path.startsWith('cart')) {
            const parts = path.split('/');

            // Get cart: /api/cart/:email
            if (method === 'GET' && parts.length === 2) {
                const email = parts[1];
                const userCartItems = await cartsStore.get(email, { type: 'json' }) || [];
                const enrichedCart = userCartItems.map(c => {
                    const product = localProducts.find(p => p.id === c.product_id);
                    return product ? { ...product, quantity: c.quantity } : null;
                }).filter(Boolean);
                return response(enrichedCart);
            }

            // Add/Update cart item: /api/cart
            if (method === 'POST') {
                const { user_email, product_id, quantity = 1 } = await parseBody();
                const userCartItems = await cartsStore.get(user_email, { type: 'json' }) || [];
                const existing = userCartItems.find(c => c.product_id === product_id);
                if (existing) {
                    existing.quantity += quantity;
                } else {
                    userCartItems.push({ product_id, quantity });
                }
                await cartsStore.setJSON(user_email, userCartItems);
                return response({ success: true, message: 'Cart updated' });
            }

            // Update quantity: /api/cart/quantity
            if (method === 'PUT' && parts[1] === 'quantity') {
                const { user_email, product_id, delta } = await parseBody();
                const userCartItems = await cartsStore.get(user_email, { type: 'json' }) || [];
                const existing = userCartItems.find(c => c.product_id === product_id);
                if (existing) {
                    existing.quantity = Math.max(1, existing.quantity + delta);
                    await cartsStore.setJSON(user_email, userCartItems);
                }
                return response({ success: true });
            }

            // Remove cart item: /api/cart/:email/:productId
            if (method === 'DELETE' && parts.length === 3 && parts[1] !== 'clear') {
                const email = parts[1];
                const pId = parseInt(parts[2]);
                let userCartItems = await cartsStore.get(email, { type: 'json' }) || [];
                userCartItems = userCartItems.filter(c => c.product_id !== pId);
                await cartsStore.setJSON(email, userCartItems);
                return response({ success: true });
            }

            // Clear cart: /api/cart/clear/:email
            if (method === 'DELETE' && parts[1] === 'clear' && parts[2]) {
                const email = parts[2];
                await cartsStore.delete(email);
                return response({ success: true });
            }
        }

        // Contact
        if (path === 'contact' && method === 'POST') {
            const { name, email, message } = await parseBody();
            const newContact = { id: Date.now(), name, email, message, created_at: new Date().toISOString() };
            const allContacts = await contactsStore.get('all', { type: 'json' }) || [];
            allContacts.push(newContact);
            await contactsStore.setJSON('all', allContacts);
            return response({ success: true, message: 'Message sent successfully' }, 201);
        }

        return response({ message: 'Endpoint not implemented on Netlify Blob Server', path }, 404);

    } catch (err) {
        console.error("Function Error:", err);
        return response({ success: false, error: err.message }, 500);
    }
};

export const config = {
    path: "/api/*"
};
