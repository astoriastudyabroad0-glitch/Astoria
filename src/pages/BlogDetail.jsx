import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { BlogService } from '../services/BlogService';
import Button from '../components/Button';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            const foundPost = await BlogService.getById(id);
            if (foundPost) {
                setPost(foundPost);
            } else {
                // Post not found
                navigate('/blogs');
            }
            setLoading(false);
        };
        loadPost();
    }, [id, navigate]);

    if (loading) return <div className="pt-32 text-center">Loading...</div>;
    if (!post) return null;

    // Simple Markdown Render Helper
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold text-secondary-blue mt-8 mb-4">{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-semibold text-secondary-blue mt-6 mb-3">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-4 list-disc text-gray-700 mb-2">{line.replace('- ', '')}</li>;
            }
            // Very basic numbered list check
            if (/^\d+\./.test(line)) {
                return <li key={index} className="ml-4 list-decimal text-gray-700 mb-2">{line.replace(/^\d+\.\s*/, '')}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
        });
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            {/* Hero Image Section */}
            <div className="h-[70vh] w-full relative overflow-hidden bg-secondary-blue flex items-center justify-center">
                {/* Blurred Background Layers */}
                <div 
                    className="absolute inset-0 opacity-40 blur-3xl scale-110"
                    style={{ 
                        backgroundImage: `url(${post.image || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                
                {/* Main Content Image */}
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    className="relative z-10 max-h-full max-w-[90%] object-contain animate-fade-in py-10"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 container-custom">
                    <div className="max-w-4xl animate-fade-in-up">
                        <Link to="/blogs" className="inline-flex items-center text-white/70 hover:text-primary-red mb-6 transition-all group">
                            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest leading-none">Back to Articles</span>
                        </Link>
                        <h1 className="text-4xl md:text-7xl font-bold font-poppins text-white mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center space-x-6 text-white/80">
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
                </div>
            </div>

            {/* Content Section */}
            <div className="container-custom -translate-y-20 relative z-20 pb-20">
                <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-8 md:p-16 lg:p-20 overflow-hidden animate-fade-in-up delay-200 border border-gray-100">
                    <p className="text-xl md:text-2xl text-gray-500 font-medium italic border-l-8 border-primary-red pl-8 mb-16 leading-relaxed bg-gray-50/50 py-8 rounded-r-3xl pr-8">
                        {post.subtitle}
                    </p>

                    <article className="prose prose-lg md:prose-xl max-w-none prose-headings:font-poppins prose-headings:text-secondary-blue prose-p:text-gray-600 prose-p:leading-loose prose-strong:text-secondary-blue prose-a:text-primary-red hover:prose-a:underline">
                        {renderContent(post.content)}
                    </article>

                    <div className="border-t border-gray-100 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
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
        </div>
    );
};

export default BlogDetail;
