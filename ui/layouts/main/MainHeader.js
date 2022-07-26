import React from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography, Stack } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import AccountPopover from '../dashboard/AccountPopover';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import { desktopMenuConfig, mobileMenuConfig } from './MenuConfig';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

const LoginButtonStyle = styled(Button)({
  // background: 'linear-gradient(90deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)',
  border: '1px solid white',
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgb(0 0 0 / 30%)',
  color: 'white',
  height: 38,
  padding: '0 30px'
});

const RegisterButtonStyle = styled(Button)({
  background: 'linear-gradient(90deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgb(0 0 0 / 30%)',
  color: 'white',
  height: 38,
  padding: '0 30px'
});
// ----------------------------------------------------------------------
export default function MainHeader() {
  const { user } = useAuth();
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 }
          })
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Logo />

          <Typography
            variant="subtitle1"
            sx={{
              ml: 1
            }}
          >
            GamesNight
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && user && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={desktopMenuConfig} />}
          {isDesktop && (
            <>
              {user ? (
                <AccountPopover />
              ) : (
                <Stack direction="row" spacing={2}>
                  <LoginButtonStyle variant="outlined" size="small" rel="noopener" href={PATH_AUTH.login}>
                    Sign In
                  </LoginButtonStyle>
                  <RegisterButtonStyle variant="contained" size="small" rel="noopener" href={PATH_AUTH.register}>
                    Sign Up
                  </RegisterButtonStyle>
                </Stack>
              )}
            </>
          )}
          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={mobileMenuConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
