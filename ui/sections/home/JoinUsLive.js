import React from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, IconButton, Container, Typography, Link } from '@mui/material';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const TextContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 'auto',
    transform: 'translate(-100%, -50%)'
  }
}));

const SocialContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  left: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    bottom: 0,
    left: '19%',
    width: 'auto',
    transform: 'translate(0, 50%)'
  }
}));

// ----------------------------------------------------------------------

export default function JoinUsLive() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="Join Us Live"
            src="/static/home/join-us-live.png"
            sx={{ display: 'none', [theme.breakpoints.up('md')]: { display: 'block', marginLeft: 25 } }}
          />
          <TextContainer>
            <Typography variant="h2"> Join Us Live</Typography>
            <Box m={2} />
            <Typography variant="body1">
              We didn't set out to, but have joyfully embraced becoming content creators...
            </Typography>
            <Box m={2} />
            <Typography variant="body1">
              We stream live on Twitch/GamesNightApp every Sunday and Tuesday at 8PM AEDT.
            </Typography>
            <Box m={2} />
            <Typography variant="body1">
              We also have a growing YouTube channel where we create "The Teach", "Board Game Bar", and "We Play"
              videos, so check us out at YouTube/GamesNightApp
            </Typography>
          </TextContainer>
          <SocialContainer>
            <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 2 }}>
              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="error" variant="contained">
                  <Iconify icon={'entypo-social:youtube'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>
              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="success" variant="contained">
                  <Iconify icon={'akar-icons:discord-fill'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>
              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="secondary" variant="contained">
                  <Iconify icon={'akar-icons:facebook-fill'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>

              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="info" variant="contained">
                  <Iconify icon={'el:twitter'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>
              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="warning" variant="contained">
                  <Iconify icon={'teenyicons:instagram-solid'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>

              <Link
                href="https://icon-sets.iconify.design/ic/twotone-support-agent/"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <IconButton aria-label="delete" color="primary" variant="contained">
                  <Iconify icon={'cib:pinterest'} sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Link>
            </Stack>
          </SocialContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
