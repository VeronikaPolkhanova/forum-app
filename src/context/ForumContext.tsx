import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { fetchPosts, fetchUsers } from '../api/posts';
import { Direction, BASE_URL } from '../constants';
import { Post, User, Comment, AddCommentInput } from '../types';

interface ForumContextType {
  posts: Post[];
  users: User[];
  loading: boolean;
  error: string | null;
  addComment: (postId: number, data: AddCommentInput) => void;
  likePost: (postId: number) => void;
  dislikePost: (postId: number) => void;
  toggleFavorite: (postId: number) => void;
  deletePost: (postId: number) => void;
  movePost: (index: number, direction: Direction) => void;
  updateUser: (userId: number, data: Partial<User>) => void;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

let cachedPosts: Post[] | null = null;
let cachedUsers: User[] | null = null;

export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(cachedPosts || []);
  const [users, setUsers] = useState<User[]>(cachedUsers || []);
  const [loading, setLoading] = useState(!cachedPosts);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await fetchUsers();
      const postsData = await fetchPosts();
      const commentsData: Comment[] = await fetch(`${BASE_URL}/comments`).then((res) => res.json());

      const postsWithComments = postsData.map((post) => ({
        ...post,
        comments: commentsData.filter((c) => c.postId === post.id),
        likes: 0,
        dislikes: 0,
        favorite: false,
      }));

      cachedPosts = postsWithComments;
      cachedUsers = usersData;

      setPosts(postsWithComments);
      setUsers(usersData);
      setLoading(false);
    } catch (e) {
      setError('Error');
      setLoading(false);
    }
  };

  const updatePost = (postId: number, updater: (post: Post) => Post) => {
    setPosts((prev) => {
      const updated = prev.map((p) => (p.id === postId ? updater(p) : p));
      cachedPosts = updated;
      return updated;
    });
  };

  const addComment = (postId: number, data: AddCommentInput) => {
    updatePost(postId, (post) => ({
      ...post,
      comments: [...(post.comments || []), { id: Date.now(), postId, ...data }],
    }));
  };

  const likePost = (postId: number) =>
    updatePost(postId, (post) => ({
      ...post,
      likes: post.likes + 1,
    }));

  const dislikePost = (postId: number) =>
    updatePost(postId, (post) => ({
      ...post,
      dislikes: post.dislikes + 1,
    }));

  const toggleFavorite = (postId: number) =>
    updatePost(postId, (post) => ({
      ...post,
      favorite: !post.favorite,
    }));

  const deletePost = (postId: number) => {
    setPosts((prev) => {
      const updated = prev.filter((p) => p.id !== postId);
      cachedPosts = updated;
      return updated;
    });
  };

  const movePost = (index: number, direction: Direction) => {
    setPosts((prev) => {
      const nextIndex = direction === Direction.up ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;
      const arr = [...prev];
      [arr[index], arr[nextIndex]] = [arr[nextIndex], arr[index]];
      cachedPosts = arr;
      return arr;
    });
  };

  const updateUser = (userId: number, data: Partial<User>) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === userId ? { ...u, ...data } : u));
      cachedUsers = updated;
      return updated;
    });
  };

  useEffect(() => {
    if (!cachedPosts || !cachedUsers) {
      loadData();
    }
  }, []);

  return (
    <ForumContext.Provider
      value={{
        posts,
        users,
        loading,
        error,
        addComment,
        likePost,
        dislikePost,
        toggleFavorite,
        deletePost,
        movePost,
        updateUser,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error('Error');
  return context;
};
