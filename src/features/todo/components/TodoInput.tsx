import React, { useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        placeholder="Nueva tarea"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button type="submit">Agregar</Button>
    </form>
  );
};

export default TodoInput;
