import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    to,
    href,
    onClick,
    className = '',
    type = 'button',
    ...props
}) => {
    const baseClasses = 'px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-block text-center transform active:scale-95';

    const variantClasses = {
        primary: 'bg-primary-red text-white hover:bg-primary-red-hover shadow-lg hover:shadow-primary-red/40',
        secondary: 'bg-secondary-blue text-white hover:bg-secondary-blue-light shadow-lg hover:shadow-secondary-blue/40',
        outline: 'border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white shadow-md hover:shadow-primary-red/20',
        white: 'bg-white text-secondary-blue hover:bg-gray-50 shadow-lg hover:shadow-white/20',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;


    // If it's a Link (internal navigation)
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    // If it's an external link
    if (href) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    }

    // Regular button
    return (
        <button type={type} onClick={onClick} className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
