import { Link } from 'react-router-dom';

import { text, Role } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Post } from '../types';

interface Props {
  post: Post;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onDelete?: (id: number) => void;
  onFavorite: (id: number) => void;
  onUp?: () => void;
  onDown?: () => void;
}

const PostCard = ({ post, onLike, onDislike, onFavorite, onDelete, onUp, onDown }: Props) => {
  const { user } = useAuth();
  const isAdmin = user?.role === Role.admin;
  const isEditable = isAdmin || user?.id === post.userId;

  return (
    <div className="mb-4 rounded border p-4 shadow">
      <Link to={`/post/${post.id}`}>
        <h2 className="mb-2 text-xl">{post.title}</h2>
      </Link>
      <p className="mb-2 text-sm">{post.body}</p>
      <p className="mb-2 text-sm">
        {post.comments?.length} {text.comments.toLowerCase()}
      </p>
      <div className="flex justify-between">
        <div className="mt-2 flex justify-end gap-2">
          {onLike && <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>}
          {onDislike && <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>}
          <button onClick={() => onFavorite(post.id)}>{post.favorite ? '★' : '☆'}</button>
          {onDelete && isEditable && <button onClick={() => onDelete(post.id)}>🗑️</button>}
        </div>
        {isAdmin && (
          <div className="flex items-center gap-4">
            {onUp && (
              <button onClick={onUp} className="w-fit rounded bg-blue-500 px-2 py-1 text-white">
                {text.up}
              </button>
            )}
            {onDown && (
              <button onClick={onDown} className="w-fit rounded bg-blue-500 px-2 py-1 text-white">
                {text.down}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
