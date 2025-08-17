import { useState } from 'react';

import { text } from '../constants';
import { useForum } from '../context/ForumContext';

const AddPostForm = ({ userId }: { userId: number }) => {
  const { addPost } = useForum();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!title || !body) return;
    addPost({ userId, title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={text.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 w-full border p-2"
      />
      <textarea
        placeholder={text.body}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mb-2 w-full border p-2"
      />
      <button onClick={handleSubmit} className="rounded bg-blue-500 px-4 py-2 text-white">
        {text.post}
      </button>
    </div>
  );
};

export default AddPostForm;
