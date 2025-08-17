import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { text } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useForum } from '../context/ForumContext';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, addComment } = useForum();
  const { user } = useAuth();

  const [newComment, setNewComment] = useState('');

  const postId = id ? parseInt(id, 10) : null;
  const post = posts.find((p) => p.id === postId);

  const handleAdd = () => {
    if (!post || !newComment.trim()) return;

    addComment(post.id, {
      name: user?.name ?? 'Guest',
      email: user?.email ?? 'Guest',
      body: newComment.trim(),
    });

    setNewComment('');
  };

  if (!post) return <div className="p-6">{text.not_found}</div>;

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">{post.title}</h1>
      <p className="mb-4">{post.body}</p>

      <h2 className="mb-2">{text.comments}:</h2>
      {post.comments?.map((c) => (
        <div key={c.id} className="mb-2">
          <strong>{c.email ?? 'Anonymous'}: </strong>
          {c.body}
        </div>
      ))}

      <div className="mt-4 flex flex-col items-end gap-2">
        <textarea
          className="w-full border p-2"
          placeholder={text.write_comment}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="w-fit rounded bg-blue-500 px-2 py-1 text-white disabled:opacity-50"
          onClick={handleAdd}
          disabled={!newComment.trim()}
        >
          {text.post}
        </button>
      </div>
    </div>
  );
};

export default PostPage;
