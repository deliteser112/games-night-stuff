import React, { useState, useEffect } from 'react';

// import queries
import { useQuery, useMutation } from '@apollo/react-hooks';
// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// sections
import GameList from './GameList';

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

export default function ItchList() {
  const [addGameToWishlist] = useMutation(addGameToWishlistMutation);
  const [removeGameFromWishlist] = useMutation(removeGameFromWishlistMutation);

  const [addGameToItchlist] = useMutation(addGameToItchlistMutation);
  const [removeGameFromItchlist] = useMutation(removeGameFromItchlistMutation);

  const [addGameToOwnlist] = useMutation(addGameToOwnlistMutation);
  const [removeGameFromOwnlist] = useMutation(removeGameFromOwnlistMutation);

  const [games, setGames] = useState([]);
  const [userName, setUserName] = useState('');

  const { loading, data } = useQuery(gamesQuery);
  const tmpGames = (data && data.games) || [];

  const userData = useQuery(userQuery).data;
  const tmpUser = userData && userData.user;

  useEffect(() => {
    if (tmpUser && tmpGames.length > 0) {
      const tmpName = tmpUser.name.first || '';
      setUserName(tmpName);
      const { itchlist } = tmpUser;
      if (itchlist && itchlist.length > 0) {
        const gameList = itchlist.map((gameId) => {
          return tmpGames.find(({ _id }) => gameId === _id);
        })
        setGames(gameList);
      }
    }
  }, [tmpUser, tmpGames]);

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

  return (
    <Page title="ItchList">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`Total games in ${userName}'s itchlist: ${games.length}`}
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'ItchList' }]}
        />

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
