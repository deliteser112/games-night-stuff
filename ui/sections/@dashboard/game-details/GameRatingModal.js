import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Stack,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

// graphql & collections
import { useQuery, useMutation } from '@apollo/react-hooks';

// import queries
import addRatingMutation from '../../../_mutations/Ratings.gql';
import ratingByUserIdAndGameId from '../../../_queries/Ratings.gql';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function GameRatingModal({ isOpen, gameId, gamePlayCount, onCloseDialog }) {
  const [addRating] = useMutation(addRatingMutation);

  const [open, setOpen] = useState(false);

  const [playedBefore, setPlayedBefore] = useState(null);
  const [playAgain, setPlayAgain] = useState(3);
  const [recomendToFriend, setRecomendToFriend] = useState(3);
  const [buyThisGame, setBuyThisGame] = useState(4);
  const [gamePlayCounts, setGamePlayCounts] = useState(0);

  const { loading, data } = useQuery(ratingByUserIdAndGameId, { variables: { gameId } });

  const previousRating = data && data.ratingByUserIdAndGameId;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let pb;
    if (!previousRating && gamePlayCounts === 0) {
      pb = false;
    } else {
      pb = true;
    }

    setPlayedBefore(pb);
    setPlayAgain(previousRating ? previousRating.playAgain : 3);
    setRecomendToFriend(previousRating ? previousRating.recomendToFriend : 3);
    setBuyThisGame(previousRating ? previousRating.buyThisGame : 4);
    setGamePlayCounts(gamePlayCount);
  }, [previousRating]);

  const handleChangePlayAgain = (event) => {
    setPlayAgain(event.target.value);
  };

  const handleChangeRecomendToFriend = (event) => {
    setRecomendToFriend(event.target.value);
  };

  const handleChangeBuyThisGame = (event) => {
    setBuyThisGame(event.target.value);
  };

  const handleOptionChange = (event) => {
    setPlayedBefore(event.target.value === 'true');
  };

  const handleSubmit = () => {
    const mutate = addRating;
    mutate({
      variables: {
        gameId,
        playedBefore,
        playAgain: parseInt(playAgain, 10),
        recomendToFriend: parseInt(recomendToFriend, 10),
        buyThisGame: parseInt(buyThisGame, 10)
      }
    }).then(() => {
      handleClose();
    });
  };

  const handleClose = () => {
    onCloseDialog(true);
  };
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ '& .MuiPaper-root': { maxWidth: '100%', minWidth: { xs: 350, md: 500 } } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="body2" sx={{ fontWeight: 100 }}>
            Rate this game
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {gamePlayCounts === 0 && (playedBefore === false || playedBefore === null) && (
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Have you played this game?</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel
                  value="true"
                  onChange={handleOptionChange}
                  checked={playedBefore !== null && playedBefore === true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  onChange={handleOptionChange}
                  checked={playedBefore !== null && playedBefore === false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          )}

          <Box m={3} />

          {(gamePlayCounts > 0 || playedBefore === true) && (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Would you play it again?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={playAgain}
                  label="Would you play it again?"
                  onChange={handleChangePlayAgain}
                >
                  <MenuItem value={3}>Yes</MenuItem>
                  <MenuItem value={2}>Yes, but only with certain people</MenuItem>
                  <MenuItem value={1}>No</MenuItem>
                </Select>
              </FormControl>

              <Box m={3} />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Would you recommend it to friends?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={recomendToFriend}
                  label="Would you recommend it to friends?"
                  onChange={handleChangeRecomendToFriend}
                >
                  <MenuItem value={3}>Yes</MenuItem>
                  <MenuItem value={2}>Yes, but only some friends</MenuItem>
                  <MenuItem value={1}>No</MenuItem>
                </Select>
              </FormControl>

              <Box m={3} />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Would you buy this game?</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={buyThisGame}
                  label="Would you buy this game?"
                  onChange={handleChangeBuyThisGame}
                >
                  <MenuItem value={4}>Absolutely, even if a friend had it</MenuItem>
                  <MenuItem value={3}>Yes</MenuItem>
                  <MenuItem value={2}>Only if on special</MenuItem>
                  <MenuItem value={1}>No</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          {gamePlayCounts === 0 && (playedBefore === false || playedBefore === null) && (
            <FormHelperText>You have to have played the game in order to rate it.</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          {(gamePlayCounts > 0 || playedBefore === true) && (
            <Button variant="contained" autoFocus onClick={handleSubmit}>
              Save
            </Button>
          )}
          {gamePlayCounts === 0 && (playedBefore === false || playedBefore === null) && (
            <Button variant="outlined" autoFocus onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
