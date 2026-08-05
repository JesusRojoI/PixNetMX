'use client';

import { ReactNode } from 'react';

interface BackgroundPatternProps {
  variant?: 'dots' | 'dots-light' | 'grid' | 'waves';
  className?: string;
  children: ReactNode;
}

export default function BackgroundPattern({ 
  variant = 'dots', 
  className = '', 
  children 
}: BackgroundPatternProps) {
  const patterns = {
    dots: 'pattern-dots',
    'dots-light': 'pattern-dots-light',
    grid: 'pattern-grid',
    waves: 'pattern-waves',
  };

  return (
    <div className={`relative ${patterns[variant]} ${className}`}>
      {children}
    </div>
  );
}