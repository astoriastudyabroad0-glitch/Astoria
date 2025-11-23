import React from 'react';

const SectionWrapper = ({
    children,
    className = '',
    background = 'white',
    id
}) => {
    const bgClasses = {
        white: 'bg-white',
        light: 'bg-light',
        dark: 'bg-secondary-blue text-white',
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
