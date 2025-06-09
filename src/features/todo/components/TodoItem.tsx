import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import Checkbox from '../../../components/Checkbox';
import Card from '../../../components/Card';
import AnimatedInput from '../../../components/animation/AnimatedInput';
import { CircleX, Pencil, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubtaskList, { SubtaskListRef } from '../../subtask/components/SubtaskList';
import { Subtask } from '../../subtask/types/types';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  setCompleted: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
  setCompleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [showSubtasks, setShowSubtasks] = useState(() => {
    const stored = localStorage.getItem(`showSubtasks_${id}`);
    return stored === 'true';
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const subtaskListRef = useRef<SubtaskListRef>(null);

  useEffect(() => {
    localStorage.setItem(`showSubtasks_${id}`, showSubtasks.toString());
  }, [showSubtasks, id]);

  useEffect(() => {
    setEditText(text);
  }, [text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubtasksChange = (subtasks: Subtask[]) => {
    if (subtasks.length === 0) return;
    const allCompleted = subtasks.every(sub => sub.completed);
    if (allCompleted !== completed) {
      setCompleted(id, allCompleted);
    }
  };

  const syncTodoCompletion = (todoId: number) => {
    const raw = localStorage.getItem(`subtasks_${todoId}`);
    const parsed: Subtask[] = raw ? JSON.parse(raw) : [];
    const allCompleted = parsed.length > 0 && parsed.every(s => s.completed);
    if (allCompleted !== completed) {
      setCompleted(todoId, allCompleted);
    }
  };

  const handleToggleTodo = () => {
    const newCompleted = !completed;
    setCompleted(id, newCompleted);

    if (subtaskListRef.current) {
      subtaskListRef.current.setAllCompleted(newCompleted);
    }
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) {
      onEdit(id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between space-x-4 p-2">
        <label className="flex items-center space-x-2 flex-1 cursor-pointer">
          <Checkbox checked={completed} onChange={handleToggleTodo} />

          <AnimatePresence mode="wait">
            {isEditing ? (
              <AnimatedInput
                key="input"
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.span
                key="text"
                onDoubleClick={() => setIsEditing(true)}
                className={`text-sm ${completed ? 'line-through text-gray-400' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        </label>

        <div className="flex items-center space-x-2">
          <button
            aria-label="Editar tarea"
            onClick={() => setIsEditing(true)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Pencil size={18} />
          </button>
          <button
            aria-label="Eliminar tarea"
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700"
          >
            <CircleX size={18} />
          </button>
          <button
            aria-label="Mostrar/Ocultar subtareas"
            onClick={() => setShowSubtasks(prev => !prev)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSubtasks && (
          <motion.div
            key="subtasks"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <SubtaskList
              ref={subtaskListRef}
              parentId={id}
              onSubtasksChange={handleSubtasksChange}
              syncTodoCompletion={syncTodoCompletion}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default TodoItem;
