import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, Calendar, CheckCircle2, Truck, Settings, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const orderStatuses = ["Processing", "Packed", "Shipped", "Delivered"];

const Orders = () => {
    const navigate = useNavigate();
    const { orders, fetchOrders, user, updateOrderStatus } = useShop();

    useEffect(() => {
        if (user?.mobile) {
            fetchOrders(user.mobile);
        }
    }, [user, fetchOrders]);

    const getStatusIndex = (status) => {
        const index = orderStatuses.indexOf(status || 'Processing');
        return index !== -1 ? index : 0;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in font-sans">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3 sticky top-0 shadow-sm z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors">
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold">My Orders</h1>
            </div>

            <div className="max-w-3xl mx-auto p-4 space-y-6 lg:mt-6">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-white rounded-3xl shadow-sm p-8">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <Package className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't made your choice yet. Start shopping!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3.5 bg-[#F42C37] text-white rounded-xl font-bold active:scale-95 transition-all shadow-md"
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    orders.map((order, index) => {
                        const currentStatus = order.status || 'Processing';
                        const currentIndex = getStatusIndex(currentStatus);

                        return (
                            <div key={order.id || index} className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100">
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Order ID</p>
                                        <p className="text-sm md:text-base font-black text-gray-900">#ORD-{order.id || Math.floor(Math.random() * 900000) + 100000}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium justify-end mb-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${currentStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            {currentStatus === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {currentStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Tracking Timeline */}
                                <div className="mb-8 px-2 md:px-6">
                                    <p className="text-sm font-bold text-gray-800 mb-6">Track Your Order</p>
                                    <div className="relative flex justify-between">
                                        {/* Connecting Line background */}
                                        <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 rounded-full -z-10"></div>

                                        {/* Active Line foreground */}
                                        <div
                                            className="absolute top-4 left-0 h-1 bg-[#F42C37] rounded-full transition-all duration-700 ease-in-out -z-10"
                                            style={{ width: `${(currentIndex / 3) * 100}%` }}
                                        ></div>

                                        {/* Steps */}
                                        {orderStatuses.map((status, idx) => {
                                            const isActive = idx <= currentIndex;
                                            const isCurrent = idx === currentIndex;
                                            return (
                                                <div key={status} className="flex flex-col items-center gap-2 relative bg-white">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive ? 'border-[#F42C37] bg-[#F42C37] text-white shadow-md' : 'border-gray-100 bg-white text-gray-300'
                                                        } ${isCurrent ? 'ring-4 ring-red-50' : ''}`}>
                                                        {idx === 0 && <Settings className="w-3.5 h-3.5" />}
                                                        {idx === 1 && <Package className="w-3.5 h-3.5" />}
                                                        {idx === 2 && <Truck className="w-3.5 h-3.5" />}
                                                        {idx === 3 && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    </div>
                                                    <span className={`text-[10px] md:text-xs font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                                        {status}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4 mb-6">
                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden p-2">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                ) : (
                                                    <Package className="text-gray-300 w-8 h-8" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <p className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 md:line-clamp-1 group-hover:text-[#F42C37] transition-colors mb-1">{item.name}</p>
                                                <p className="text-xs font-semibold text-gray-500 bg-white inline-block px-2 py-0.5 rounded-md border border-gray-200 w-max">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-sm md:text-base font-black text-gray-900 tabular-nums">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery & Total Footer */}
                                <div className="pt-5 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                            <Truck className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Shipping Address</p>
                                            <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px] md:max-w-xs" title={order.address}>{order.address || 'Standard Delivery'}</p>
                                        </div>
                                    </div>

                                    <div className="text-right flex items-center justify-between md:block px-2 md:px-0 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
                                        <span className="text-xs font-bold text-gray-500 md:block mb-1 uppercase tracking-wider">Total Paid</span>
                                        <span className="text-xl md:text-2xl font-black text-[#F42C37] tabular-nums leading-none flex items-center gap-1">
                                            ₹{parseFloat(order.total_amount).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Demo Simulator to change status */}
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                                    <p className="text-xs text-gray-400 font-medium">Demo Tracking Simulator:</p>
                                    <select
                                        value={currentStatus}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-400"
                                    >
                                        {orderStatuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Orders;
