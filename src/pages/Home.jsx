import React, { useState, useEffect } from 'react';
import { 
    GraduationCap, FileCheck, Plane, Home as HomeIcon, Users, 
    Award, Star, Globe, BookOpen, Shield, TrendingUp, 
    ChevronRight, ChevronLeft, Quote, CheckCircle, Phone 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import PromoCard from '../components/PromoCard';
import SectionWrapper from '../components/SectionWrapper';
import { ReviewService } from '../services/ReviewService';
import { CountryService } from '../services/CountryService';


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

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000); // Show popup after 3 seconds
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsData, countriesData] = await Promise.all([
                    ReviewService.getApproved(),
                    CountryService.getAll()
                ]);
                setTestimonials(reviewsData);
                setCountries(countriesData.slice(0, 3));
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
        if (!showPopup) return null;
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-blue/80 backdrop-blur-md animate-fade-in">
                <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden relative animate-fade-in-up">
                    <button 
                        onClick={() => setShowPopup(false)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-secondary-blue transition-colors z-10"
                    >
                        <ChevronRight className="w-8 h-8 rotate-45" />
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
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 bg-secondary-blue overflow-hidden">
                {/* Abstract Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-red/10 -skew-x-12 transform translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-red/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="container-custom relative z-10 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-primary-red mr-2 animate-pulse"></span>
                                Currently Accepting Intake 2025 Applications
                            </div>
                            <h1 className="font-poppins font-bold text-5xl md:text-7xl text-white mb-8 leading-[1.1]">
                                Master Your <br />
                                <span className="text-primary-red">Global Future</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                                Join over 1,200 Bangladeshi students who successfully started their international education journey with Astoria's expert guidance.
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <Button to="/contact" variant="primary" className="px-10">
                                    Start Free Assessment
                                </Button>
                                <Button to="/countries" variant="white" className="px-10">
                                    Browse Destinations
                                </Button>
                            </div>
                            
                            {/* Trust Badge */}
                            <div className="mt-12 flex items-center space-x-6 text-white/60 text-sm">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary-blue bg-gray-300 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
                                        </div>
                                    ))}
                                </div>
                                <p><span className="text-white font-bold text-lg">4.9/5</span> rating from verified Astoria students</p>
                            </div>
                        </div>

                        <div className="relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 mx-auto lg:mx-0 max-w-lg lg:max-w-none">
                                <img
                                    src={heroImage}
                                    alt="Expert Counseling Session"
                                    className="w-full h-auto"
                                />
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
                                    Intake Open 2025
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
                        View All 15+ Destinations <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </SectionWrapper>

            {/* Promo Section */}
            <SectionWrapper background="secondary" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-20"></div>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                        Our expert consultants provide the strategic edge needed for your international education success. Start your journey today with a free assessment.
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
