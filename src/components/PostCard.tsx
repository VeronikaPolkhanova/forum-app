import { Link } from 'react-router-dom';

import { text } from '../constants';
import { Post } from '../types';

interface Props {
  post: Post;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onLike, onDislike, onFavorite, onDelete }: Props) => {
  return (
    <div className="mb-4 rounded border p-4 shadow">
      <Link to={`/post/${post.id}`}>
        <h2 className="mb-2 text-xl">{post.title}</h2>
      </Link>
      <p className="mb-2 text-sm">{post.body}</p>
      <p className="mb-2 text-sm">
        {post.comments?.length} {text.comments.toLowerCase()}
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>
        <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>
        <button onClick={() => onFavorite(post.id)}>{post.favorite ? '★' : '☆'}</button>
        <button onClick={() => onDelete(post.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default PostCard;
