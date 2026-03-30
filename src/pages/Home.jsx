import React, { useState, useEffect } from 'react';
import { GraduationCap, FileCheck, Plane, Home as HomeIcon, Users, Award, Star, Globe, BookOpen, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import PromoCard from '../components/PromoCard';
import SectionWrapper from '../components/SectionWrapper';
import { ReviewService } from '../services/ReviewService';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import heroImage from '../assets/hero.png';
import maltaImage from '../assets/study-malta.png';
import nzImage from '../assets/study-new-zealand.png';

const Home = () => {
    const services = [
        {
            icon: FileCheck,
            title: 'Admission Support',
            description: 'Expert guidance through the entire admission process to top universities worldwide.',
        },
        {
            icon: Plane,
            title: 'Visa Support',
            description: 'Complete visa application assistance with high success rates.',
        },
        {
            icon: Award,
            title: 'Scholarship Help',
            description: 'Find and apply for scholarships to make your education affordable.',
        },
        {
            icon: HomeIcon,
            title: 'Accommodation',
            description: 'Help finding safe and comfortable housing near your university.',
        },
        {
            icon: Users,
            title: 'Post-Arrival Support',
            description: 'Continued support after you arrive to help you settle in smoothly.',
        },
    ];

    const countries = [
        {
            name: 'Canada',
            image: '/images/canada-flag.png',
            description: 'World-class education with post-study work opportunities',
        },
        {
            name: 'Australia',
            image: '/images/australia-flag.png',
            description: 'High quality of life and excellent universities',
        },
        {
            name: 'United Kingdom',
            image: '/images/uk-flag.png',
            description: 'Historic institutions and diverse cultural experience',
        },
        {
            name: 'United States',
            image: '/images/usa-flag.png',
            description: 'Top-ranked universities and cutting-edge research',
        },
        {
            name: 'Europe',
            image: '/images/europe-flag.png',
            description: 'Affordable education and rich cultural heritage',
        },
    ];

    const whyChooseUs = [
        {
            icon: Shield,
            title: 'Trusted Expertise',
            description: 'Years of experience helping students achieve their dreams',
        },
        {
            icon: Globe,
            title: 'Global Network',
            description: 'Partnerships with universities across the world',
        },
        {
            icon: BookOpen,
            title: 'Personalized Guidance',
            description: 'Tailored support for your unique educational goals',
        },
        {
            icon: Award,
            title: 'High Success Rate',
            description: '95% visa approval rate and countless success stories',
        },
    ];

    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await ReviewService.getApproved();
                setTestimonials(data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };
        fetchReviews();
    }, []);

    // Auto-slide logic
    useEffect(() => {
        if (testimonials.length <= 3) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length, currentIndex]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const getVisibleTestimonials = () => {
        if (testimonials.length === 0) return [];
        const visible = [];
        for (let i = 0; i < Math.min(testimonials.length, 3); i++) {
            visible.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return visible;
    };


    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-secondary-blue via-secondary-blue to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-red transform skew-x-12"></div>
                </div>

                <div className="container-custom py-20 md:py-32 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="font-poppins font-bold text-4xl md:text-6xl mb-6 leading-tight">
                                Your Gateway to
                                <span className="text-primary-red"> International Education</span>
                            </h1>
                            <p className="text-xl mb-8 text-gray-200">
                                Expert guidance for studying in Canada, Australia, UK, USA, and Europe.
                                Let us help you achieve your academic dreams.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button to="/contact" variant="primary">
                                    Get Started
                                </Button>
                                <Button to="/services" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary-blue">
                                    Our Services
                                </Button>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-red rounded-full opacity-20 blur-3xl"></div>
                                <div className="relative">
                                    <img
                                        src={heroImage}
                                        alt="Study Abroad Students"
                                        className="w-full h-auto rounded-2xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <SectionWrapper background="white">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 text-secondary-blue">
                        About Astoria Study Abroad
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        We are a dedicated team of education consultants committed to helping students
                        from Bangladesh pursue their higher education dreams abroad. With years of experience
                        and a proven track record, we provide comprehensive support throughout your journey.
                    </p>
                    <p className="text-lg text-gray-700">
                        From choosing the right university to settling in your new country, we're with you every step of the way.
                    </p>
                </div>
            </SectionWrapper>

            {/* Services Section */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-600">
                        Comprehensive support for your study abroad journey
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button to="/services" variant="primary">
                        View All Services
                    </Button>
                </div>
            </SectionWrapper>

            {/* Countries Section */}
            <SectionWrapper background="white">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Study Destinations
                    </h2>
                    <p className="text-lg text-gray-600">
                        Explore world-class education opportunities
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {countries.slice(0, 3).map((country, index) => (
                        <Card
                            key={index}
                            title={country.name}
                            description={country.description}
                        >
                            <Button to="/countries" variant="outline" className="w-full">
                                Learn More
                            </Button>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button to="/countries" variant="primary">
                        View All Destinations
                    </Button>
                </div>
            </SectionWrapper>

            {/* Why Choose Us Section */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Why Choose Astoria?
                    </h2>
                    <p className="text-lg text-gray-600">
                        Your success is our mission
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {whyChooseUs.map((item, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-red rounded-xl mb-4">
                                <item.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-poppins font-semibold text-xl mb-2 text-secondary-blue">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Latest Opportunities Section - From Facebook Posts */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Latest Opportunities
                    </h2>
                    <p className="text-lg text-gray-600">
                        Check out our latest study abroad offers and updates
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <PromoCard
                        image={maltaImage}
                        title="Study in Malta"
                        subtitle="Detailed Guidance"
                        features={[
                            "English Speaking European Country",
                            "Affordable Tuition & Living Cost",
                            "EU & Schengen Member State",
                            "High Visa Success Rate",
                            "Work While Studying (20hrs/week)"
                        ]}
                        details={[
                            { label: "Intakes", value: "January, April, July, October" },
                            { label: "Tuition Fee", value: "Approx €3,000 – €8,000 / year" }
                        ]}
                    />
                    <PromoCard
                        image={nzImage}
                        title="Study in New Zealand"
                        subtitle="2025-2026 Updates"
                        features={[
                            "Top-Ranked Universities & Programs",
                            "Work Up to 25 Hours/Week (New Rule)",
                            "Post-Study Work Visa (Stay 1-3 Years)",
                            "Open Pathway to PR (Permanent Residency)",
                            "Family Accompany Policy for Specific Courses"
                        ]}
                        ctaLink="/contact"
                    />
                </div>
            </SectionWrapper>

            {/* Testimonials Section */}
            <SectionWrapper background="white">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Student Success Stories
                    </h2>
                    <p className="text-lg text-gray-600">
                        Hear from students who achieved their dreams with us
                    </p>
                </div>

                <div className="relative group max-w-6xl mx-auto">
                    {/* Navigation Buttons */}
                    {testimonials.length > 3 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-secondary-blue hover:bg-secondary-blue hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-secondary-blue hover:bg-secondary-blue hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    <div className="overflow-hidden px-2">
                        <div 
                            className={`grid md:grid-cols-3 gap-8 transition-opacity duration-500 ${isAnimating ? 'opacity-40' : 'opacity-100'}`}
                        >
                            {getVisibleTestimonials().map((testimonial, index) => (
                                <div 
                                    key={`${testimonial.id}-${index}`} 
                                    className="bg-white rounded-3xl shadow-xl p-8 border-t-8 border-primary-red relative transform transition-transform hover:-translate-y-2"
                                >
                                    <Quote className="absolute top-4 right-4 w-10 h-10 text-gray-50 opacity-10" />
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-8 italic leading-relaxed font-medium">"{testimonial.text}"</p>
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-secondary-blue font-bold text-xl">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-secondary-blue uppercase tracking-tight">{testimonial.name}</p>
                                            <p className="text-xs text-primary-red font-bold">Now studying in {testimonial.country}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center mt-10 space-x-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-secondary-blue w-8' : 'bg-gray-200'}`}
                            />
                        ))}
                    </div>
                </div>

            </SectionWrapper>

            {/* CTA Section */}
            <SectionWrapper background="dark">
                <div className="text-center">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                        Get in touch with our expert consultants today and take the first step
                        towards your international education dream.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button to="/contact" variant="primary">
                            Contact Us Now
                        </Button>
                        <Button to="/about" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary-blue">
                            Learn More About Us
                        </Button>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Home;
