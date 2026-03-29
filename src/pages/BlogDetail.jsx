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
        <div className="pt-20">
            {/* Image Header */}
            <div className="h-[400px] w-full relative">
                <img
                    src={post.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container-custom">
                    <Link to="/blogs" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blogs
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold font-poppins mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm md:text-base bg-primary-red px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.date}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <SectionWrapper background="white" className="max-w-4xl mx-auto">
                <article className="prose lg:prose-xl max-w-none">
                    {renderContent(post.content)}
                </article>

                <div className="border-t border-gray-200 mt-12 pt-8 flex justify-between items-center">
                    <Button to="/contact" variant="primary">
                        Contact Us About This
                    </Button>
                    <button className="flex items-center text-gray-500 hover:text-secondary-blue">
                        <Share2 className="w-5 h-5 mr-2" />
                        Share Article
                    </button>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default BlogDetail;
