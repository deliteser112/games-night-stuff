import React from 'react';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    height: '100vh'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 800,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  height: '100%',
  justifyContent: 'center'
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const ButtonStyle = styled(Button)({
  background: 'linear-gradient(90deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgb(0 0 0 / 30%)',
  color: 'white',
  height: 48,
  padding: '0 30px'
});

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <Box>
      <RootStyle>
        <HeroOverlayStyle alt="overlay" src="/static/home/bg-hero.png" variants={varFade().in} />
        <Container sx={{ height: '100vh' }}>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: 'common.white', fontWeight: 900, letterSpacing: 3.2 }}>
                Welcome, to the <br />
                <Typography
                  component="span"
                  variant="h1"
                  sx={{
                    color: 'primary.main',
                    backgroundImage:
                      'linear-gradient(270.97deg,#ffe580 -21.36%,#ff7571 -2.45%,#ea5dad 26.84%,#c2a0fd 64.15%,#3bf0e4 108.29%,#b2f4b6 159.03%)',
                    '-webkitTextFillColor': 'transparent',
                    '-webkitBackgroundClip': 'text'
                  }}
                >
                  GamesNight
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: 'common.white', letterSpacing: 1.1 }}>
                It keeps a record of all the games in your growing collection. Tracks who you have lent them to.
                Connects you with the people and the games you are itching to play. It even helps you choose your next
                game. All this, from any device you like.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <ButtonStyle
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                endIcon={<Iconify icon="bi:box-arrow-in-up-right" width={20} height={20} />}
              >
                Join Now
              </ButtonStyle>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      {/* <Box sx={{ height: { md: '100vh' } }} /> */}
    </Box>
  );
}
