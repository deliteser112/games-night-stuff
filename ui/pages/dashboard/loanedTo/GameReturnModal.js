import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Box
} from '@mui/material';

import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// graphql & collections
import { useMutation } from '@apollo/react-hooks';

// import queries & mutations
import { user as userQuery } from '../../../_queries/Users.gql';
import { returnUsersGame as returnUsersGameMutation } from '../../../_mutations/Users.gql';

// utils
import stringAvatar from '../../../utils/stringAvatar';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export default function GameReturnModal({ isOpen, gameId, userId, onCloseDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const [returnUsersGame] = useMutation(returnUsersGameMutation);

  const [open, setOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date());

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleSubmit = () => {
    const mutate = returnUsersGame;

    mutate({
      variables: {
        userIdToLoanTo: userId,
        boardGameId: gameId,
        returnDate: returnDate
      },
      refetchQueries: [{ query: userQuery }]
    });
    enqueueSnackbar('This game was returned successfully!', {
      variant: 'success'
    });
    handleClose();
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
          <Typography variant="title1" sx={{ fontWeight: 100 }}>
            Game has been returned
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Select the date the game was returned on
          </Typography>
          <Box m={2} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              orientation="landscape"
              openTo="day"
              value={returnDate}
              shouldDisableDate={isWeekend}
              onChange={(date) => {
                setReturnDate(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
