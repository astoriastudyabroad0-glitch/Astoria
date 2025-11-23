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
    const baseClasses = 'px-6 py-3 rounded-xl font-medium transition-all duration-300 inline-block text-center';

    const variantClasses = {
        primary: 'bg-primary-red text-white hover:bg-opacity-90 shadow-md hover:shadow-lg',
        secondary: 'bg-secondary-blue text-white hover:bg-opacity-90 shadow-md hover:shadow-lg',
        outline: 'border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white',
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
