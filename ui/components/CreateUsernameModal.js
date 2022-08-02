import { useQuery, useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { user as userQuery } from '../_queries/Users.gql';
import { setUsersUsername as setUsersUsernameMutation } from '../_mutations/Users.gql';

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
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function CreateUsernameModal() {
  const [setUsersUsername] = useMutation(setUsersUsernameMutation);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState('');

  const { loading, data } = useQuery(userQuery);

  const username = data && data.user && data.user.username;

  useEffect(() => {
    if (!loading && !username) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading, username]);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    if (e.target.value.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSaveSettings = () => {
    if (userName.length > 0) {
      const mutate = setUsersUsername;
      mutate({
        variables: {
          username: userName
        },
        refetchQueries: [{ query: userQuery }]
      });
      setOpen(false);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          Please create a username
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" gutterBottom>
            Welcome to GamesNight, please create a username.
          </Typography>
          <TextField
            fullWidth
            error={error}
            id="standard-error-helper-text"
            label="Username"
            helperText={error ? 'Incorrect entry.' : ''}
            variant="standard"
            value={userName}
            onChange={handleChangeUserName}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveSettings}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
