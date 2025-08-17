import { Link } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAdmin, logout } = useAuth();
  if (!user) return null;

  const links = [
    { to: '/', label: text.posts },
    { to: '/favorites', label: text.favorites },
    { to: '/profile', label: text.edit },
  ];

  if (isAdmin) {
    links.push({ to: '/users', label: text.users });
  }

  return (
    <header className="flex items-center justify-between bg-blue-500 p-4 text-white">
      <nav className="flex gap-4">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <span>
          {text.welcome} {user.name}!
        </span>
        <button onClick={logout} className="rounded border px-3 py-1">
          {text.logout}
        </button>
      </div>
    </header>
  );
};

export default Header;
