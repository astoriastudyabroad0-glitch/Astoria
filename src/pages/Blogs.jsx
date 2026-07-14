import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import BlogCard from '../components/BlogCard';
import { BlogService } from '../services/BlogService';

const Blogs = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = "Study Abroad Blog | Tips for Bangladeshi Students | Astoria Study Abroad";
        const loadPosts = async () => {
            const data = await BlogService.getAll();
            setPosts(data);
        };
        loadPosts();
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-secondary-blue text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-red/5 skew-x-12 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-red/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="container-custom relative z-10 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-primary-red mr-3 animate-pulse"></span>
                        Latest from Astoria
                    </div>
                    <h1 className="font-poppins font-bold text-5xl md:text-7xl mb-6 tracking-tight animate-fade-in-up">
                        News & <span className="text-primary-red">Updates</span>
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up delay-100">
                        Stay informed about the latest study abroad opportunities, visa policies, and success stories from our global student community.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <SectionWrapper background="light">
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <BlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No posts found. Check back soon!</p>
                    </div>
                )}
            </SectionWrapper>
        </div>
    );
};

export default Blogs;
