import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
// sections
import {
  HomeHero,
  JoinUsLive,
  GamingLife,
  HomePricingPlans,
  FeatureSpotlight,
  WatchTop,
  Community
} from '../../sections/home';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="GamesNight">
      <HomeHero />

      <ContentStyle>
        <JoinUsLive />
        <GamingLife />
        <FeatureSpotlight />
        <WatchTop />
        <HomePricingPlans />
        <Community />
      </ContentStyle>
    </Page>
  );
}
