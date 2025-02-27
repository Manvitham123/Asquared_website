import React, { useState, useEffect, useRef } from 'react';
import './FadeInSection.css';

function FadeInSection({ children }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    const { current } = domRef;
    if (current) observer.observe(current);

    // Cleanup
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

export default FadeInSection;
