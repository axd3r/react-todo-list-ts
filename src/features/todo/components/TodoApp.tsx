import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types/types';
import imgTodo from '../../../assets/todo_image.jpeg';
import Button from '../../../components/Button';

type Filter = 'all' | 'active' | 'completed';

interface TodoAppProps {
  name: string;
  nickname: string;
}

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

const TodoApp: React.FC<TodoAppProps> = ({ name, nickname }) => {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo, setCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 relative">
      <img
        src={imgTodo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6 z-10 relative">
        <h1 className="text-3xl font-bold text-center text-gray-800">To-Do List</h1>
        <Button
          onClick={() => {
            localStorage.removeItem('todoUser');
            window.location.reload();
          }}
          className="absolute top-4 right-4 text-sm"
          variant="danger"
        >
          Cerrar sesión
        </Button>

        <div className="text-center text-gray-600">
          <p>Bienvenido, <strong>{name}</strong> ({nickname})</p>
          <p>Tareas creadas: <strong>{todos.length}</strong></p>
        </div>

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
    </div>
  );
};

export default TodoApp;
