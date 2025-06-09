import { useEffect, useState } from 'react';
import { Todo } from '../types/types';
import { getSubtasks, setSubtasksCompleted } from '../../storage/localStorageSubtasks';

const LOCAL_STORAGE_KEY = 'secret_key';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? (JSON.parse(storedTodos) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string) {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    localStorage.removeItem(`subtasks_${id}`);
  }

  function toggleTodo(id: number) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(id: number, newText: string) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }

  function setCompleted(id: number, completed: boolean) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
    setSubtasksCompleted(id, completed);
  }

  function syncTodoCompletion(todoId: number) {
    const subtasks = getSubtasks(todoId);
    const allCompleted = subtasks.length > 0 && subtasks.every(sub => sub.completed);

    setTodos(prev =>
      prev.map(todo =>
        todo.id === todoId ? { ...todo, completed: allCompleted } : todo
      )
    );
  }

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    setCompleted,
    syncTodoCompletion
  };
};

export default useTodos;
