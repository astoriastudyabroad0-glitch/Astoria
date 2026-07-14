import React, { useEffect } from 'react';
import { Target, Eye, Heart, Users, TrendingUp, CheckCircle } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/Card';

const About = () => {
    useEffect(() => {
        document.title = "About Us | Astoria Study Abroad Rajshahi";
    }, []);
    const values = [
        {
            icon: Target,
            title: 'Mission',
            description: 'To empower students from Bangladesh to access world-class education opportunities and achieve their full potential through expert guidance and unwavering support.',
        },
        {
            icon: Eye,
            title: 'Vision',
            description: 'To be the most trusted and preferred study abroad consultancy, known for our commitment to student success and ethical practices.',
        },
        {
            icon: Heart,
            title: 'Values',
            description: 'Integrity, Excellence, Student-Centric Approach, Innovation, and Commitment to helping every student succeed.',
        },
    ];

    const team = [
        {
            name: 'Dr. Rahman Ahmed',
            role: 'Founder & CEO',
            description: 'PhD in Education, 15+ years of experience in international education consulting',
        },
        {
            name: 'Fatima Khan',
            role: 'Head of Admissions',
            description: 'Former university admissions officer with expertise in top global universities',
        },
        {
            name: 'Imran Hossain',
            role: 'Visa Specialist',
            description: 'Certified immigration consultant with 95% visa success rate',
        },
        {
            name: 'Nusrat Jahan',
            role: 'Student Counselor',
            description: 'Dedicated to matching students with their ideal programs and universities',
        },
    ];

    const process = [
        {
            step: '01',
            title: 'Initial Consultation',
            description: 'Free consultation to understand your goals, academic background, and preferences.',
        },
        {
            step: '02',
            title: 'University Selection',
            description: 'We help you choose the best universities and programs that match your profile.',
        },
        {
            step: '03',
            title: 'Application Preparation',
            description: 'Expert assistance with applications, essays, and all required documentation.',
        },
        {
            step: '04',
            title: 'Visa Application',
            description: 'Complete support for visa application with high success rates.',
        },
        {
            step: '05',
            title: 'Pre-Departure Briefing',
            description: 'Comprehensive orientation on what to expect and how to prepare.',
        },
        {
            step: '06',
            title: 'Post-Arrival Support',
            description: 'Continued assistance even after you reach your destination.',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-secondary-blue to-blue-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
                        About Astoria Study Abroad
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto text-gray-200">
                        Your trusted partner in making international education dreams come true
                    </p>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <SectionWrapper background="white">
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-red rounded-xl mb-6">
                                <value.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="font-poppins font-bold text-2xl mb-4 text-secondary-blue">
                                {value.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Our Story */}
            <SectionWrapper background="light">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6 text-secondary-blue text-center">
                        Our Story
                    </h2>
                    <div className="space-y-4 text-gray-700 text-lg">
                        <p>
                            Founded in 2015, Astoria Study Abroad began with a simple mission: to help talented
                            students from Bangladesh access world-class education opportunities. As a leading study abroad consultant in Rajshahi,
                            we have grown into one of the most trusted names in international education consulting.
                        </p>
                        <p>
                            Over the years, we've helped hundreds of students secure admissions and provided expert student visa guidance for prestigious
                            universities. We specialize in helping students study in Australia, Canada, Malta, Malaysia, and beyond. From comprehensive IELTS and PTE preparation to final pre-departure briefings, our success is built on a foundation of expertise and a genuine commitment to each student's success.
                        </p>
                        <p>
                            Today, our team of experienced consultants work together to provide comprehensive support at every stage of your
                            study abroad journey. We don't just help you get admitted – we ensure you're prepared
                            to thrive in your new academic environment. Start your journey with our free consultation today.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Team Section */}
            <SectionWrapper background="white">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Meet Our Team
                    </h2>
                    <p className="text-lg text-gray-600">
                        Experienced professionals dedicated to your success
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <Card key={index} className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-red to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Users className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="font-poppins font-semibold text-xl mb-2 text-secondary-blue">
                                {member.name}
                            </h3>
                            <p className="text-primary-red font-medium mb-3">
                                {member.role}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {member.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>

            {/* Our Process */}
            <SectionWrapper background="light">
                <div className="text-center mb-12">
                    <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-secondary-blue">
                        Our Process
                    </h2>
                    <p className="text-lg text-gray-600">
                        A step-by-step journey to your dream university
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {process.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white rounded-xl shadow-md p-6 h-full border-l-4 border-primary-red">
                                <div className="flex items-center mb-4">
                                    <span className="text-5xl font-bold text-primary-red opacity-20 mr-4">
                                        {item.step}
                                    </span>
                                    <CheckCircle className="w-8 h-8 text-primary-red" />
                                </div>
                                <h3 className="font-poppins font-semibold text-xl mb-3 text-secondary-blue">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Stats Section */}
            <SectionWrapper background="dark">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-bold text-primary-red mb-2">500+</div>
                        <p className="text-gray-300">Students Placed</p>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary-red mb-2">95%</div>
                        <p className="text-gray-300">Visa Success Rate</p>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary-red mb-2">50+</div>
                        <p className="text-gray-300">Partner Universities</p>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary-red mb-2">8+</div>
                        <p className="text-gray-300">Years of Experience</p>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default About;
