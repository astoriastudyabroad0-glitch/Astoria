import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import BlogCard from '../components/BlogCard';
import { BlogService } from '../services/BlogService';

const Blogs = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Load posts from our local service
        const data = BlogService.getAll();
        setPosts(data);
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-secondary-blue text-white py-16">
                <div className="container-custom text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <Newspaper className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-4">
                        News & Updates
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">
                        Stay informed about the latest study abroad opportunities, visa policies, and success stories.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <SectionWrapper background="light">
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
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
