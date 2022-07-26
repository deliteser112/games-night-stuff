import React from 'react';
// routes
import { PATH_PAGE, PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

export const desktopMenuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="eva:book-open-fill" {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  }
];

export const mobileMenuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="eva:book-open-fill" {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },
  {
    title: 'Sign Up',
    icon: <Iconify icon="mdi:account-multiple-plus" {...ICON_SIZE} />,
    path: PATH_AUTH.register,
  },
];