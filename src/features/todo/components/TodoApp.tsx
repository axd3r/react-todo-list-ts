import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types/types';

type Filter = 'all' | 'active' | 'completed';

const getFilteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

const TodoApp: React.FC = () => {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo, setCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div>
      <h1>To-Do List</h1>

      <TodoInput onAdd={addTodo} />

      <TodoFilters current={filter} onChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        setCompleted={setCompleted}
      />
    </div>
  );
};

export default TodoApp;
