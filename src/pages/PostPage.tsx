import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchPosts, fetchComments } from '../api/posts';
import { text } from '../constants';
import { Post, Comment } from '../types';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchPosts().then((posts) => setPost(posts.find((p) => p.id === +id) || null));
    fetchComments(+id).then(setComments);
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        postId: post!.id,
        body: newComment,
        name: 'You',
        email: 'you@example.com',
      },
    ]);
    setNewComment('');
  };

  if (!post) return <div className="p-6">{text.not_found}</div>;

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">{post.title}</h1>
      <p className="mb-4 ">{post.body}</p>
      <h2 className="mb-2">{text.comments}:</h2>
      {comments.map((c) => (
        <div key={c.id} className="mb-2">
          <strong>{c.email}: </strong>
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
        <button
          className="w-fit rounded bg-blue-500 px-2 py-1 text-white"
          onClick={handleAddComment}
        >
          {text.post}
        </button>
      </div>
    </div>
  );
};

export default PostPage;
