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

const PostActions = ({
  post,
  isEditable,
  onLike,
  onDislike,
  onFavorite,
  onDelete,
}: {
  post: Post;
  isEditable: boolean;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onFavorite: (id: number) => void;
  onDelete?: (id: number) => void;
}) => (
  <div className="mt-2 flex justify-end gap-2">
    {onLike && <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>}
    {onDislike && <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>}
    <button onClick={() => onFavorite(post.id)}>{post.favorite ? '★' : '☆'}</button>
    {onDelete && isEditable && <button onClick={() => onDelete(post.id)}>🗑️</button>}
  </div>
);

const PostAdminControls = ({ onUp, onDown }: { onUp?: () => void; onDown?: () => void }) => (
  <div className="mt-2 flex items-center gap-4">
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
);

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

      <PostActions
        post={post}
        isEditable={isEditable}
        onLike={onLike}
        onDislike={onDislike}
        onFavorite={onFavorite}
        onDelete={onDelete}
      />

      {isAdmin && <PostAdminControls onUp={onUp} onDown={onDown} />}
    </div>
  );
};

export default PostCard;
