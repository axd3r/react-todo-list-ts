import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import useSubtasks from '../hooks/useSubtasks';
import SubtaskItem from './SubtaskItem';
import { Subtask } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';

interface SubtaskListProps {
  parentId: number;
  onSubtasksChange: (subtasks: Subtask[]) => void;
  syncTodoCompletion: (todoId: number) => void;
}

export interface SubtaskListRef {
  setAllCompleted: (completed: boolean) => void;
}

const SubtaskList = forwardRef<SubtaskListRef, SubtaskListProps>(
  ({ parentId, onSubtasksChange, syncTodoCompletion }, ref) => {
    const [input, setInput] = useState('');
    const [showSubtasks, setShowSubtasks] = useState(true);

    const {
      subtasks,
      addSubtask,
      toggleSubtask,
      deleteSubtask,
      setAllSubtasksCompleted,
    } = useSubtasks(parentId, syncTodoCompletion);

    useEffect(() => {
      onSubtasksChange(subtasks);
    }, [subtasks, onSubtasksChange]);

    useImperativeHandle(ref, () => ({
      setAllCompleted(completed: boolean) {
        setAllSubtasksCompleted(completed);
      },
    }));

    const handleAdd = () => {
      if (input.trim()) {
        addSubtask(input.trim());
        setInput('');
      }
    };

    return (
      <div className="w-full mt-2">
        <button
          onClick={() => setShowSubtasks(!showSubtasks)}
          className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-800"
          aria-expanded={showSubtasks}
        >
          {showSubtasks ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <span>{`Subtareas (${subtasks.length})`}</span>
        </button>

        <AnimatePresence initial={false}>
          {showSubtasks && (
            <motion.div
              key="subtasks-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {subtasks.length === 0 && (
                <p className="text-sm text-gray-400 mt-1">No hay subtareas.</p>
              )}

              <AnimatePresence>
                {subtasks.map(subtask => (
                  <motion.div
                    key={subtask.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SubtaskItem
                      subtask={subtask}
                      onToggle={() => toggleSubtask(subtask.id)}
                      onDelete={() => deleteSubtask(subtask.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-center gap-2 mt-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}
                  className="text-sm border rounded px-2 py-1 flex-1"
                  placeholder="Agregar subtarea..."
                />
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Agregar subtarea"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default SubtaskList;
