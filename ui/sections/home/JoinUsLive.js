import React from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Link } from '@mui/material';
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
  overflow: 'auto',
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    bottom: 0,
    left: '19%',
    width: 'auto',
    transform: 'translate(0, 50%)',
    width: '100%',
  }
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  zIndex: 1,
  color: '#fff',
  width: 70,
  height: 70,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  // backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
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
          <Box m={2} />
          <SocialContainer>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Link href="https://www.twitch.tv/gamesnightapp" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'teenyicons:twitch-outline'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC-WzWJBeHq81DdJkgbFzCiw"
                target="_blank"
                rel="noopener"
                variant="body2"
              >
                <ColorlibStepIconRoot>
                  <Iconify icon={'entypo-social:youtube'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>
              <Link href="https://discord.gg/6fsc8KMZVD" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'akar-icons:discord-fill'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>
              <Link href="https://www.facebook.com/GamesNightApp" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'akar-icons:facebook-fill'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>

              <Link href="https://twitter.com/GamesNight8" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'el:twitter'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>
              <Link href="https://instagram.com/gamesnightapp/" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'teenyicons:instagram-solid'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>

              <Link href="https://www.pinterest.com.au/gamesnightapp/" target="_blank" rel="noopener" variant="body2">
                <ColorlibStepIconRoot>
                  <Iconify icon={'cib:pinterest'} sx={{ width: 30, height: 30 }} />
                </ColorlibStepIconRoot>
              </Link>
            </Stack>
          </SocialContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
