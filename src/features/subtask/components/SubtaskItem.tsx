import React from 'react';
import { Subtask } from '../types/types';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';

interface SubtaskItemProps {
  subtask: Subtask;
  onToggle: () => void;
  onDelete: () => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, onToggle, onDelete }) => {
  return (
    <motion.div
      className="flex items-center justify-between pl-6 pr-2 py-1 text-sm border-b"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
    >
      <label className="flex items-center gap-2 flex-1">
        <input type="checkbox" checked={subtask.completed} onChange={onToggle} />
        <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
          {subtask.text}
        </span>
      </label>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        <CircleX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default SubtaskItem;
