import { useState } from 'react';

import UserModal from '../components/UserModal';
import { text } from '../constants';
import { useForum } from '../context/ForumContext';
import { User } from '../types';

const Users = () => {
  const { users, updateUser } = useForum();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSave = (data: Partial<User>) => {
    if (selectedUser) {
      updateUser(selectedUser.id, data);
    }
  };

  return (
    <div className="p-6">
      <ul className="space-y-4">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between rounded border p-4">
            <div>
              <div>
                {text.name}: {u.name}
              </div>
              <div>
                {text.email}: {u.email}
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(u)}
              className="rounded bg-blue-500 px-3 py-1 text-white"
            >
              {text.edit}
            </button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} onSave={handleSave} />
      )}
    </div>
  );
};

export default Users;
