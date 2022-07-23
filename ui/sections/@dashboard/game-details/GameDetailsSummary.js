import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, IconButton, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import SocialsButton from '../../../components/SocialsButton';

// sections
import GameRatingModal from './GameRatingModal';
import GameLendModal from './GameLendModal';

// queries
import { user as userQuery } from '../../../_queries/Users.gql';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

GameDetailsSummary.propTypes = {
  game: PropTypes.object,
  owned: PropTypes.bool,
  gameId: PropTypes.string,
  gamePlayCount: PropTypes.number,
  updateGamePlayCount: PropTypes.func
};

export default function GameDetailsSummary({ game, owned, gameId, gamePlayCount, updateGamePlayCount }) {
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [lendModalOpen, setLendModalOpen] = useState(false);

  const handlePlayedSetting = () => {
    const mutate = updateGamePlayCount;

    mutate({
      variables: {
        _id: game._id
      },
      refetchQueries: [{ query: userQuery }]
    });
    setRatingModalOpen(true);
  };
  return (
    <RootStyle>
      <GameLendModal
        isOpen={lendModalOpen}
        gameId={gameId}
        onCloseDialog={() => setLendModalOpen(false)}
      />
      <GameRatingModal
        isOpen={ratingModalOpen}
        gameId={gameId}
        gamePlayCount={gamePlayCount}
        onCloseDialog={() => setRatingModalOpen(false)}
      />
      <Typography
        variant="overline"
        sx={{
          mt: 2,
          mb: 1,
          display: 'block',
          color: status === 'sale' ? 'error.main' : 'info.main'
        }}
      >
        Your Play Count: {gamePlayCount}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

      <Typography variant="h5" paragraph>
        {game.title}
      </Typography>

      {owned && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          You owned this game
        </Typography>
      )}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2.5 }}>
        <Typography variant="body2">Number of players</Typography>

        <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
          {game.minPlayers} ~ {game.maxPlayers} people
        </Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Playing Time
        </Typography>

        <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
          {game.minPlaytime} ~ {game.maxPlaytime} minutes
        </Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Year Published
        </Typography>

        <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
          {game.yearPublished}
        </Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          For Ages
        </Typography>

        <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
          {game.age} and up
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        <Button
          fullWidth
          size="large"
          color="warning"
          variant="contained"
          startIcon={<Iconify icon={'ic:outline-done-all'} />}
          onClick={handlePlayedSetting}
          sx={{ whiteSpace: 'nowrap' }}
        >
          I just played
        </Button>

        <Button
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          startIcon={<Iconify icon={'fluent:star-line-horizontal-3-20-regular'} />}
          onClick={() => setRatingModalOpen(true)}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Rate game
        </Button>
      </Stack>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <SocialsButton initialColor />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Button
        disabled={!owned}
        fullWidth
        size="large"
        color="secondary"
        variant="contained"
        startIcon={<Iconify icon={'carbon:share-knowledge'} />}
        onClick={() => setLendModalOpen(true)}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Lend this game
      </Button>
    </RootStyle>
  );
}
