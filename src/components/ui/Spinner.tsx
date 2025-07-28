// 스피너 컴포넌트

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-solid border-[var(--color-primary)] border-t-transparent ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Spinner;
