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
            className={`card-premium group ${className}`}
        >
            {image && (
                <div className="w-full h-56 overflow-hidden relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            )}

            <div className="p-8">
                {Icon && (
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-light rounded-2xl text-primary-red transition-colors duration-300 group-hover:bg-primary-red group-hover:text-white">
                        <Icon size={32} />
                    </div>
                )}

                {title && (
                    <h3 className="text-2xl font-poppins font-bold text-secondary-blue mb-4 leading-tight">
                        {title}
                    </h3>
                )}

                {description && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {description}
                    </p>
                )}

                {children}
            </div>
        </div>
    );
};


export default Card;
