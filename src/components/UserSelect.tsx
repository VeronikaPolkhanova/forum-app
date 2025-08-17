import { useState } from 'react';

import { text } from '../constants';
import { User } from '../types';

interface Props {
  users: User[];
  value: number | null;
  onChange: (id: number | null) => void;
}

const UserSelect = ({ users, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const selectedUser = users.find((u) => u.id === value);

  const handleSelect = (id: number | null) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className="relative mb-4 w-64">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-2 text-left shadow-sm hover:border-blue-500"
        onClick={() => setOpen(!open)}
      >
        {selectedUser ? selectedUser.name : text.all}
        <span className="ml-2">&#9662;</span>
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-blue-100"
            onClick={() => handleSelect(null)}
          >
            {text.all}
          </li>
          {users.map((user) => (
            <li
              key={user.id}
              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
              onClick={() => handleSelect(user.id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSelect;
