import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import queries
import { useQuery } from '@apollo/react-hooks';

import { styled } from '@mui/material/styles';
import { ToggleButton, Dialog, DialogTitle, DialogContent, ToggleButtonGroup, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { GameList } from '../../sections/@dashboard/profile';

// queries
import { findGamesByIds as findGamesByIdsQuery } from '../../_queries/Games.gql';

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

export default function FriendListViewModal({ isOpen, user, onCloseDialog }) {
  const [open, setOpen] = useState(false);
  const [gameIds, setGameIds] = useState([]);
  const [games, setGames] = useState([]);

  const [viewList, setViewList] = useState('itch');

  const { loading, data } = useQuery(findGamesByIdsQuery, { variables: { _ids: gameIds } });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      const { findGamesByIds } = data;
      setGames(findGamesByIds);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      let list = [];
      const { itchlist, wishlist, ownlist } = user;
      if (viewList === 'itch') list = itchlist;
      else if (viewList === 'wish') list = wishlist;
      else list = ownlist;

      if (list && list.length > 0) {
        const ids = list.map((gameId) => gameId);
        setGameIds(ids);
      } else {
        setGameIds([]);
      }
    }
  }, [user, viewList]);

  const handleViewList = (event, newView) => {
    if (newView !== null) {
      setViewList(newView);
    }
  };

  const handleClose = () => {
    onCloseDialog(true);
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ '& .MuiPaper-root': { maxWidth: '100%', minWidth: { xs: 325, md: 500, lg: 600 } } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} />
        <ToggleButtonGroup
          sx={{ '&.MuiToggleButtonGroup-root': { justifyContent: 'center', border: 'none' } }}
          value={viewList}
          exclusive
          onChange={handleViewList}
          aria-label="text viewList"
        >
          <ToggleButton value="itch" aria-label="itchlist">
            ItchList
          </ToggleButton>
          <ToggleButton value="wish" aria-label="wishlist">
            WishList
          </ToggleButton>
          <ToggleButton value="own" aria-label="ownlist">
            OwnList
          </ToggleButton>
        </ToggleButtonGroup>
        <DialogContent dividers sx={{ '&.MuiDialogContent-root': { padding: 0 } }}>
          <GameList loading={loading} gameList={games} />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
