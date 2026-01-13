declare module 'framer-motion' {
  import { HTMLAttributes, RefAttributes } from 'react';
  
  export interface MotionProps extends HTMLAttributes<HTMLElement>, RefAttributes<HTMLElement> {
    className?: string;
  }
}