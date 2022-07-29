import React, { useState, useEffect } from 'react';

// import queries
import { useQuery } from '@apollo/react-hooks';
// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// sections
import BorrowedList from './BorrowedList';

// queries
import { findGamesByIds as findGamesByIdsQuery } from '../../../_queries/Games.gql';
import { user as userQuery, users as usersQuery } from '../../../_queries/Users.gql';

// ----------------------------------------------------------------------

export default function LoanedTo() {

  const [gameIds, setGameIds] = useState([]);
  const [games, setGames] = useState([]);

  const gamesData = useQuery(findGamesByIdsQuery, { variables: { _ids: gameIds } }).data;
  const tmpGames = (gamesData && gamesData.findGamesByIds) || [];

  const { loading, data } = useQuery(userQuery);
  const tmpUser = data && data.user;

  const usersData = useQuery(usersQuery).data;
  const tmpUsers = (usersData && usersData.users && usersData.users.users) || [];

  useEffect(() => {
    if (tmpUser) {
      const { borrowedFrom } = tmpUser;
      if (borrowedFrom && borrowedFrom.length > 0) {
        const ids = [];
        borrowedFrom.map(({ _id }) => ids.push(_id));
        setGameIds(ids);
      }
    }
  }, [loading, tmpUser]);
  useEffect(() => {
      if (tmpUser && tmpGames.length > 0 && tmpUsers.length > 0) {
      const { borrowedFrom } = tmpUser;

      if (borrowedFrom && borrowedFrom.length > 0) {
        const gameList = borrowedFrom.map((game) => {
          const gameInfo = tmpGames.find(({ _id }) => game._id === _id);
          const userInfo = tmpUsers.find(({ _id }) => game.userId === _id);
          const { name, _id } = userInfo;
          return { ...gameInfo, name, userId: _id };
        });
        setGames(gameList);
      }
    }
  }, [tmpUser, tmpGames, tmpUsers]);

  return (
    <Page title="BorrowedFrom">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Borrowed List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'BorrowedFrom' }]}
        />
        <BorrowedList isLoading={loading} gameList={games} />
      </Container>
    </Page>
  );
}
