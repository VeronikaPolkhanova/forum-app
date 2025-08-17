import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.name, credentials.password);
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 space-y-3 rounded border p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">{text.login}</h2>

        <input
          type="text"
          name="name"
          placeholder={text.name}
          className="w-full border p-2"
          value={credentials.name}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder={text.password}
          className="w-full border p-2"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="submit" className="w-full rounded bg-blue-500 px-4 py-2 text-white">
          {text.login}
        </button>
      </form>
    </div>
  );
};

export default Login;
