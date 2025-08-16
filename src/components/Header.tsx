import { Link } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between bg-blue-500 p-4 text-white">
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          {text.posts}
        </Link>
        <Link to="/favorites" className="hover:underline">
          {text.favorites}
        </Link>
        <Link to="/profile" className="hover:underline">
          {text.edit}
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <p>
          {text.welcome} {user.name}!
        </p>
        <button
          onClick={logout}
          className="rounded border border-white bg-blue-500 px-4 py-1 text-white"
        >
          {text.logout}
        </button>
      </div>
    </header>
  );
};

export default Header;
