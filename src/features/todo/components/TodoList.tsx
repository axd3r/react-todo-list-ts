import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { Todo } from '../types/types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  setCompleted: (id: number, completed: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, setCompleted }) => {
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {todos.map(todo => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
            layout
          >
            <TodoItem
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              setCompleted={setCompleted}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
