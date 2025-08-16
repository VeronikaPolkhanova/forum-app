import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, password);
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-3 rounded border p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Вход</h2>
        <input
          type="text"
          placeholder={text.name}
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder={text.password}
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full rounded bg-blue-500 px-4 py-2 text-white">
          {text.login}
        </button>
      </form>
    </div>
  );
};

export default Login;
