import { useEffect, useState } from 'react';
import type { Subtask } from '../types/types';

const SUBTASK_KEY_PREFIX = 'subtasks_';

const useSubtasks = (todoId: number, syncTodoCompletion: (todoId: number) => void) => {
  const key = `${SUBTASK_KEY_PREFIX}${todoId}`;

  const [subtasks, setSubtasks] = useState<Subtask[]>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(subtasks));
    syncTodoCompletion(todoId);
  }, [subtasks, todoId, syncTodoCompletion]);

  function addSubtask(text: string) {
    const newSubtask: Subtask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      parentTodoId: todoId,
    };
    setSubtasks(prev => [...prev, newSubtask]);
  }

  function toggleSubtask(subtaskId: number) {
    setSubtasks(prev =>
      prev.map(sub =>
        sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
      )
    );
  }

  function deleteSubtask(id: number) {
    setSubtasks(prev => prev.filter(sub => sub.id !== id));
  }

  function editSubtask(id: number, newText: string) {
    setSubtasks(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, text: newText } : sub
      )
    );
  }

  function setAllSubtasksCompleted(completed: boolean) {
    setSubtasks(prev =>
      prev.map(sub => ({
        ...sub,
        completed,
      }))
    );
  }

  return {
    subtasks,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    editSubtask,
    setAllSubtasksCompleted,
  };
};

export default useSubtasks;
