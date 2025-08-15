import { Link } from 'react-router-dom';

import { text } from '../constants';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-blue-500 p-4 text-white">
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          {text.posts}
        </Link>
        <Link to="/favorites" className="hover:underline">
          {text.selected}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
