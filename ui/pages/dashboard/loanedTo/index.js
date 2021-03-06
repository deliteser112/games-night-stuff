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
import LoanedList from './LoanedList';
import GameReturnModal from './GameReturnModal';

// queries
import { findGamesByIds as findGamesByIdsQuery } from '../../../_queries/Games.gql';
import { user as userQuery, users as usersQuery } from '../../../_queries/Users.gql';

// ----------------------------------------------------------------------

export default function LoanedTo() {
  const [gameIds, setGameIds] = useState([]);
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState('');
  const [userId, setUserId] = useState('');
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const gamesData = useQuery(findGamesByIdsQuery, { variables: { _ids: gameIds } }).data;
  const tmpGames = (gamesData && gamesData.findGamesByIds) || [];

  const { loading, data } = useQuery(userQuery);
  const tmpUser = data && data.user;

  const usersData = useQuery(usersQuery).data;
  const tmpUsers = (usersData && usersData.users && usersData.users.users) || [];

  useEffect(() => {
    if (tmpUser) {
      const { loanedTo } = tmpUser;
      if (loanedTo && loanedTo.length > 0) {
        const ids = [];
        loanedTo.map(({ _id }) => ids.push(_id));
        setGameIds(ids);
      }
    }
  }, [loading, tmpUser]);

  useEffect(() => {
    if (tmpUser && tmpGames.length > 0 && tmpUsers.length > 0) {
      const { loanedTo } = tmpUser;

      if (loanedTo && loanedTo.length > 0) {
        const gameList = loanedTo.map((game) => {
          const gameInfo = tmpGames.find(({ _id }) => game._id === _id);
          const userInfo = tmpUsers.find(({ _id }) => game.userId === _id);

          const { name, _id } = userInfo;
          return { ...gameInfo, name, userId: _id };
        });
        setGames(gameList);
      }
    }
  }, [tmpUser, tmpGames, tmpUsers]);

  const handleShowReturnModal = (uId, _id) => {
    setUserId(uId);
    setGameId(_id);
    setReturnModalOpen(true);
  };

  return (
    <Page title="LoanedTo">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Loaned List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'LoanedTo' }]}
        />
        <GameReturnModal
          isOpen={returnModalOpen}
          gameId={gameId}
          userId={userId}
          onCloseDialog={() => setReturnModalOpen(false)}
        />
        <LoanedList isLoading={loading} gameList={games} onShowReturnModal={handleShowReturnModal} />
      </Container>
    </Page>
  );
}
