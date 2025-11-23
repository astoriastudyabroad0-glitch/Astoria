import React from 'react';

const Card = ({
    image,
    icon: Icon,
    title,
    description,
    children,
    className = '',
    hover = true
}) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-md overflow-hidden ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
                } transition-all duration-300 ${className}`}
        >
            {image && (
                <div className="w-full h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="p-6">
                {Icon && (
                    <div className="mb-4">
                        <Icon className="w-12 h-12 text-primary-red" />
                    </div>
                )}

                {title && (
                    <h3 className="text-xl font-poppins font-semibold text-dark mb-3">
                        {title}
                    </h3>
                )}

                {description && (
                    <p className="text-gray-600 mb-4">
                        {description}
                    </p>
                )}

                {children}
            </div>
        </div>
    );
};

export default Card;
