import React from 'react';
// component
import Iconify from '../../components/Iconify';

import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    subheader: 'DASHBOARD',
    items: [
      {
        title: 'dashboard',
        path: `${PATH_DASHBOARD.analytics}`,
        icon: getIcon('logos:google-analytics'),
      },
      // {
      //   title: 'documents',
      //   path: `${PATH_DASHBOARD.documents}`,
      //   icon: getIcon('gala:file-doc'),
      // },
      {
        title: 'games',
        path: `${PATH_DASHBOARD.games}`,
        icon: getIcon('emojione-v1:video-game'),
      },
      {
        title: 'my itchlist',
        path: `${PATH_DASHBOARD.itchlist}`,
        icon: getIcon('emojione:heart-with-ribbon'),
      },
      {
        title: 'my wishlist',
        path: `${PATH_DASHBOARD.wishlist}`,
        icon: getIcon('emojione-v1:shooting-star'),
      },
      {
        title: 'my ownlist',
        path: `${PATH_DASHBOARD.ownlist}`,
        icon: getIcon('emojione-v1:thumbs-down'),
      },
      {
        title: 'lending',
        path: PATH_DASHBOARD.lending.root,
        icon: getIcon('noto:shopping-cart'),
        children: [
          { title: 'Loaned', path: PATH_DASHBOARD.lending.loaned },
          { title: 'Borrowed', path: PATH_DASHBOARD.lending.borrowed }
        ],
      },
    ],
  },
  {
    subheader: 'Admin',
    items: [
      {
        title: 'user',
        path: `${PATH_DASHBOARD.users}`,
        icon: getIcon('gis:globe-users'),
      },
      {
        title: 'user settings',
        path: `${PATH_DASHBOARD.userSettings}`,
        icon: getIcon('fluent:people-settings-28-regular'),
      },
    ],
  },
];

export default navConfig;
