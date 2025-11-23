import React from 'react';
import { FileCheck, Plane, Award, Home as HomeIcon, Users, CheckCircle, BookOpen, FileText, Search, MessageSquare } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/Card';
import Button from '../components/Button';

const Services = () => {
    const services = [
        {
            icon: FileCheck,
            title: 'Admission Support',
            description: 'Complete guidance through the university admission process',
            features: [
                'University and program selection based on your profile',
                'Application form completion and review',
                'Statement of Purpose (SOP) writing assistance',
                'Letter of Recommendation (LOR) guidance',
                'Document preparation and verification',
                'Application tracking and follow-up',
            ],
        },
        {
            icon: Plane,
            title: 'Visa Support',
            description: 'Expert assistance for student visa applications',
            features: [
                'Visa eligibility assessment',
                'Complete visa application preparation',
                'Document checklist and verification',
                'Interview preparation and coaching',
                'Embassy appointment scheduling',
                'Post-visa approval guidance',
            ],
        },
        {
            icon: Award,
            title: 'Scholarship Assistance',
            description: 'Help finding and securing scholarships',
            features: [
                'Scholarship opportunity research',
                'Eligibility assessment',
                'Application preparation',
                'Essay and proposal writing support',
                'Financial aid guidance',
                'Merit-based and need-based scholarship applications',
            ],
        },
        {
            icon: HomeIcon,
            title: 'Accommodation Support',
            description: 'Finding safe and comfortable housing',
            features: [
                'On-campus housing application assistance',
                'Off-campus accommodation search',
                'Roommate matching services',
                'Lease agreement review',
                'Safety and location guidance',
                'Budget-friendly options',
            ],
        },
        {
            icon: Users,
            title: 'Post-Arrival Support',
            description: 'Continued assistance after you reach your destination',
            features: [
                'Airport pickup coordination',
                'Local orientation and city tour',
                'Bank account opening guidance',
                'SIM card and phone setup',
                'University registration support',
                'Cultural adaptation assistance',
            ],
        },
    ];

    const additionalServices = [
        {
            icon: BookOpen,
            title: 'Test Preparation',
            description: 'IELTS, TOEFL, GRE, GMAT coaching and resources',
        },
        {
            icon: FileText,
            title: 'Document Translation',
            description: 'Certified translation services for all required documents',
        },
        {
            icon: Search,
            title: 'Career Counseling',
            description: 'Guidance on choosing the right career path and programs',
        },
        {
            icon: MessageSquare,
            title: 'Pre-Departure Briefing',
            description: 'Comprehensive orientation before you travel',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary-blue to-blue-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200">
                        Comprehensive support for every step of your study abroad journey
                    </p>
                </div>
            </section>

            {/* Main Services */}
            <SectionWrapper background="white">
                <div className="space-y-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-red rounded-xl mb-4">
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="font-poppins font-bold text-3xl mb-4 text-secondary-blue">
                                    {service.title}
                                </h2>
                                <p className="text-lg text-gray-700 mb-6">
                                    {service.description}
                                </p>
                                <Button to="/contact" variant="primary">
                                    Get Started
                                </Button>
                            </div>

                            <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                                <div className="bg-light rounded-xl p-6">
                                    <h3 className="font-poppins font-semibold text-xl mb-4 text-secondary-blue">
                                        What We Offer:
                                    </h3>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-primary-red mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Additional Services */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Additional Services
                    </h2>
                    <p className="text-lg text-gray-600">
                        Extra support to make your journey smoother
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {additionalServices.map((service, index) => (
                        <Card
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA Section */}
            <SectionWrapper background="dark">
                <div className="text-center">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                        Book a free consultation with our expert advisors and take the first step
                        towards your international education journey.
                    </p>
                    <Button to="/contact" variant="primary">
                        Book Free Consultation
                    </Button>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Services;
