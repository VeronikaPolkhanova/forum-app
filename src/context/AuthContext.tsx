import { createContext, useState, useContext, ReactNode } from 'react';

import { registeredUsers, text } from '../constants';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, password: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, password: string) => {
    const user = registeredUsers.find((u) => u.name === name);
    if (user && user.password === password) {
      setUser({ id: user.id, name, role: user.role, email: user.email });
    } else {
      alert(text.wrong_data);
    }
  };

  const logout = () => setUser(null);

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('Error');
  return userContext;
};
