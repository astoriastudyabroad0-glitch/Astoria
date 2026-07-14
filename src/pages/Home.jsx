import React, { useState, useEffect } from 'react';
import { 
    GraduationCap, FileCheck, Plane, Home as HomeIcon, Users, 
    Award, Star, Globe, BookOpen, Shield, TrendingUp, 
    ChevronRight, ChevronLeft, Quote, CheckCircle, Phone, X, Calendar, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import PromoCard from '../components/PromoCard';
import SectionWrapper from '../components/SectionWrapper';
import { ReviewService } from '../services/ReviewService';
import { CountryService } from '../services/CountryService';
import { BlogService } from '../services/BlogService';


import heroImage from '../assets/hero.png';
import maltaImage from '../assets/study-malta.png';
import nzImage from '../assets/study-new-zealand.png';

const Home = () => {
    const services = [
        {
            icon: Shield,
            title: 'Admission Excellence',
            description: 'Navigate the complex world of global admissions with our proven expert strategies.',
        },
        {
            icon: FileCheck,
            title: 'Visa Mastery',
            description: 'Highest success rates with comprehensive documentation and interview preparation.',
        },
        {
            icon: Award,
            title: 'Scholarship Success',
            description: 'Maximize your funding opportunities with our dedicated scholarship scouting.',
        },
        {
            icon: Plane,
            title: 'Departure Ready',
            description: 'From pre-departure briefings to airport pickups, we ensure you settle in smoothly.',
        },
    ];

    const stats = [
        { label: 'Successful Placements', value: '1,200+' },
        { label: 'Visa Success Rate', value: '98%' },
        { label: 'Partner Institutions', value: '250+' },
        { label: 'Years of Excellence', value: '10+' },
    ];

    const [testimonials, setTestimonials] = useState([]);
    const [countries, setCountries] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [blogIndex, setBlogIndex] = useState(0);

    useEffect(() => {
        document.title = "Astoria Study Abroad | IELTS & PTE Specialist Rajshahi";
        
        // Only show popup once per session
        const alreadyShown = sessionStorage.getItem('popupShown');
        if (!alreadyShown) {
            const timer = setTimeout(() => {
                setShowPopup(true);
                sessionStorage.setItem('popupShown', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsData, countriesData, blogsData] = await Promise.all([
                    ReviewService.getApproved(),
                    CountryService.getAll(),
                    BlogService.getAll()
                ]);
                setTestimonials(reviewsData);
                setCountries(countriesData.slice(0, 3));
                setBlogPosts(blogsData.slice(0, 10));
            } catch (err) {
                console.error('Error fetching home data:', err);
            }
        };
        fetchData();
    }, []);

    // Auto-slide logic
    useEffect(() => {
        if (testimonials.length <= 3) return;
        
        const interval = setInterval(() => {
            nextSlide();
        }, 6000);
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
        const count = window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 3);
        for (let i = 0; i < Math.min(testimonials.length, count); i++) {
            visible.push(testimonials[(currentIndex + i) % testimonials.length]);
        }
        return visible;
    };

    const ConsultancyPopup = () => {
        return (
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-blue/80 backdrop-blur-md transition-opacity duration-300 ${showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden relative transition-all duration-300 ${showPopup ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    <button 
                        onClick={() => setShowPopup(false)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-secondary-blue transition-colors z-10"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    
                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-full p-8 md:p-12 text-center md:text-left">
                            <div className="w-16 h-16 bg-primary-red/10 rounded-2xl flex items-center justify-center text-primary-red mb-6 mx-auto md:mx-0">
                                <Phone size={32} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-secondary-blue mb-4 leading-tight">
                                Book Your Free <br />Consultancy
                            </h2>
                            <p className="text-gray-600 mb-8 italic">
                                "95% of our successful students started with this first consultation."
                            </p>
                            <div className="space-y-4">
                                <Button to="/contact" variant="primary" className="w-full py-5 text-xl" onClick={() => setShowPopup(false)}>
                                    Secure My Spot
                                </Button>
                                <p className="text-xs text-center text-gray-400">Available for limited slots only this week.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-x-hidden">
            <ConsultancyPopup />
            {/* Hero Section - Full Branding Focused */}
            <section className="relative pt-24 pb-20 bg-white overflow-hidden">
                {/* Subtle Background Textures */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A2A43 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/30 to-transparent pointer-events-none transition-opacity duration-1000"></div>

                <div className="container-custom relative z-10">
                    <div className="flex flex-col items-center">
                        {/* Status Badge */}
                        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border border-gray-100 text-secondary-blue text-xs font-bold mb-10 shadow-xl shadow-blue-900/5 animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-primary-red mr-3 animate-pulse"></span>
                            Official 2026 Admissions Gateway
                        </div>

                        {/* Massive Branding Image */}
                        <div className="relative w-full max-w-[1400px] mx-auto mb-10 animate-fade-in-up delay-200 group">
                            <div className="absolute -inset-6 bg-gradient-to-r from-primary-red/5 via-transparent to-blue-500/5 rounded-[4rem] blur-3xl opacity-60 pointer-events-none"></div>
                            
                            <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border-[6px] border-white animate-float">
                                <img
                                    src={heroImage}
                                    alt="Astoria Global Success"
                                    className="w-full h-auto object-contain transform transition-transform duration-1000"
                                />
                                
                            </div>
                        </div>

                        {/* Stats / "Bullet Points" - Now Under the Pic */}
                        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 animate-fade-in delay-500">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-50 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <p className="text-3xl md:text-5xl font-black text-secondary-blue mb-2 leading-none">{stat.value}</p>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Top Rated Badge as Bullet Point */}
                        <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50/50 border border-blue-100 text-secondary-blue text-sm font-bold mb-8 animate-fade-in delay-700">
                             <span className="w-2 h-2 rounded-full bg-primary-red mr-3 animate-pulse"></span>
                             Top Rated Global Study Abroad Agency
                        </div>

                        {/* Minimalist CTA Bottom Section */}
                        <div className="mt-12 text-center max-w-2xl animate-fade-in-up delay-500">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary-blue mb-6 tracking-tight leading-[1.2]">
                                Your Gateway to <span className="gradient-text">Global Knowledge</span>
                            </h2>
                            <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                                We help Bangladeshi students navigate the journey to the world's most prestigious universities.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link to="/contact">
                                    <button className="bg-primary-red text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary-red/30 hover:bg-primary-red-hover hover:scale-105 active:scale-95 transition-all duration-300 flex items-center group">
                                        Secure My Consultation
                                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <Link to="/blogs">
                                    <button className="bg-white text-secondary-blue px-12 py-5 rounded-2xl font-bold text-lg border-2 border-gray-100 hover:border-primary-red hover:text-primary-red transition-all duration-300">
                                        Explore Success Stories
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Stats / Trust Bar */}
            <div className="bg-white py-12 border-b border-gray-100">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center border-r last:border-0 border-gray-100 px-4">
                                <p className="text-4xl font-bold text-secondary-blue mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <SectionWrapper background="light">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <p className="text-primary-red font-bold text-sm uppercase tracking-widest mb-4">What We Offer</p>
                        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-secondary-blue leading-tight text-left">
                            Comprehensive Path to <br />International Success
                        </h2>
                    </div>
                    <Button to="/services" variant="outline">View All Services</Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            className="bg-white h-full"
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Destinations Highlight */}
            <SectionWrapper background="white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary-blue mb-6">Top Study Destinations</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Explore prestigious universities and vibrant cultures across the globe. We help you find the perfect match for your academic profile.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {countries.map((country, index) => (
                        <div key={index} className="group relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-secondary-blue">
                            <img 
                                src={country.image || (index === 0 ? maltaImage : nzImage)} 
                                alt={country.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary-blue via-secondary-blue/20 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <span className="inline-block px-3 py-1 bg-primary-red text-white text-xs font-bold rounded-full mb-4">
                                    Intake Open 2026
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-4">{country.name}</h3>
                                <p className="text-gray-300 text-sm mb-6 line-clamp-2">{country.description}</p>
                                <Link to="/countries" className="inline-flex items-center text-white font-bold group-hover:text-primary-red transition-colors">
                                    Explore Courses <ChevronRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/countries" className="text-secondary-blue font-bold text-lg hover:text-primary-red transition-colors inline-flex items-center">
                        View All Destinations <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </SectionWrapper>

            {/* Blog Carousel Section */}
            <SectionWrapper background="secondary" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-20"></div>
                <div className="text-center mb-12 relative z-10">
                    <p className="text-primary-red font-bold text-sm uppercase tracking-widest mb-4">From Our Blog</p>
                    <h2 className="text-4xl md:text-5xl font-bold">Latest News & Insights</h2>
                </div>

                {blogPosts.length > 0 ? (
                    <div className="max-w-2xl mx-auto relative z-10">
                        {/* Blog Card */}
                        <div className="bg-white rounded-[2rem] shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 border border-white/20 overflow-hidden">
                            {/* Image */}
                            <div className="relative h-72 overflow-hidden bg-gray-50 flex items-center justify-center">
                                <div 
                                    className="absolute inset-0 opacity-20 blur-xl scale-110 z-0"
                                    style={{ 
                                        backgroundImage: `url(${blogPosts[blogIndex]?.image || ''})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                                <img
                                    src={blogPosts[blogIndex]?.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60'}
                                    alt={blogPosts[blogIndex]?.title}
                                    className="relative z-10 w-full h-full object-contain"
                                />
                                <div className="absolute top-6 left-6 z-20">
                                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-bold text-secondary-blue uppercase tracking-widest shadow-lg flex items-center border border-white/50">
                                        <Calendar className="w-3 h-3 mr-2 text-primary-red" />
                                        {blogPosts[blogIndex]?.date}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold font-poppins text-secondary-blue mb-4 leading-tight line-clamp-2">
                                    {blogPosts[blogIndex]?.title}
                                </h3>

                                {/* Meta Labels */}
                                {blogPosts[blogIndex]?.labels && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {blogPosts[blogIndex].labels.split(',').filter(Boolean).map((label, i) => (
                                            <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-primary-red/10 text-primary-red text-xs font-bold">
                                                {label.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    to={`/blogs/${blogPosts[blogIndex]?.slug || blogPosts[blogIndex]?.id}`}
                                    className="group/btn inline-flex items-center text-primary-red font-bold text-xs uppercase tracking-widest"
                                >
                                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                                        Read Full Article
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-primary-red/10 flex items-center justify-center ml-4 group-hover/btn:bg-primary-red group-hover/btn:text-white transition-all duration-300">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex justify-center items-center space-x-6 mt-8">
                            <button 
                                onClick={() => setBlogIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)}
                                className="p-3 min-w-[44px] min-h-[44px] rounded-full border-2 border-white/20 text-white hover:bg-white hover:text-secondary-blue transition-all flex items-center justify-center"
                                aria-label="Previous post"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex space-x-2">
                                {blogPosts.map((_, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setBlogIndex(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${blogIndex === i ? 'bg-primary-red w-8' : 'bg-white/30'}`}
                                        aria-label={`Go to post ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={() => setBlogIndex((prev) => (prev + 1) % blogPosts.length)}
                                className="p-3 min-w-[44px] min-h-[44px] rounded-full border-2 border-white/20 text-white hover:bg-white hover:text-secondary-blue transition-all flex items-center justify-center"
                                aria-label="Next post"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Apply to Malta with <br />Full Support</h2>
                            <p className="text-xl text-blue-100 mb-10 leading-relaxed italic border-l-4 border-primary-red pl-6">
                                "Malta offers the most affordable European education with a 100% English-speaking environment. Perfect for Bangladeshi students seeking PR in the EU."
                            </p>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "No IELTS required for specific programs",
                                    "Work while studying authorized",
                                    "Low cost of living compared to UK/USA",
                                    "99% Visa success rate via Astoria"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-lg">
                                        <CheckCircle className="text-primary-red mr-4 w-6 h-6 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button to="/contact" variant="primary" className="px-12">Claim Your Spot Now</Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-red/10 rounded-3xl -rotate-3 scale-105"></div>
                            <img 
                                src={maltaImage} 
                                alt="Study Malta" 
                                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/10"
                            />
                        </div>
                    </div>
                )}
            </SectionWrapper>

            {/* Testimonials */}
            <SectionWrapper background="white">
                <div className="text-center mb-16">
                    <p className="text-primary-red font-bold text-sm uppercase tracking-widest mb-4">Student Stories</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary-blue">Join Our Successful Alumni</h2>
                </div>

                <div className="relative max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                        {getVisibleTestimonials().map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Quote className="absolute top-6 right-6 w-12 h-12 text-secondary-blue/5" />
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-secondary-blue text-white flex items-center justify-center font-bold mr-4">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-secondary-blue">{testimonial.name}</p>
                                        <p className="text-xs text-primary-red font-bold uppercase tracking-wide">Studying in {testimonial.country}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Controls */}
                    <div className="flex justify-center items-center space-x-6">
                        <button onClick={prevSlide} className="p-3 rounded-full border-2 border-gray-100 text-secondary-blue hover:bg-secondary-blue hover:text-white transition-all">
                            <ChevronLeft />
                        </button>
                        <div className="flex space-x-2">
                            {testimonials.slice(0, Math.ceil(testimonials.length / 3)).map((_, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setCurrentIndex(i * 3)}
                                    className={`w-3 h-3 rounded-full transition-all ${currentIndex === i * 3 ? 'bg-primary-red w-8' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>
                        <button onClick={nextSlide} className="p-3 rounded-full border-2 border-gray-100 text-secondary-blue hover:bg-secondary-blue hover:text-white transition-all">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <SectionWrapper background="dark" className="text-center relative overflow-hidden py-32">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Don't Leave Your Future to Chance</h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Rajshahi's trusted IELTS &amp; PTE specialists helping students study in Australia, Canada, Malta &amp; Malaysia. Get your free assessment today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button to="/contact" variant="primary" className="px-12 py-5 text-xl">
                            Book Free Consultation
                        </Button>
                        <Button to="/about" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary-blue px-12 py-5 text-xl">
                            Learn More
                        </Button>
                    </div>
                </div>
            </SectionWrapper>

            {/* Floating Consultation Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Link to="/contact" className="flex items-center bg-primary-red text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group">
                    <Phone className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    <span className="font-bold whitespace-nowrap">Free Consultation</span>
                </Link>
            </div>
        </div>
    );
};


export default Home;
