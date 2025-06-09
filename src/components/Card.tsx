import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <motion.div
    className={`bg-white rounded-md shadow p-4 ${className}`}
    whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card;
