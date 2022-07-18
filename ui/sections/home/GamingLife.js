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
    top: '50%',
    left: '37%',
    width: 'auto',
    transform: 'translate(-50%, -50%)'
  }
}));

// ----------------------------------------------------------------------

export default function GamingLife() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Container>
        <Box sx={{ position: 'relative' }}>
          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/bg-warrier.png"
            sx={{ display: 'none', [theme.breakpoints.up('md')]: { display: 'block' } }}
          />
          <Image
            disabledEffect
            alt="Gaming Life"
            src="/static/home/warrier.png"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              display: 'none',
              [theme.breakpoints.up('md')]: { display: 'block' }
            }}
          />
          <TextContainer>
            <Typography variant="h2">Take control of your gaming life!</Typography>
            <Box m={2} />
            <Typography variant="body1">
              The GamesNight Team are a group of board game lovers that were sick of trying to use excel, google sheets
              or other basic online lists to keep track of their growing game collections. We are building a community
              of board game enthusiasts to help shape the direction we take our creation, building upon the current
              feature set to deliver new features that you want to see.
            </Typography>
            <Box m={2} />
            <Typography variant="body1">
              With the current list functions at the core, to blow excel and sheets out of the water, we have been built
              social features that enable you to see your friends lists, lending features to track when you lend out
              games, who you have leant out games to and even "ranking" your friends so you don't lend out your precious
              games to forgetful Franks. And so much more to come.
            </Typography>
          </TextContainer>
        </Box>
      </Container>
    </RootStyle>
  );
}
