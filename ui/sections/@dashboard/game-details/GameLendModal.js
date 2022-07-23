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
  Autocomplete,
  Checkbox,
  Avatar,
  TextField,
  Box
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// graphql & collections
import { useQuery, useMutation } from '@apollo/react-hooks';

// import queries & mutations
import { user as userQuery, users as usersQuery } from '../../../_queries/Users.gql';
import { loanGameToUser as loanGameToUserMutation } from '../../../_mutations/Users.gql';

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

export default function GameLendModal({ isOpen, gameId, onCloseDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const [loanGameToUser] = useMutation(loanGameToUserMutation);

  // fetching user
  const { loading, data } = useQuery(userQuery, { variables: { _id: Meteor.userId() } });
  const user = (data && data.user) || {};

  // fetching user list
  const usersData = useQuery(usersQuery).data;
  const users = (usersData && usersData.users && usersData.users.users) || [];

  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (user.friends && users) {
      const tmpFriends = [];
      user.friends.map((friend) => {
        const tmpInfo = users.find((us) => us._id === friend.userId);
        tmpFriends.push(tmpInfo);
      });
      setFriends(tmpFriends);
    }
  }, [user, users]);

  const handleSelectFriend = (user) => {
    setIsError(false);
    setSelectedFriend(user);
  };

  const handleSubmit = () => {
    const mutate = loanGameToUser;

    console.log('KK:', selectedFriend);

    const { _id } = selectedFriend;
    if (_id) {
      mutate({
        variables: {
          userIdToLoanTo: _id,
          boardGameId: gameId
        },
        refetchQueries: [{ query: userQuery }]
      });
      enqueueSnackbar('This game was lent successfully!', {
        variant: 'success'
      });
      handleClose();
    } else {
      setIsError(true);
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
        sx={{ '& .MuiPaper-root': { maxWidth: '100%', minWidth: { xs: 350, md: 500 } } }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="body2" sx={{ fontWeight: 100 }}>
            Lend to
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">Select the friend you would like to lend to</Typography>
          <Box m={2} />
          <Autocomplete
            sx={{ width: '100% !important' }}
            id="checkboxes-tags-demo"
            options={[...friends]}
            onChange={(event, user) => handleSelectFriend(user)}
            getOptionLabel={(option) => option.emailAddress}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                <Avatar
                  {...stringAvatar(`${option.name.first} ${option.name.last}`)}
                  style={{ marginRight: 8, color: 'white' }}
                />
                {option.name.first} {option.name.last}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                error={isError}
                helperText={isError ? 'Select your friend' : ''}
                {...params}
                label="Friend"
                placeholder="Search your friend with email"
              />
            )}
          />
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
