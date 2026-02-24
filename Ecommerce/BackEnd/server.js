const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const supabase = require('./config/supabaseClient');
const localProducts = require('./data/products');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory fallback (resets on server restart)
const memoryUsers = [];
const memoryOrders = [];
const memoryReviews = [
    { id: 1, product_id: 1, user_email: 'demo@test.com', rating: 5, comment: 'Amazing sound quality and the noise cancellation is unreal! Totally worth the price.', created_at: new Date() },
    { id: 2, product_id: 1, user_email: 'user2@test.com', rating: 4, comment: 'Very comfortable but battery could be slightly better.', created_at: new Date() },
    { id: 3, product_id: 2, user_email: 'guest@test.com', rating: 5, comment: 'Best smartwatch out there. The new display is super bright.', created_at: new Date() }
];
const memoryWishlists = []; // id, user_email, product_id
const memoryCarts = []; // id, user_email, product_id, quantity
const memoryContacts = []; // id, name, email, message

// 0. Root
app.get('/', (req, res) => res.send('Backend Running ' + (supabase ? 'with Supabase 🟢' : 'in Memory Mode 🟡 (Data lost on restart)')));

// 1. Get Products
app.get('/api/products', async (req, res) => {
    if (!supabase) return res.json(localProducts);
    try {
        const { data } = await supabase.from('products').select('*');
        res.json(data && data.length > 0 ? data : localProducts);
    } catch (err) { res.json(localProducts); }
});

// 2. Get Single Product
app.get('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!supabase) {
        const product = localProducts.find(p => p.id === id);
        return product ? res.json(product) : res.status(404).json({ message: 'Not found' });
    }
    try {
        const { data } = await supabase.from('products').select('*').eq('id', id).single();
        if (data) return res.json(data);
    } catch (e) { }

    // Fallback
    const product = localProducts.find(p => p.id === id);
    product ? res.json(product) : res.status(404).json({ message: 'Not found' });
});

// 3. Register
app.post('/api/auth/register', async (req, res) => {
    const { email, password, mobile } = req.body;

    if (!supabase) {
        if (memoryUsers.find(u => u.email === email || u.mobile === mobile)) {
            return res.status(400).json({ message: 'User already exists (Memory)' });
        }
        memoryUsers.push({ id: Date.now(), email, password, mobile, created_at: new Date() });
        return res.json({ message: 'User registered (Memory Only)' });
    }

    const { data: existing } = await supabase.from('users').select('*').or(`email.eq.${email},mobile_number.eq.${mobile}`).single();
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const { error } = await supabase.from('users').insert([{ email, password, mobile_number: mobile }]);

    if (error) {
        console.error("❌ Registration Error:", error); // Log the real error
        return res.status(500).json({ message: 'Registration failed: ' + error.message });
    }

    res.json({ message: 'User registered successfully' });
});

