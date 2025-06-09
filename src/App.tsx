// src/App.tsx
import React, { useEffect, useState } from 'react';
import LoginForm from './features/auth/LoginForm';
import TodoApp from './features/todo/components/TodoApp';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; nickname: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('todoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (name: string, nickname: string) => {
    const newUser = { name, nickname };
    localStorage.setItem('todoUser', JSON.stringify(newUser));
    setLoading(true);
    setTimeout(() => {
      setUser(newUser);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">Cargando...</div>
      </div>
    );
  }

  return !user ? (
    <LoginForm onLogin={handleLogin} />
  ) : (
    <TodoApp name={user.name} nickname={user.nickname} />
  );
};

export default App;
