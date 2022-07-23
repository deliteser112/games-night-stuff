import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Typography, Link, Box } from '@mui/material';
// components
import Page from '../../components/Page';

// components
import TopSection from '../../sections/terms/TopSection';

// ----------------------------------------------------------------------

export default function TermsOfService() {
  return (
    <Page title="Terms">
      <TopSection title="Terms of Service" subtitle="Introduction" description="Last updated May 29th, 2017" />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ my: 2 }}>
          Terms
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          By accessing the website at &nbsp;
          <Link component={RouterLink} to="https://app.gamesnight.fun/" underline="always" color="text.primary">
            https://app.gamesnight.fun/
          </Link>
          ,&nbsp; you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree
          that you are responsible for compliance with any applicable local laws. If you do not agree with any of these
          terms, you are prohibited from using or accessing this site. The materials contained in this website are
          protected by applicable copyright and trademark law.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Use License
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          Permission is granted to temporarily download one copy of the materials (information or software) on
          GamesNight's website for personal, non-commercial transitory viewing only. This is the grant of a license, not
          a transfer of title, and under this license you may not: modify or copy the materials; use the materials for
          any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or
          reverse engineer any software contained on GamesNight's website; remove any copyright or other proprietary
          notations from the materials; or transfer the materials to another person or "mirror" the materials on any
          other server. This license shall automatically terminate if you violate any of these restrictions and may be
          terminated by GamesNight at any time. Upon terminating your viewing of these materials or upon the termination
          of this license, you must destroy any downloaded materials in your possession whether in electronic or printed
          format.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Disclaimer
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          The materials on GamesNight's website are provided on an 'as is' basis. GamesNight makes no warranties,
          expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
          implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights. Further, GamesNight does not warrant or make any
          representations concerning the accuracy, likely results, or reliability of the use of the materials on its
          website or otherwise relating to such materials or on any sites linked to this site. format.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Limitations
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          In no event shall GamesNight or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on GamesNight's website, even if GamesNight or a GamesNight authorized representative has
          been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow
          limitations on implied warranties, or limitations of liability for consequential or incidental damages, these
          limitations may not apply to you.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Accuracy of materials
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          The materials appearing on GamesNight's website could include technical, typographical, or photographic
          errors. GamesNight does not warrant that any of the materials on its website are accurate, complete or
          current. GamesNight may make changes to the materials contained on its website at any time without notice.
          However GamesNight does not make any commitment to update the materials.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Links
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          GamesNight has not reviewed all of the sites linked to its website and is not responsible for the contents of
          any such linked site. The inclusion of any link does not imply endorsement by GamesNight of the site. Use of
          any such linked website is at the user's own risk.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Modifications
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          GamesNight may revise these terms of service for its website at any time without notice. By using this website
          you are agreeing to be bound by the then current version of these terms of service.
        </Typography>

        <Typography variant="h4" sx={{ my: 2 }}>
          Governing Law
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 100 }}>
          These terms and conditions are governed by and construed in accordance with the laws of Illinois and you
          irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </Typography>

        <Box sx={{ mb: 15 }} />
      </Container>
    </Page>
  );
}
