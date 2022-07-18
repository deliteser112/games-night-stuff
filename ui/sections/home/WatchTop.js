import React from 'react';
import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, IconButton, Container, Typography } from '@mui/material';
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
    top: '20%',
    left: '50%',
    width: 'auto',
    transform: 'translate(-100%, -50%)'
  }
}));

// ----------------------------------------------------------------------

export default function WatchTop() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="Join Us Live"
            src="/static/home/bg-watch.png"
            sx={{ display: 'none', [theme.breakpoints.up('md')]: { display: 'block', marginLeft: 15 } }}
          />
          <TextContainer>
            <Typography variant="h2"> Watch top pick streams</Typography>
          </TextContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
