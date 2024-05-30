const routes = {
  HOME: '/',
  AUTH: '/auth',
  GOALS: '/goals',
  CREATE: {
    GOAL: '/create/goal',
    BOOK: '/create/book',
    POMODORO: '/create/pomodoro',
  },
  NEW_USER: '/new-user',
  BOOKS: '/books',
  ME: '/me',
} as const;

export default routes;
