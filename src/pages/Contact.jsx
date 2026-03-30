import React, { useState } from 'react';
import { Phone, MapPin, Instagram, Mail, Send } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/Button';
import { MessageService } from '../services/MessageService';
import { ReviewService } from '../services/ReviewService';
import { Star } from 'lucide-react';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        country: '',
        ieltsTaken: 'no',
        ieltsScore: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const [reviewData, setReviewData] = useState({
        name: '',
        country: '',
        text: '',
        rating: 5,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.country) {
            if (formData.country === 'Select a country') { // In case the value is just the placeholder text
                newErrors.country = 'Please select a country';
            }
        } else {
            newErrors.country = 'Please select a country';
        }

        if (formData.ieltsTaken === 'yes') {
            if (!formData.ieltsScore.trim()) {
                newErrors.ieltsScore = 'IELTS Score is required';
            }
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // Form is valid, submit it
            try {
                await MessageService.save(formData);
                console.log('Form submitted:', formData);
                setSubmitted(true);

                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        country: '',
                        ieltsTaken: 'no',
                        ieltsScore: '',
                        message: '',
                    });
                    setSubmitted(false);
                }, 3000);
            } catch (err) {
                console.error('Error submitting form:', err);
                setErrors({ submit: 'Failed to send message. Please try again later.' });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await ReviewService.save(reviewData);
            setReviewSubmitted(true);
            setTimeout(() => {
                setReviewData({
                    name: '',
                    country: '',
                    text: '',
                    rating: 5,
                });
                setReviewSubmitted(false);
            }, 3000);
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };


    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            content: '01913-354956',
            link: 'tel:01913354956',
        },
        {
            icon: MapPin,
            title: 'Address',
            content: 'Airport Rd, Ahmednogor 6203',
            link: 'https://www.google.com/maps/search/?api=1&query=24.387602,88.607993',
        },
        {
            icon: Instagram,
            title: 'Instagram',
            content: '@astoria_study_abroad',
            link: 'https://instagram.com/astoria_study_abroad',
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'info@astoriastudyabroad.com',
            link: 'mailto:info@astoriastudyabroad.com',
        },
    ];

    const countries = ['Canada', 'Australia', 'United Kingdom', 'United States', 'Europe', 'Other'];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary-blue to-blue-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200">
                        Get in touch with our expert consultants. We're here to help you achieve your study abroad dreams.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <SectionWrapper background="white">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-light rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-red rounded-xl mb-4">
                                <info.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-poppins font-semibold text-lg mb-2 text-secondary-blue">
                                {info.title}
                            </h3>
                            {info.link ? (
                                <a
                                    href={info.link}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="text-gray-700 hover:text-primary-red transition-colors"
                                >
                                    {info.content}
                                </a>
                            ) : (
                                <p className="text-gray-700">{info.content}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Form and Map */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="font-poppins font-bold text-3xl mb-6 text-secondary-blue">
                            Send Us a Message
                        </h2>

                        {submitted && (
                            <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 mb-6">
                                <p className="font-medium">Thank you for your message!</p>
                                <p className="text-sm">We'll get back to you as soon as possible.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                    Interested Country *
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                                )}
                            </div>

                            {/* IELTS Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Have you taken IELTS?
                                </label>
                                <div className="flex items-center space-x-6 mb-4">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="ieltsTaken"
                                            value="yes"
                                            checked={formData.ieltsTaken === 'yes'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary-red border-gray-300 focus:ring-primary-red"
                                        />
                                        <span className="ml-2 text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="ieltsTaken"
                                            value="no"
                                            checked={formData.ieltsTaken === 'no'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-primary-red border-gray-300 focus:ring-primary-red"
                                        />
                                        <span className="ml-2 text-gray-700">No</span>
                                    </label>
                                </div>

                                {formData.ieltsTaken === 'yes' && (
                                    <div className="animate-fade-in-down">
                                        <label htmlFor="ieltsScore" className="block text-sm font-medium text-gray-700 mb-2">
                                            IELTS Score *
                                        </label>
                                        <input
                                            type="text"
                                            id="ieltsScore"
                                            name="ieltsScore"
                                            value={formData.ieltsScore}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.ieltsScore ? 'border-red-500' : 'border-gray-300'
                                                } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent`}
                                            placeholder="Enter your IELTS score (e.g. 6.5)"
                                        />
                                        {errors.ieltsScore && (
                                            <p className="text-red-500 text-sm mt-1">{errors.ieltsScore}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent resize-none`}
                                    placeholder="Tell us about your study abroad plans..."
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" variant="primary" className="w-full flex items-center justify-center">
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Map Placeholder */}
                    <div>
                        <h2 className="font-poppins font-bold text-3xl mb-6 text-secondary-blue">
                            Visit Our Office
                        </h2>
                        <div className="bg-light rounded-xl overflow-hidden h-[600px] flex items-center justify-center">
                            <div className="text-center p-8">
                                <MapPin className="w-16 h-16 text-primary-red mx-auto mb-4" />
                                <h3 className="font-poppins font-semibold text-xl mb-2 text-secondary-blue">
                                    Our Location
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Airport Rd, Ahmednogor 6203
                                </p>
                                <p className="text-sm text-gray-600 mb-6">
                                    Google Maps integration can be added here
                                </p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=24.387602,88.607993"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block"
                                >
                                    <Button variant="outline">
                                        Open in Google Maps
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Office Hours & Success Story Section */}
            <SectionWrapper background="light">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Office Hours */}
                    <div className="text-center max-w-2xl mx-auto flex flex-col justify-center">
                        <h2 className="font-poppins font-bold text-3xl mb-6 text-secondary-blue uppercase tracking-tight">
                            Office Hours
                        </h2>
                        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                            <div className="space-y-3 text-lg">
                                <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-xl">
                                    <span className="font-semibold text-secondary-blue">Open Hours:</span>
                                    <span className="text-gray-700 bg-white px-4 py-1 rounded-full shadow-sm">10am to 8pm</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-6 italic">
                                Walk-ins welcome, but appointments are recommended for personalized consultation.
                            </p>
                        </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <h2 className="font-poppins font-bold text-3xl mb-2 text-secondary-blue">
                            Were You Inspired?
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            Share your success story and inspire other students!
                        </p>

                        {reviewSubmitted && (
                            <div className="bg-blue-50 border border-blue-200 text-secondary-blue rounded-xl p-4 mb-6 animate-fade-in">
                                <p className="font-bold flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Success Story Received!
                                </p>
                                <p className="text-xs mt-1">Thank you for sharing. It will go live after admin approval.</p>
                            </div>
                        )}

                        <form onSubmit={handleReviewSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={reviewData.name}
                                        onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-red"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Country</label>
                                    <input
                                        type="text"
                                        value={reviewData.country}
                                        onChange={(e) => setReviewData({ ...reviewData, country: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-red"
                                        placeholder="e.g., Australia"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Story</label>
                                <textarea
                                    value={reviewData.text}
                                    onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-red resize-none"
                                    placeholder="Tell us about your experience with Astoria..."
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Your Rating</label>
                                <div className="flex justify-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                                            className="transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${star <= reviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" variant="primary" className="w-full flex justify-center py-4 text-lg">
                                Submit Success Story
                            </Button>
                        </form>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Contact;
