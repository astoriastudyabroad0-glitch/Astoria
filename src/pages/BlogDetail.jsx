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
        <div className="pt-32 pb-20 bg-secondary-blue min-h-screen">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    
                    {/* Left Column (Title & Content) - 60% */}
                    <div className="w-full md:w-3/5 order-2 md:order-1">
                        <Link to="/blogs" className="inline-flex items-center text-white/70 hover:text-primary-red mb-8 transition-all group">
                            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest leading-none">Back to Articles</span>
                        </Link>
                        
                        <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-6 leading-[1.2] tracking-tight">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center space-x-6 text-white/80 mb-10">
                            <span className="flex items-center text-sm font-bold uppercase tracking-widest">
                                <Calendar className="w-4 h-4 mr-2 text-primary-red" />
                                {post.date}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-red"></span>
                            <span className="text-sm font-bold uppercase tracking-widest">
                                {post.content?.split(' ').length || 0} Words
                            </span>
                        </div>

                        {/* Content Body */}
                        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-100">
                            {post.subtitle && (
                                <p className="text-xl md:text-2xl text-gray-500 font-medium italic border-l-8 border-primary-red pl-8 mb-10 leading-relaxed bg-gray-50/50 py-6 rounded-r-3xl pr-6">
                                    {post.subtitle}
                                </p>
                            )}
                            <article className="prose prose-lg md:prose-xl max-w-none prose-headings:font-poppins prose-headings:text-secondary-blue prose-p:text-gray-600 prose-p:leading-loose prose-strong:text-secondary-blue prose-a:text-primary-red hover:prose-a:underline">
                                {renderContent(post.content)}
                            </article>
                            
                            <div className="border-t border-gray-100 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
                                <div>
                                    <h4 className="text-secondary-blue font-bold text-lg mb-2">Interested in this topic?</h4>
                                    <p className="text-gray-400 text-sm">Consult with our experts for personalized guidance.</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Button to="/contact" variant="primary" className="px-8 rounded-full shadow-lg shadow-primary-red/20 transform hover:-translate-y-1">
                                        Book Free Consultation
                                    </Button>
                                    <button className="p-3 rounded-full border border-gray-200 text-gray-400 hover:text-primary-red hover:border-primary-red transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Cover Image) - 40% */}
                    <div className="w-full md:w-2/5 order-1 md:order-2 md:sticky md:top-32">
                        <img
                            src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                            alt={post.title}
                            className="w-full rounded-xl object-cover max-h-[400px] shadow-2xl border-4 border-white/10 animate-fade-in"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
