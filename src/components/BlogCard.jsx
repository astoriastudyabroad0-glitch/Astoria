import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post, index = 0 }) => {
    return (
        <div 
            className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden bg-gray-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-secondary-blue/5 z-0"></div>
                {/* Blurred Background for Aspect Ratio Fill */}
                <div 
                    className="absolute inset-0 opacity-20 blur-xl scale-110 z-0"
                    style={{ 
                        backgroundImage: `url(${post.image || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    className="relative z-10 w-full h-full object-contain transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-bold text-secondary-blue uppercase tracking-widest shadow-lg flex items-center border border-white/50">
                        <Calendar className="w-3 h-3 mr-2 text-primary-red" />
                        {post.date}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-grow flex flex-col">
                <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-bold font-poppins text-secondary-blue mb-4 group-hover:text-primary-red transition-colors leading-tight line-clamp-2">
                        <Link to={`/blogs/${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {post.subtitle}
                    </p>
                </div>

                <Link
                    to={`/blogs/${post.id}`}
                    className="group/btn inline-flex items-center text-primary-red font-bold text-xs uppercase tracking-widest relative overflow-hidden"
                >
                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                        Read Full Article
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary-red/10 flex items-center justify-center ml-4 group-hover/btn:bg-primary-red group-hover/btn:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
