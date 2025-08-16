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
  const post = postId !== null ? posts.find((p) => p.id === postId) : undefined;

  const handleAdd = () => {
    if (!post) return;
    addComment(post.id, {
      email: user?.email ?? 'Guest',
      body: newComment,
      name: user?.name ?? 'Guest',
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
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={text.write_comment}
        />
        <button className="w-fit rounded bg-blue-500 px-2 py-1 text-white" onClick={handleAdd}>
          {text.post}
        </button>
      </div>
    </div>
  );
};

export default PostPage;
