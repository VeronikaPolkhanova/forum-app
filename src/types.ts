import { Role } from './constants';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
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
  likedBy: number[];
  dislikedBy: number[];
}

export interface AddCommentInput {
  email: string;
  body: string;
  name: string;
}

export interface AddPostInput {
  userId: number;
  title: string;
  body: string;
}
