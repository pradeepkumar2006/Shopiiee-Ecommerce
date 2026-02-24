import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

export const blogPosts = [
    {
        id: 1,
        title: "The Ultimate Guide to Choosing the Right Headphones",
        snippet: "Discover everything you need to know about over-ear, on-ear, and in-ear options to find the perfect pair for your lifestyle.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        date: "Oct 12, 2024",
        category: "Audio",
    },
    {
        id: 2,
        title: "Top 5 Upcoming Smartwatches in 2024",
        snippet: "Smartwatches are evolving faster than ever. Here is a sneak peek at the most anticipated wearable tech dropping later this year.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        date: "Oct 05, 2024",
        category: "Wearables",
    },
    {
        id: 3,
        title: "How to Build the Perfect Gaming Setup",
        snippet: "From ergonomic chairs to high-refresh-rate monitors and responsive mechanical keyboards, build the ultimate gaming room.",
        image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80",
        date: "Sep 28, 2024",
        category: "Gaming",
    }
];

const Blog = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                        <ArrowLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-gray-900">Latest Blogs</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10 lg:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tighter">OUR <span className="text-[#F42C37]">BLOG</span></h2>
                    <p className="text-gray-500 max-w-xl mx-auto">Explore tips, tech news, and top picks from our expert review team at SHOPIEE.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} onClick={() => navigate(`/blog/${post.id}`)} className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col h-full cursor-pointer">
                            <div className="h-60 bg-gray-100 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#F42C37] shadow">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-3">
                                    <Clock className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#F42C37] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                                    {post.snippet}
                                </p>
                                <div className="mt-auto">
                                    <button className="text-[#F42C37] font-bold text-sm tracking-wide group-hover:underline">READ MORE <span>&rarr;</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
