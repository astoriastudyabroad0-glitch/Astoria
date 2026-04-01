import React from 'react';

const SectionWrapper = ({
    children,
    className = '',
    background = 'white',
    id
}) => {
    const bgClasses = {
        white: 'bg-white text-dark',
        light: 'bg-light text-dark',
        dark: 'bg-dark text-white',
        primary: 'bg-primary-red text-white',
        secondary: 'bg-secondary-blue text-white',
    };

    return (
        <section
            id={id}
            className={`section-padding ${bgClasses[background]} ${className}`}
        >
            <div className="container-custom">
                {children}
            </div>
        </section>
    );
};


export default SectionWrapper;
