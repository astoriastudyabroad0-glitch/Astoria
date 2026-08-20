import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { BlogService } from '../services/BlogService';
import Button from '../components/Button';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const foundPost = await BlogService.getBySlug(slug);
            if (foundPost) {
                setPost(foundPost);
            } else {
                // Post not found
                navigate('/blogs');
            }
            setLoading(false);
        };
        loadPost();
    }, [slug, navigate]);

    if (loading) return <div className="pt-32 text-center">Loading...</div>;
    if (!post) return null;

    // Render HTML content safely
    const renderContent = (content) => {
        return (
            <div 
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: content }} 
            />
        );
    };

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen relative overflow-hidden">
            <div className="container-custom relative z-10">
                
                <Link to="/blogs" className="inline-flex items-center text-secondary-blue/70 hover:text-primary-red mb-10 transition-all group">
                    <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest leading-none">Back to Articles</span>
                </Link>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    
                    {/* Left Column (Main Content) - 65% */}
                    <div className="w-full lg:w-[65%]">
                        {/* Header */}
                        <div className="mb-10">
                            {/* Meta Labels */}
                            {post.labels && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.labels.split(',').filter(Boolean).map((label, i) => (
                                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-red/10 text-primary-red text-[10px] font-bold uppercase tracking-widest">
                                            {label.trim().replace(/^#/, '')}
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            <h1 className="text-4xl md:text-5xl font-bold font-poppins text-secondary-blue mb-8 leading-[1.2] tracking-tight">
                                {post.title}
                            </h1>
                            
                            <div className="flex items-center space-x-6 text-gray-500">
                                <span className="flex items-center text-sm font-bold uppercase tracking-widest">
                                    <Calendar className="w-4 h-4 mr-2 text-primary-red" />
                                    {post.date}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-red"></span>
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {post.content?.split(' ').length || 0} Words
                                </span>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
                            {post.subtitle && (
                                <p className="text-xl md:text-2xl text-gray-500 font-medium italic border-l-8 border-primary-red pl-8 mb-10 leading-relaxed bg-gray-50/50 py-6 rounded-r-3xl pr-6">
                                    {post.subtitle}
                                </p>
                            )}
                            <article className="prose prose-lg max-w-none prose-headings:font-poppins prose-headings:text-secondary-blue prose-p:text-gray-600 prose-p:leading-loose prose-strong:text-secondary-blue prose-a:text-primary-red hover:prose-a:underline">
                                {renderContent(post.content)}
                            </article>
                        </div>
                    </div>

                    {/* Right Column (Sidebar & Cover Image) - 35% */}
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32 space-y-8">
                        
                        {/* Cover Image Card */}
                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                            <div className="w-full max-h-[600px] bg-gray-50 relative group flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-secondary-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                                <img
                                    src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                                    alt={post.title}
                                    className="w-full max-h-[600px] object-contain transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 text-center border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Share this post</h4>
                                <div className="flex justify-center space-x-3">
                                    <button className="w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-primary-red hover:border-primary-red hover:bg-red-50 flex items-center justify-center transition-all">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-secondary-blue rounded-[2rem] shadow-xl p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h4 className="text-white font-bold text-xl mb-3 font-poppins">Ready to study abroad?</h4>
                                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                                    Get personalized guidance from Rajshahi's top consultancy.
                                </p>
                                <Button to="/contact" variant="primary" className="w-full py-3 shadow-lg shadow-primary-red/20">
                                    Free Consultation
                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
