import React, { useState } from 'react';
import imgTodo from '../../assets/todo_image.jpeg';

interface Props {
  onLogin: (name: string, nickname: string) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && nickname.trim()) {
      onLogin(name.trim(), nickname.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 relative">
      <img
        src={imgTodo}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6 z-10 relative">

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