// 4. Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!supabase) {
        const user = memoryUsers.find(u => u.email === email && u.password === password);
        if (user) {
            return res.json({ message: 'Login Successful', user: { email: user.email, mobile: user.mobile, id: user.id } });
        }
        return res.status(400).json({ message: 'Invalid Credentials (Memory: Register first)' });
    }

    const { data: user } = await supabase.from('users').select('*').eq('email', email).eq('password', password).single();
    if (user) {
        res.json({ message: 'Login Successful', user: { email: user.email, mobile: user.mobile_number, id: user.id } });
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

// 5. Place Order
app.post('/api/orders', async (req, res) => {
    try {
        const { items, totalAmount, shippingDetails, paymentMethod } = req.body;

        if (!supabase) {
            memoryOrders.push({
                id: 'MEM-' + Date.now(),
                customer_name: shippingDetails.name,
                email: shippingDetails.email,
                items,
                total_amount: totalAmount,
                status: 'Processing',
                created_at: new Date()
            });
            return res.status(201).json({ success: true });
        }

        const { error } = await supabase.from('orders').insert([{
            customer_name: shippingDetails.name,
            email: shippingDetails.email,
            mobile: shippingDetails.mobile,
            address: shippingDetails.address,
            total_amount: totalAmount,
            payment_method: paymentMethod,
            items: items,
            status: 'Processing'
        }]);

        if (error) {
            console.error("Supabase Order Error:", error);
            return res.status(500).json({ success: false, error: error.message });
        }

        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Order Catch Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 6. Get Orders
app.get('/api/orders/:email', async (req, res) => {
    const { email } = req.params;
    if (!supabase) {
        return res.json(memoryOrders.filter(o => o.email === email).sort((a, b) => b.created_at - a.created_at));
    }
    const { data } = await supabase.from('orders').select('*').eq('email', email).order('created_at', { ascending: false });
    res.json(data || []);
});

// 6.5 Update Order Status
app.put('/api/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!supabase) {
        const order = memoryOrders.find(o => o.id === id);
        if (order) order.status = status;
        return res.json({ success: true, status });
    }

    try {
        await supabase.from('orders').update({ status }).eq('id', id);
        res.json({ success: true, status });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 7. Get Reviews
app.get('/api/products/:id/reviews', async (req, res) => {
    const productId = parseInt(req.params.id);
    if (!supabase) {
        return res.json(memoryReviews.filter(r => r.product_id === productId).sort((a, b) => b.created_at - a.created_at));
    }
    try {
        const { data } = await supabase.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false });
        res.json(data || []);
    } catch (err) {
        res.json([]);
    }
});

// 8. Post Review
app.post('/api/products/:id/reviews', async (req, res) => {
    const productId = parseInt(req.params.id);
    const { user_email, rating, comment } = req.body;

    if (!supabase) {
        const newReview = { id: Date.now(), product_id: productId, user_email, rating, comment, created_at: new Date() };
        memoryReviews.push(newReview);
        return res.status(201).json({ success: true, review: newReview });
    }

    try {
        const { data, error } = await supabase.from('reviews').insert([{
            product_id: productId,
            user_email,
            rating,
            comment
        }]).select();

        if (error) return res.status(500).json({ success: false, message: error.message });
        res.status(201).json({ success: true, review: data[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// 9. Get Wishlist
app.get('/api/wishlist/:email', async (req, res) => {
    const { email } = req.params;
    if (!supabase) {
        const productIds = memoryWishlists.filter(w => w.user_email === email).map(w => w.product_id);
        const wishlistProducts = localProducts.filter(p => productIds.includes(p.id));
        return res.json(wishlistProducts);
    }
    try {
        const { data, error } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_email', email);

        if (error || !data) return res.json([]);

        const productIds = data.map(w => w.product_id);
        if (productIds.length === 0) return res.json([]);

        const { data: productsData } = await supabase.from('products').select('*').in('id', productIds);
        res.json(productsData || []);
    } catch (err) {
        res.json([]);
    }
});

// 10. Toggle Wishlist
app.post('/api/wishlist', async (req, res) => {
    const { user_email, product_id } = req.body;

    if (!supabase) {
        const index = memoryWishlists.findIndex(w => w.user_email === user_email && w.product_id === product_id);
        if (index > -1) {
            memoryWishlists.splice(index, 1);
            return res.json({ success: true, message: 'Removed from wishlist', action: 'removed' });
        } else {
            memoryWishlists.push({ id: Date.now(), user_email, product_id });
            return res.json({ success: true, message: 'Added to wishlist', action: 'added' });
        }
    }

    try {
        const { data: existing } = await supabase
            .from('wishlists')
            .select('*')
            .eq('user_email', user_email)
            .eq('product_id', product_id)
            .single();

        if (existing) {
            // Remove
            await supabase.from('wishlists').delete().eq('id', existing.id);
            return res.json({ success: true, message: 'Removed from wishlist', action: 'removed' });
        } else {
            // Add
            await supabase.from('wishlists').insert([{ user_email, product_id }]);
            return res.json({ success: true, message: 'Added to wishlist', action: 'added' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 11. Get Cart
app.get('/api/cart/:email', async (req, res) => {
    const { email } = req.params;
    if (!supabase) {
        const cartItems = memoryCarts.filter(c => c.user_email === email).map(c => {
            const product = localProducts.find(p => p.id === c.product_id);
            return { ...product, quantity: c.quantity };
        }).filter(item => item.id);
        return res.json(cartItems);
    }
    try {
        const { data: cartData, error } = await supabase
            .from('carts')
            .select('product_id, quantity')
            .eq('user_email', email);

        if (error || !cartData || cartData.length === 0) return res.json([]);

        const productIds = cartData.map(c => c.product_id);
        const { data: productsData } = await supabase.from('products').select('*').in('id', productIds);

        if (!productsData) return res.json([]);

        const fullCart = cartData.map(c => {
            const prod = productsData.find(p => p.id === c.product_id);
            return { ...prod, quantity: c.quantity };
        }).filter(item => item.id);

        res.json(fullCart);
    } catch (err) {
        res.json([]);
    }
});

// 12. Add/Update Cart Item
app.post('/api/cart', async (req, res) => {
    const { user_email, product_id, quantity = 1 } = req.body;

    if (!supabase) {
        const existing = memoryCarts.find(c => c.user_email === user_email && c.product_id === product_id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            memoryCarts.push({ id: Date.now(), user_email, product_id, quantity });
        }
        return res.json({ success: true, message: 'Cart updated' });
    }

    try {
        const { data: existing } = await supabase
            .from('carts')
            .select('*')
            .eq('user_email', user_email)
            .eq('product_id', product_id)
            .single();

        if (existing) {
            await supabase.from('carts').update({ quantity: existing.quantity + quantity }).eq('id', existing.id);
        } else {
            await supabase.from('carts').insert([{ user_email, product_id, quantity }]);
        }
        res.json({ success: true, message: 'Cart updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 13. Update Cart Quantity
app.put('/api/cart/quantity', async (req, res) => {
    const { user_email, product_id, delta } = req.body;

    if (!supabase) {
        const existing = memoryCarts.find(c => c.user_email === user_email && c.product_id === product_id);
        if (existing) {
            existing.quantity = Math.max(1, existing.quantity + delta);
        }
        return res.json({ success: true });
    }

    try {
        const { data: existing } = await supabase
            .from('carts')
            .select('*')
            .eq('user_email', user_email)
            .eq('product_id', product_id)
            .single();

        if (existing) {
            const newQty = Math.max(1, existing.quantity + delta);
            await supabase.from('carts').update({ quantity: newQty }).eq('id', existing.id);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 14. Remove Cart Item
app.delete('/api/cart/:email/:productId', async (req, res) => {
    const { email, productId } = req.params;
    const pId = parseInt(productId);

    if (!supabase) {
        const index = memoryCarts.findIndex(c => c.user_email === email && c.product_id === pId);
        if (index > -1) memoryCarts.splice(index, 1);
        return res.json({ success: true });
    }

    try {
        await supabase
            .from('carts')
            .delete()
            .eq('user_email', email)
            .eq('product_id', pId);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 15. Clear Cart
app.delete('/api/cart/clear/:email', async (req, res) => {
    const { email } = req.params;

    if (!supabase) {
        let i = memoryCarts.length;
        while (i--) { if (memoryCarts[i].user_email === email) memoryCarts.splice(i, 1); }
        return res.json({ success: true });
    }

    try {
        await supabase.from('carts').delete().eq('user_email', email);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// 16. Post Contact Message
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!supabase) {
        const newContact = { id: Date.now(), name, email, message, created_at: new Date() };
        memoryContacts.push(newContact);
        return res.status(201).json({ success: true, message: 'Message sent successfully (Memory)' });
    }

    try {
        const { error } = await supabase.from('contacts').insert([{ name, email, message }]);
        if (error) return res.status(500).json({ success: false, message: error.message });
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
