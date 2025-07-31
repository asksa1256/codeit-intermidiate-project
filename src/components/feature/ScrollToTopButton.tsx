'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg';
import IconButton from '@/components/ui/Button/IconButton';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    // smooth scroll
    const start = window.scrollY;
    const startTime = performance.now();
    const duration = 600; // 전체 애니메이션 시간(ms)

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 ~ 1
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300); // 300px 이상 스크롤 시 버튼 표시
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <IconButton
      icon={RightArrowIcon}
      rounded
      className={clsx(
        'fixed bottom-[100px] md:bottom-10 right-10 z-[8] -rotate-90 transition-all duration-300 ease-in-out shadow-primary',
        isVisible ? 'translate-y-0 pointer-events-auto' : 'translate-y-5 pointer-events-none',
      )}
      style={{ opacity: isVisible ? '1' : '0' }}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollToTopButton;
