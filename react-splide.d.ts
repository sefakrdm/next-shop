declare module '@splidejs/react-splide' {
    import { Options } from '@splidejs/splide';
    import React from 'react';
  
    export interface SplideProps extends Options {
      children?: React.ReactNode;
    }
  
    export const Splide: React.FC<SplideProps>;
    export const SplideSlide: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  }