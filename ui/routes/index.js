import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';

// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// main pages
import HomePage from '../pages/external_pages/Home';
import ContactPage from '../pages/external_pages/Contact';
import TermsOfService from '../pages/other/TermsOfService';
import PrivacyPolicy from '../pages/other/PrivacyPolicy';

// others
import GeneralApp from '../pages/dashboard/GeneralApp';
import Page404 from '../pages/other/Page404';

// games
import Games from '../pages/dashboard/games';
import GameDetails from '../pages/dashboard/games/GameDetails';

// itchlist
import ItchList from '../pages/dashboard/itchlist';

// wishlist
import WishList from '../pages/dashboard/wishlist';

// ownlist
import OwnList from '../pages/dashboard/ownlist';

// loanedlist
import LoanedTo from '../pages/dashboard/loanedTo';

// borrowedlist
import BorrowedFrom from '../pages/dashboard/borrowedFrom';

// users
import User from '../pages/dashboard/user';
import UserProfile from '../pages/dashboard/user-profile';

// user settings
import UserSettings from '../pages/dashboard/userSettings';

import Profile from '../pages/profile';

// authentications
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import ResetPassword from '../pages/authentication/ResetPassword';
import NewPassword from '../pages/authentication/NewPassword';
import VerifyEmail from '../pages/authentication/VerifyEmail';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/analytics" /> },
        { path: 'profile/:userId', element: <Profile /> },
        { path: 'analytics', element: <GeneralApp /> },

        // games
        { path: 'games', element: <Games /> },
        { path: 'games/:gameId', element: <GameDetails /> },

        // itchlist
        { path: 'itchlist', element: <ItchList /> },

        // wishlist
        { path: 'wishlist', element: <WishList /> },

        // ownlist
        { path: 'ownlist', element: <OwnList /> },

        // loanedTo
        { path: 'lending/loaned-to', element: <LoanedTo /> },

         // borrowedFrom
         { path: 'lending/borrowed-from', element: <BorrowedFrom /> },
        
        // Admin/users
        {
          path: 'users',
          element: (
            <RoleBasedGuard>
              <User />
            </RoleBasedGuard>
          )
        },
        {
          path: 'users/:userId/edit',
          element: (
            <RoleBasedGuard>
              <UserProfile />
            </RoleBasedGuard>
          )
        },

        // Admin/user-settings
        {
          path: 'user-settings',
          element: (
            <RoleBasedGuard>
              <UserSettings />
            </RoleBasedGuard>
          )
        }
      ]
    },
    {
      path: 'auth',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> }
      ]
    },
    { path: '/verify-email/:token', element: <VerifyEmail /> },
    { path: '/reset-password/:token', element: <NewPassword /> },

    // Main RoutesResetPassword
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'contact-us', element: <ContactPage /> },
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'privacy', element: <PrivacyPolicy /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
