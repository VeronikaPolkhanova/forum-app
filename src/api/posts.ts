import { Post, User, Comment } from "../types";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data.map((p: any) => ({
    ...p,
    likes: 0,
    dislikes: 0,
    favorite: false,
    comments: [],
  }));
};

export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return res.json();
};
