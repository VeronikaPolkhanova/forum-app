import { FC, useState } from 'react';

import { text } from '../constants';
import { User } from '../types';

interface Props {
  user: User;
  onClose: () => void;
  onSave: (data: Partial<User>) => void;
}

const UserModal: FC<Props> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">{text.edit}</h2>
        <div className="flex flex-col gap-3">
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
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onClose} className="rounded border px-3 py-1">
              {text.cancel}
            </button>
            <button onClick={handleSave} className="rounded bg-blue-500 px-3 py-1 text-white">
              {text.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
