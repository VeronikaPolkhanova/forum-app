import PostCard from '../components/PostCard';
import { text } from '../constants';
import { useForum } from '../context/ForumContext';

const Favorites = () => {
  const { posts, toggleFavorite } = useForum();
  const favorites = posts.filter((p) => p.favorite);

  return (
    <div className="p-6">
      {favorites.length === 0 ? (
        <p>{text.not_found}</p>
      ) : (
        favorites.map((post) => <PostCard onFavorite={toggleFavorite} key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Favorites;
