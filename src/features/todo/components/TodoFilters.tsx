import React from 'react';
import Button from '../../../components/Button';

interface TodoFiltersProps {
  current: 'all' | 'active' | 'completed';
  onChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ current, onChange }) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onChange('all')}
        disabled={current === 'all'}
        variant={current === 'all' ? 'primary' : 'secondary'}
      >
        Todos
      </Button>
      <Button
        onClick={() => onChange('active')}
        disabled={current === 'active'}
        variant={current === 'active' ? 'primary' : 'secondary'}
      >
        Activos
      </Button>
      <Button
        onClick={() => onChange('completed')}
        disabled={current === 'completed'}
        variant={current === 'completed' ? 'primary' : 'secondary'}
      >
        Completados
      </Button>
    </div>
  );
};

export default TodoFilters;
