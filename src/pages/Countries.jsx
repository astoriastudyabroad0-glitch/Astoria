import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, GraduationCap, Briefcase, Users, Globe } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { CountryService } from '../services/CountryService';

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Study in Australia, Canada, Malta & Malaysia | Astoria Study Abroad";
        const fetchCountries = async () => {
            try {
                const data = await CountryService.getAll();
                setCountries(data);
            } catch (err) {
                console.error('Error fetching countries:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    const comparisonFactors = [
        {
            icon: DollarSign,
            title: 'Cost of Living',
            description: 'We help you understand and plan for living expenses in each country',
        },
        {
            icon: GraduationCap,
            title: 'Education Quality',
            description: 'All destinations offer world-class education with global recognition',
        },
        {
            icon: Briefcase,
            title: 'Work Opportunities',
            description: 'Post-study work permits and part-time work options vary by country',
        },
        {
            icon: Globe,
            title: 'Immigration Pathways',
            description: 'Different countries offer various routes to permanent residence',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary-blue to-blue-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
                        Study Destinations
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200">
                        Explore world-class education opportunities across the globe
                    </p>
                </div>
            </section>

            {/* Countries */}
            <SectionWrapper background="white">
                <div className="space-y-16">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading destinations...</p>
                        </div>
                    ) : (
                        countries.map((country, index) => (
                            <div key={country.id || index} className="bg-light rounded-2xl p-8 md:p-12">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* Country Header */}
                                    <div className="md:col-span-3">
                                        <div className="flex items-center mb-4">
                                            <span className="text-6xl mr-4">{country.flag}</span>
                                            <div>
                                                <h2 className="font-poppins font-bold text-3xl md:text-4xl text-secondary-blue">
                                                    {country.name}
                                                </h2>
                                                <p className="text-gray-600 mt-2">{country.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Why Choose This Country */}
                                    <div>
                                        <h3 className="font-poppins font-semibold text-xl mb-4 text-secondary-blue flex items-center">
                                            <MapPin className="w-5 h-5 text-primary-red mr-2" />
                                            Why Choose {country.name}?
                                        </h3>
                                        <ul className="space-y-2">
                                            {(Array.isArray(country.highlights) ? country.highlights : []).map((highlight, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-primary-red mr-2">•</span>
                                                    <span className="text-gray-700">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Popular Universities/Destinations */}
                                    <div>
                                        <h3 className="font-poppins font-semibold text-xl mb-4 text-secondary-blue flex items-center">
                                            <GraduationCap className="w-5 h-5 text-primary-red mr-2" />
                                            Popular Items
                                        </h3>
                                        <ul className="space-y-2">
                                            {(Array.isArray(country.popular_items) ? country.popular_items : []).map((item, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-primary-red mr-2">•</span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Cost Information */}
                                    <div>
                                        <h3 className="font-poppins font-semibold text-xl mb-4 text-secondary-blue flex items-center">
                                            <DollarSign className="w-5 h-5 text-primary-red mr-2" />
                                            Average Tuition
                                        </h3>
                                        <p className="text-2xl font-bold text-primary-red mb-4">
                                            {country.average_tuition}
                                        </p>
                                        <Button to="/contact" variant="primary" className="w-full">
                                            Learn More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {!loading && countries.length === 0 && (
                        <p className="text-center text-gray-500 py-20">No study destinations found.</p>
                    )}
                </div>
            </SectionWrapper>

            {/* Comparison Factors */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Choosing the Right Destination
                    </h2>
                    <p className="text-lg text-gray-600">
                        Factors to consider when selecting your study destination
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {comparisonFactors.map((factor, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-red rounded-xl mb-4">
                                <factor.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-poppins font-semibold text-xl mb-2 text-secondary-blue">
                                {factor.title}
                            </h3>
                            <p className="text-gray-600">
                                {factor.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA Section */}
            <SectionWrapper background="dark">
                <div className="text-center">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                        Need Help Choosing?
                    </h2>
                    <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                        Our expert counselors will help you select the best destination based on your
                        academic goals, budget, and career aspirations.
                    </p>
                    <Button to="/contact" variant="primary">
                        Get Free Consultation
                    </Button>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Countries;

