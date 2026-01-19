import React from 'react';
import { CheckCircle } from 'lucide-react';
import Button from './Button';

const PromoCard = ({
    image,
    title,
    subtitle,
    features,
    details,
    ctaLink = "/contact"
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    {subtitle && (
                        <span className="inline-block px-3 py-1 bg-primary-red text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                            {subtitle}
                        </span>
                    )}
                    <h3 className="text-2xl font-bold font-poppins leading-tight">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Features List */}
                <div className="mb-6 flex-grow">
                    <h4 className="text-secondary-blue font-semibold mb-3 flex items-center">
                        <span className="w-1 h-6 bg-secondary-blue mr-2 rounded-full"></span>
                        Key Highlights
                    </h4>
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Details Section (Intakes, Costs, etc) */}
                {details && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                        {details.map((detail, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                                <span className="font-semibold text-secondary-blue text-sm block">
                                    {detail.label}:
                                </span>
                                <span className="text-gray-600 text-sm">
                                    {detail.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <Button to={ctaLink} variant="primary" className="w-full justify-center">
                    Apply Now
                </Button>
            </div>
        </div>
    );
};

export default PromoCard;
