import { useState } from 'react';

import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import UserSelect from '../components/UserSelect';
import { Direction } from '../constants';
import { useForum } from '../context/ForumContext';

const Home = () => {
  const { posts, users, loading, movePost } = useForum();
  const [filter, setFilter] = useState<number | null>(null);

  if (loading) return <Spinner />;

  const filteredPosts = filter ? posts.filter((p) => p.userId === filter) : posts;

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-end">
        <UserSelect users={users} value={filter} onChange={setFilter} />
      </div>

      {filteredPosts.map((post, index) => {
        const canMoveUp = index > 0 && !filter;
        const canMoveDown = index < posts.length - 1 && !filter;

        return (
          <PostCard
            key={post.id}
            post={post}
            onUp={canMoveUp ? () => movePost(index, Direction.up) : undefined}
            onDown={canMoveDown ? () => movePost(index, Direction.down) : undefined}
          />
        );
      })}
    </div>
  );
};

export default Home;
