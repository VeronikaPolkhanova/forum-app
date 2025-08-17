export enum Role {
  admin = 'ADMIN',
  user = 'USER',
}

export enum Direction {
  up = 'UP',
  down = 'DOWN',
}

export const text = {
  all: 'All users',
  posts: 'Posts',
  comments: 'Comments',
  not_found: 'Post not found',
  post: 'Post',
  write_comment: 'Write comment',
  welcome: 'Welcome',
  logout: 'Logout',
  password: 'Password',
  name: 'Name',
  favorites: 'Favorites',
  no_posts: 'No posts',
  wrong_data: 'Wrong data',
  edit: 'Edit profile',
  up: 'Up',
  down: 'Down',
  profile: 'Edit profile',
  save: 'Save',
  login: 'Login',
  saved: 'Saved',
  email: 'Email',
  users: 'Users',
  cancel: 'Cancel',
};

export const registeredUsers = [
  { id: 0, email: 'admin@example.com', name: 'admin', role: Role.admin, password: '123' },
  { id: 1, email: 'Sincere@april.biz', name: 'Leanne Graham', role: Role.user, password: '123' },
];
