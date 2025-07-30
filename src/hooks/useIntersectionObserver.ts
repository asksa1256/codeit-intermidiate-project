import { useEffect, useRef } from 'react';

const useIntersectionObserver = (onIntersect: () => void, threshold: number = 0.7) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const currentTarget = targetRef.current;
    if (!currentTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold: threshold },
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [threshold, onIntersect]);

  return targetRef;
};

export default useIntersectionObserver;
