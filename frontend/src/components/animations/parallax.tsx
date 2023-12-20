'use client'

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  start: string;
  end: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, start, end }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [elementBottom, setElementBottom] = useState(0);
  const [transform, setTransform] = useState(start); // Initialize with start
  const [opacity, setOpacity] = useState(0); // Initialize opacity with 1
  const [transition, setTransition] = useState('none'); // Initialize with 'none'

  useEffect(() => {
    const element = elementRef.current;

    const initScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setTransition('transform 0.5s linear, opacity 0.5s linear')
    };

    setWindowHeight(window.innerHeight);

    initScroll();
    window.addEventListener('scroll', handleScroll);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      setElementTop(elementRect.top + window.scrollY);
      setElementBottom(elementRect.bottom + window.scrollY);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const calculateTransform = () => {
    const elementHeight = elementBottom - elementTop;
    const scrollProgress = Math.min(
      1,
      Math.max(
        0,
        (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight)
      )
    ) || 0;

    const parsedStart = parseEffect(start);
    const parsedEnd = parseEffect(end);

    if (parsedStart.effect === 'opacity' && parsedEnd.effect === 'opacity') {
      // Handle opacity effect
      setTransform(''); // Clear any transform

      setOpacity(parsedStart.value + scrollProgress * (parsedEnd.value - parsedStart.value));
    } else {
      // Handle transform effect
      setOpacity(1); // Reset opacity
      const current = parsedStart.value + scrollProgress * (parsedEnd.value - parsedStart.value);
      setTransform(`${parsedStart.effect}(${current}${parsedStart.unit})`);
    }
  };

  const parseEffect = (value: string) => {
    const match = value.match(/([a-zA-Z]+)\(([^)]+)\)/);
    if (match) {
      return {
        effect: match[1],
        value: parseFloat(match[2]),
        unit: match[2].replace(/[0-9.-]/g, ''),
      };
    }
    return {
      effect: '',
      value: 0,
      unit: '',
    };
  };

  useEffect(() => {
    // Update transform and opacity when scrollY changes
    calculateTransform();
  }, [scrollY]); 

  return (
    <div
      ref={elementRef}
      style={{
        transform: transform,
        opacity: opacity,
        transition: transition,
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;