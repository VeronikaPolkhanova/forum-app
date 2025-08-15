export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  favorite: boolean;
  comments?: Comment[];
}

export type Role = {
  role: 'USER' | 'ADMIN';
};
