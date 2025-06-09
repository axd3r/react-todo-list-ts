import React from 'react';
import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="relative w-5 h-5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="w-full h-full border-2 border-gray-400 rounded-sm" />

      <svg
        viewBox="0 0 24 24"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M4 12l4 4 8-8"
          transform="translate(2, 0)"
          initial={false}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity: checked ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </label>
  );
};

export default Checkbox;
