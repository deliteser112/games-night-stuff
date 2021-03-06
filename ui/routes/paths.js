// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  termsOfService: '/terms-of-service',
  privacy: '/privacy',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  analytics: path(ROOTS_DASHBOARD, '/analytics'),
  profile: path(ROOTS_DASHBOARD, '/profile'),

  // games
  games: path(ROOTS_DASHBOARD, '/games'),

  // itchlist
  itchlist: path(ROOTS_DASHBOARD, '/itchlist'),

  // wishlist
  wishlist: path(ROOTS_DASHBOARD, '/wishlist'),

  // ownlist
  ownlist: path(ROOTS_DASHBOARD, '/ownlist'),

  // lending
  lending: {
    root: path(ROOTS_DASHBOARD, '/lending'),
    // loaned
    loaned: path(ROOTS_DASHBOARD, '/lending/loaned-to'),
    // borrowed
    borrowed: path(ROOTS_DASHBOARD, '/lending/borrowed-from'),
  },

  // users
  users: path(ROOTS_DASHBOARD, '/users'),

  // userSettings
  userSettings: path(ROOTS_DASHBOARD, '/user-settings'),

  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied')
};
