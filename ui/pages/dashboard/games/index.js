import sumBy from 'lodash/sumBy';

import React from 'react';
import ReactLoading from 'react-loading';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

// import queries
import { useQuery, useMutation } from '@apollo/react-hooks';
// @mui
import { Divider, Container, Stack, Card } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import Scrollbar from '../../../components/Scrollbar';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';

// sections
import GameList from './GameList';
import GameAnalytic from './GameAnalytic';

// queries & mutations
import { games as gamesQuery } from '../../../_queries/Games.gql';
// ----------------------------------------------------------------------

export default function Games() {
  const theme = useTheme();

  const { loading, data } = useQuery(gamesQuery);
  const games = (data && data.games) || [];

  // console.log(games);

  return (
    <Page title="Games">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Game List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Game List' }]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <GameAnalytic
                title="Total"
                total={20}
                percent={100}
                price={1205.75}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <GameAnalytic
                title="Itchlist"
                total={4}
                percent={20}
                price={222.02}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <GameAnalytic
                title="Wishlist"
                total={6}
                percent={33}
                price={365.54}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <GameAnalytic
                title="Ownlist"
                total={6}
                percent={33}
                price={42.2}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <GameList isLoading={loading} gameList={games} onDelete={(id) => deleteDocument(id)} />
      </Container>
    </Page>
  );
}
