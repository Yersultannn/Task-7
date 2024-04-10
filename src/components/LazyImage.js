import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt }) => {
    const imageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(imageRef.current);

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    return (
        <img
            ref={imageRef}
            src={isVisible ? src : ''}
            alt={alt}
            width={250}
            height={300}
            style={{
                opacity: isVisible ? 2 : 0,
                transition: 'opacity 1s'
            }}
        />
    );
};

export default LazyImage;
