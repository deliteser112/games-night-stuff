import React, { useState, useEffect } from 'react';

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

// sections
import GameList from './GameList';
import GameAnalytic from './GameAnalytic';

// queries
import { games as gamesQuery } from '../../../_queries/Games.gql';
import { user as userQuery } from '../../../_queries/Users.gql';

// mutations
import {
  addGameToWishlist as addGameToWishlistMutation,
  addGameToItchlist as addGameToItchlistMutation,
  addGameToOwnlist as addGameToOwnlistMutation,
  removeGameFromWishlist as removeGameFromWishlistMutation,
  removeGameFromItchlist as removeGameFromItchlistMutation,
  removeGameFromOwnlist as removeGameFromOwnlistMutation
} from '../../../_mutations/Users.gql';
// ----------------------------------------------------------------------

export default function Games() {
  const [addGameToWishlist] = useMutation(addGameToWishlistMutation);
  const [removeGameFromWishlist] = useMutation(removeGameFromWishlistMutation);

  const [addGameToItchlist] = useMutation(addGameToItchlistMutation);
  const [removeGameFromItchlist] = useMutation(removeGameFromItchlistMutation);

  const [addGameToOwnlist] = useMutation(addGameToOwnlistMutation);
  const [removeGameFromOwnlist] = useMutation(removeGameFromOwnlistMutation);

  const theme = useTheme();

  const [sitchlist, setItchList] = useState([]);
  const [swishlist, setWishList] = useState([]);
  const [sownlist, setOwnList] = useState([]);

  const { loading, data } = useQuery(gamesQuery);
  const games = (data && data.games) || [];

  const userData = useQuery(userQuery).data;
  const tmpUser = userData && userData.user;

  useEffect(() => {
    if (tmpUser) {
      const { itchlist, wishlist, ownlist } = tmpUser;
      setItchList(itchlist || []);
      setWishList(wishlist || []);
      setOwnList(ownlist || []);
    }
  }, [tmpUser]);

  const handleOwnList = (status, _id) => {
    const mutate = status ? addGameToOwnlist : removeGameFromOwnlist;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
  };

  const handleItchList = (status, _id) => {
    const mutate = status ? addGameToItchlist : removeGameFromItchlist;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
  };

  const handleWishList = (status, _id) => {
    const mutate = status ? addGameToWishlist : removeGameFromWishlist;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
  };

  const getPercentByGames = (total, sub) => (sub / total) * 100;

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
                total={games.length}
                percent={100}
                price={1205}
                icon="carbon:cost-total"
                color={theme.palette.info.main}
              />
              <GameAnalytic
                title="Itchlist"
                total={sitchlist.length}
                percent={getPercentByGames(games.length, sitchlist.length)}
                price={222}
                icon="emojione-v1:shooting-star"
                color={theme.palette.primary.main}
              />
              <GameAnalytic
                title="Wishlist"
                total={swishlist.length}
                percent={getPercentByGames(games.length, swishlist.length)}
                price={365}
                icon="emojione:heart-with-ribbon"
                color={theme.palette.error.main}
              />
              <GameAnalytic
                title="Ownlist"
                total={sownlist.length}
                percent={getPercentByGames(games.length, sownlist.length)}
                price={42}
                icon="emojione-v1:thumbs-down"
                color={theme.palette.warning.main}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <GameList
          isLoading={loading}
          gameList={games}
          user={tmpUser}
          onOwnList={(status, _id) => handleOwnList(status, _id)}
          onWishList={(status, _id) => handleWishList(status, _id)}
          onItchList={(status, _id) => handleItchList(status, _id)}
          onDelete={(id) => deleteDocument(id)}
        />
      </Container>
    </Page>
  );
}
