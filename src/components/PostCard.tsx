import { Link } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useForum } from '../context/ForumContext';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onUp?: () => void;
  onDown?: () => void;
}

const PostCard = ({ post, onUp, onDown }: PostCardProps) => {
  const { likePost, dislikePost, toggleFavorite, deletePost } = useForum();
  const { user, isAdmin } = useAuth();

  const showDelete = post.userId === user?.id || isAdmin;

  return (
    <div className="mb-4 rounded border p-4 shadow">
      <Link to={`/post/${post.id}`}>
        <h2 className="mb-2 text-xl">{post.title}</h2>
      </Link>
      <p className="mb-2 text-sm">{post.body}</p>
      <p className="mb-2 text-sm">
        {post.comments?.length} {text.comments.toLowerCase()}
      </p>
      <div className="mb-2 flex items-center justify-end gap-2">
        <button onClick={() => likePost(post.id, user?.id ?? -1)}>👍 {post.likes}</button>
        <button onClick={() => dislikePost(post.id, user?.id ?? -1)}>👎 {post.dislikes}</button>
        <button onClick={() => toggleFavorite(post.id)}>{post.favorite ? '★' : '☆'}</button>
        {showDelete && <button onClick={() => deletePost(post.id)}>🗑️</button>}
      </div>
      <div className="flex gap-2">
        {onUp && (
          <button className="w-fit rounded bg-blue-500 px-2 py-1 text-white" onClick={onUp}>
            {text.up}
          </button>
        )}
        {onDown && (
          <button className="w-fit rounded bg-blue-500 px-2 py-1 text-white" onClick={onDown}>
            {text.down}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
