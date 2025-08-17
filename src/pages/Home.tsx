import { useState } from 'react';

import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import UserSelect from '../components/UserSelect';
import { Direction } from '../constants';
import { useForum } from '../context/ForumContext';

const Home = () => {
  const { posts, users, loading, likePost, dislikePost, deletePost, toggleFavorite, movePost } =
    useForum();
  const [filter, setFilter] = useState<number | null>(null);

  if (loading) return <Spinner />;

  const filteredPosts = filter ? posts.filter((p) => p.userId === filter) : posts;

  const renderPostCard = (post: (typeof posts)[0], index: number) => {
    const canMoveUp = index > 0 && !filter;
    const canMoveDown = index < posts.length - 1 && !filter;

    return (
      <PostCard
        key={post.id}
        post={post}
        onLike={likePost}
        onDislike={dislikePost}
        onFavorite={toggleFavorite}
        onDelete={deletePost}
        onUp={canMoveUp ? () => movePost(index, Direction.up) : undefined}
        onDown={canMoveDown ? () => movePost(index, Direction.down) : undefined}
      />
    );
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-end">
        <UserSelect users={users} value={filter} onChange={setFilter} />
      </div>
      {filteredPosts.map(renderPostCard)}
    </div>
  );
};

export default Home;
