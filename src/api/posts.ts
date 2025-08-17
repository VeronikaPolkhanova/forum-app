import { BASE_URL } from '../constants';
import { Post, User, Comment } from '../types';

const getJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
};

export const fetchUsers = () => getJson(`${BASE_URL}/users`) as Promise<User[]>;

export const fetchPosts = async (): Promise<Post[]> => {
  const rawPosts = (await getJson(`${BASE_URL}/posts`)) as Post[];
  return rawPosts.map((p) => ({
    ...p,
    likes: 0,
    dislikes: 0,
    favorite: false,
    comments: [] as Comment[],
  }));
};

export const fetchComments = (postId: number) =>
  getJson(`${BASE_URL}/posts/${postId}/comments`) as Promise<Comment[]>;
