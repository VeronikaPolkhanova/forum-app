import { createContext, useState, useContext, ReactNode } from 'react';

import { registeredUsers, text, Role } from '../constants';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (name: string, password: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user?.role === Role.admin;

  const login = (name: string, password: string) => {
    const foundUser = registeredUsers.find((u) => u.name === name && u.password === password);
    if (!foundUser) return alert(text.wrong_data);
    setUser({
      id: foundUser.id,
      name: foundUser.name,
      role: foundUser.role,
      email: foundUser.email,
    });
  };

  const logout = () => setUser(null);
  const updateUser = (data: Partial<Omit<User, 'id'>>) => user && setUser({ ...user, ...data });

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const userContext = useContext(AuthContext);
  if (!userContext) throw new Error('Error');
  return userContext;
};
