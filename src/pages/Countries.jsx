import React from 'react';
import { MapPin, DollarSign, GraduationCap, Briefcase, Users, Globe } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/Card';
import Button from '../components/Button';

const Countries = () => {
    const countries = [
        {
            name: 'Canada',
            flag: '🇨🇦',
            description: 'Known for its high quality of life, multicultural society, and world-class education system.',
            highlights: [
                'Post-graduation work permit (PGWP) up to 3 years',
                'Pathway to permanent residence',
                'Affordable tuition compared to US and UK',
                'Safe and welcoming environment',
            ],
            popularUniversities: [
                'University of Toronto',
                'University of British Columbia',
                'McGill University',
                'University of Waterloo',
            ],
            averageTuition: '$15,000 - $35,000 CAD/year',
        },
        {
            name: 'Australia',
            flag: '🇦🇺',
            description: 'Offers excellent education, beautiful landscapes, and great post-study work opportunities.',
            highlights: [
                'Post-study work visa up to 4 years',
                'Part-time work allowed during studies',
                'High quality of life',
                'Diverse and inclusive culture',
            ],
            popularUniversities: [
                'University of Melbourne',
                'Australian National University',
                'University of Sydney',
                'University of Queensland',
            ],
            averageTuition: '$20,000 - $45,000 AUD/year',
        },
        {
            name: 'United Kingdom',
            flag: '🇬🇧',
            description: 'Home to some of the world\'s oldest and most prestigious universities.',
            highlights: [
                'Shorter degree programs (3 years for bachelor\'s)',
                'Post-study work visa for 2 years',
                'Rich cultural heritage',
                'Gateway to Europe',
            ],
            popularUniversities: [
                'University of Oxford',
                'University of Cambridge',
                'Imperial College London',
                'University College London',
            ],
            averageTuition: '£15,000 - £35,000/year',
        },
        {
            name: 'United States',
            flag: '🇺🇸',
            description: 'The world leader in higher education with unparalleled research opportunities.',
            highlights: [
                'Flexible education system',
                'Cutting-edge research facilities',
                'Optional Practical Training (OPT)',
                'Diverse campus life',
            ],
            popularUniversities: [
                'Harvard University',
                'Stanford University',
                'MIT',
                'University of California, Berkeley',
            ],
            averageTuition: '$25,000 - $55,000/year',
        },
        {
            name: 'Europe',
            flag: '🇪🇺',
            description: 'Affordable education with rich cultural experiences across multiple countries.',
            highlights: [
                'Low or no tuition fees in many countries',
                'Schengen visa benefits',
                'Diverse cultures and languages',
                'High quality education',
            ],
            popularDestinations: [
                'Germany',
                'Netherlands',
                'France',
                'Sweden',
            ],
            averageTuition: '€0 - €20,000/year',
        },
    ];

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
                    {countries.map((country, index) => (
                        <div key={index} className="bg-light rounded-2xl p-8 md:p-12">
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
                                        {country.highlights.map((highlight, idx) => (
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
                                        {country.popularUniversities ? 'Popular Universities' : 'Popular Destinations'}
                                    </h3>
                                    <ul className="space-y-2">
                                        {(country.popularUniversities || country.popularDestinations).map((item, idx) => (
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
                                        {country.averageTuition}
                                    </p>
                                    <Button to="/contact" variant="primary" className="w-full">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
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
