const routes = {
  HOME: '/',
  AUTH: '/auth',
  GOALS: '/goals',
  CREATE: {
    GOAL: '/create/goal',
    BOOK: '/create/book',
    POMODORO: '/create/pomodoro',
  },
  BOOKS: '/books',
  NEW_USER: '/new-user',
  USER: '/u/:id',
  CURRENT_USER: '/u',
} as const;

export default routes;
