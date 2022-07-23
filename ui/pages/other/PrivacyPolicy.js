import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Link, Box } from '@mui/material';
// components
import Page from '../../components/Page';

// components
import TopSection from '../../sections/terms/TopSection';

// ----------------------------------------------------------------------

export default function Privacy() {
  return (
    <Page title="Privacy">
      <TopSection title="Privacy Policy" subtitle="Introduction" description="Last updated May 29th, 2017" />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ my: 2 }}>
          Your privacy is important to us.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          It is GamesNight's policy to respect your privacy regarding any information we may collect while operating our
          website. Accordingly, we have developed this privacy policy in order for you to understand how we collect,
          use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy
          below.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or
          consent of the individual concerned.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          Before or at the time of collecting personal information, we will identify the purposes for which information
          is being collected.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We will collect and use personal information solely for fulfilling those purposes specified by us and for
          other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for
          those purposes, should be accurate, complete, and up-to-date.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We will protect personal information by using reasonable security safeguards against loss or theft, as well as
          unauthorized access, disclosure, copying, use or modification.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We will make readily available to customers information about our policies and practices relating to the
          management of personal information.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We will only retain personal information for as long as necessary for the fulfillment of those purposes.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100, my: 1, textIndent: 20 }}>
          We are committed to conducting our business in accordance with these principles in order to ensure that the
          confidentiality of personal information is protected and maintained. GamesNight may change this privacy policy
          from time to time at GamesNight's sole discretion.
        </Typography>

        <Box sx={{ mb: 15 }} />
      </Container>
    </Page>
  );
}
