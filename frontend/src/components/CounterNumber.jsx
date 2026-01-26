import React, { useState, useEffect } from 'react';

const CounterNumber = ({ target, duration = 3500, isVisible, decimals = 0 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = target / (duration / 16);
        let animationFrame;

        const animate = () => {
            start += increment;
            if (start < target) {
                setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isVisible, target, duration, decimals]);

    return <span>{count}</span>;
};

export default CounterNumber;
