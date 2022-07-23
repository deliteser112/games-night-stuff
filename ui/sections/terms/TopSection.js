import React from 'react';
import PropTypes from 'prop-types';
// icons
// @mui
import { Box, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// components
import Image from '../../components/Image';

// ----------------------------------------------------------------------
const RootStyle = styled(Box)(({
  position: 'relative',
  marginTop: 88
}))

const TitleStyle = styled(Box)(({
  position: 'absolute',
  top: '40%',
  left: '10%',
  transform: 'translate(0, -50%)',
  zIndex: 1,
  color: 'white'
}))

TopSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export default function TopSection({ title, subtitle, description }) {
  const theme = useTheme();
  return (
    <RootStyle>
      <TitleStyle>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h6" color="text.secondary">{description}</Typography>
      </TitleStyle>
      <Image alt={title} sx={{ width: '100%', [theme.breakpoints.down('sm')]: { height: '200px' }, marginBottom: 5 }} src="/assets/terms-back.jpg" />
    </RootStyle>
  );
}
