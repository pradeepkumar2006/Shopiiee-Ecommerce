import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts } from './Blog';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the specific blog post by ID
    const post = blogPosts.find(p => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Blog post not found</p>
                <button onClick={() => navigate('/blog')} className="mt-4 text-[#F42C37] underline font-bold active:scale-95 transition-all">Go back to Blog</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="bg-white sticky top-0 z-20 px-4 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                        <ArrowLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-gray-900">Blog Details</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 lg:px-10 lg:py-16">
                {/* Meta details */}
                <div className="flex items-center gap-3 text-sm font-bold text-[#F42C37] mb-6">
                    <span className="bg-red-50 px-4 py-1.5 rounded-full">{post.category}</span>
                    <span className="text-gray-400 gap-1.5 flex items-center"><Clock className="w-4 h-4" /> {post.date}</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    {post.title}
                </h1>

                {/* Cover Image */}
                <div className="w-full h-[300px] md:h-[500px] rounded-[30px] overflow-hidden mb-12 shadow-md relative group">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-600 leading-relaxed font-medium">
                    <p className="text-2xl text-gray-800 border-l-4 border-[#F42C37] pl-6 py-2 italic font-semibold mb-8">
                        {post.snippet}
                    </p>

                    <p className="mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <p className="mb-6">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why This Matters</h2>

                    <p className="mb-6">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </p>

                    <p className="mb-6">
                        Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
