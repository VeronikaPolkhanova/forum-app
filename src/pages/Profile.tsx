import { useState } from 'react';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser(formData);
    alert(text.saved);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-4 text-2xl font-bold">{text.profile}</h1>
      <div className="flex max-w-md flex-col gap-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2"
          placeholder={text.name}
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2"
          placeholder={text.email}
        />
        <button onClick={handleSave} className="rounded bg-blue-500 py-2 text-white">
          {text.save}
        </button>
      </div>
    </div>
  );
};

export default Profile;
