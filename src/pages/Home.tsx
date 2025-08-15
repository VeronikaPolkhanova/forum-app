import { useState } from 'react';

import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import UserSelect from '../components/UserSelect';
import { useForum } from '../context/ForumContext';

const Home = () => {
  const { posts, users, loading, likePost, dislikePost, deletePost, toggleFavorite } = useForum();
  const [filter, setFilter] = useState<number | null>(null);

  if (loading) return <Spinner />;

  const filteredPosts = filter ? posts.filter((p) => p.userId === filter) : posts;

  return (
    <div className="p-6">
      <div className="flex justify-end">
        <UserSelect users={users} value={filter} onChange={setFilter} />
      </div>
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={likePost}
          onDislike={dislikePost}
          onFavorite={toggleFavorite}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
};

export default Home;
