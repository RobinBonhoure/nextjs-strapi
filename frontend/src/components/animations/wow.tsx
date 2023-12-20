'use client'

import { useEffect, useRef, useState } from 'react';

interface WowProps {
  className?: string;
  offset?: number;
  children?: React.ReactNode;
  once?: boolean;
}


const Wow: React.FC<WowProps> = ({ children, className, offset = 0, once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const wowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
            setHasBeenVisible(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0, rootMargin: `-${offset}px` }
    );

    if (wowRef.current && !hasBeenVisible) {
      observer.observe(wowRef.current);
    }

    return () => {
      if (wowRef.current) {
        observer.unobserve(wowRef.current);
      }
    };
  }, [offset, once, hasBeenVisible]);

  return (
    <div ref={wowRef} className={isVisible ? className : `${className} masked`}>
      {children}
    </div>
  );
};

export default Wow;