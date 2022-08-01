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
import { GameList } from '../../../sections/@dashboard/my-list';

// queries
import { findGamesByIds as findGamesByIdsQuery } from '../../../_queries/Games.gql';
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

export default function WishList() {
  const [addGameToWishlist] = useMutation(addGameToWishlistMutation);
  const [removeGameFromWishlist] = useMutation(removeGameFromWishlistMutation);

  const [addGameToItchlist] = useMutation(addGameToItchlistMutation);
  const [removeGameFromItchlist] = useMutation(removeGameFromItchlistMutation);

  const [addGameToOwnlist] = useMutation(addGameToOwnlistMutation);
  const [removeGameFromOwnlist] = useMutation(removeGameFromOwnlistMutation);

  const [gameIds, setGameIds] = useState([]);
  const [games, setGames] = useState([]);
  const [userName, setUserName] = useState('');

  const gamesData = useQuery(findGamesByIdsQuery, { variables: { _ids: gameIds } }).data;

  const { loading, data } = useQuery(userQuery);
  const tmpUser = data && data.user;

  useEffect(() => {
    if (gamesData) {
      const { findGamesByIds } = gamesData;
      setGames(findGamesByIds);
    }
  }, [gamesData]);

  useEffect(() => {
    if (tmpUser) {
      const tmpName = tmpUser.name.first || '';
      setUserName(tmpName);

      const { wishlist } = tmpUser;
      if (wishlist && wishlist.length > 0) {
        const ids = [];
        wishlist.forEach((gameId) => {
          ids.push(gameId);
        });
        setGameIds(ids);
      }
    }
  }, [loading, tmpUser]);

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
    <Page title="WishList">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={`Total games in ${userName}'s wishlist: ${games.length}`}
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'WishList' }]}
        />

        <GameList
          isLoading={loading}
          gameList={games}
          user={tmpUser}
          onOwnList={(status, _id) => handleOwnList(status, _id)}
          onWishList={(status, _id) => handleWishList(status, _id)}
          onItchList={(status, _id) => handleItchList(status, _id)}
        />
      </Container>
    </Page>
  );
}
