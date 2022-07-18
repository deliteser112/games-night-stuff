import React from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';

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
    top: '10%',
    left: '37%',
    width: 'auto',
    transform: 'translate(-50%, 0)'
  }
}));

// ----------------------------------------------------------------------

export default function FeatureSpotlight() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/bg-feature.png"
            sx={{ display: 'none', [theme.breakpoints.up('md')]: { display: 'block' } }}
          />
          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/mask-feature.png"
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 0,
              display: 'none',
              [theme.breakpoints.up('md')]: { display: 'block' }
            }}
          />

          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/effect-1.png"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'none',
              transform: 'translate(50%, 40%)',
              [theme.breakpoints.up('md')]: { display: 'block' }
            }}
          />
          <TextContainer>
            <Typography variant="h2">Feature Spotlight</Typography>
            <Box m={2} />
            <Typography variant="body1">
              The app already has many functions and features, but we understand how overwhelming it can be when people
              talk incessantly about them. So. To wet your appetite, let's share a feature that is particularly mouth
              watering to us.
            </Typography>
            <Box m={2} />
            <Typography variant="body1">
              As a user, I want my games to have their own history so that I can re-live the experiences that make my
              games great. As a user, I want my games to have their own history so that I can re-live the experiences
              that make my games great.
            </Typography>
          </TextContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
