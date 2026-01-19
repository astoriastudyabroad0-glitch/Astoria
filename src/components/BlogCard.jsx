import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-secondary-blue flex items-center shadow-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 flex-grow">
                    <h3 className="text-xl font-bold font-poppins text-secondary-blue mb-2 line-clamp-2 hover:text-primary-red transition-colors">
                        <Link to={`/blogs/${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                        {post.subtitle}
                    </p>
                </div>

                <Link
                    to={`/blogs/${post.id}`}
                    className="inline-flex items-center text-primary-red font-semibold text-sm hover:underline"
                >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
