import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Typography,
  TextField,
  Box
} from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { LoadingButton } from '@mui/lab';

import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';

// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';

// graphql & collections
import { useQuery, useMutation } from '@apollo/react-hooks';

// import queries & mutations
import { user as userQuery, users as usersQuery } from '../../_queries/Users.gql';
import { addFriend as addFriendMutation, sendInvitationEmail as sendInvitationEmailMutation } from '../../_mutations/Users.gql';

// utils
import stringAvatar from '../../utils/stringAvatar';

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

const filter = createFilterOptions();

export default function FriendSearchModal({ isOpen, gameId, onCloseDialog }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [addFriend] = useMutation(addFriendMutation);
  const [sendInvitationEmail] = useMutation(sendInvitationEmailMutation);
  
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

  const [toggleOpen, setToggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    emailAddress: '',
    name: {
      first: '',
      last: ''
    }
  });

  const [isSearch, setIsSearch] = useState(false);
  const [isSearchValue, setIsSearchValue] = useState('');

  const InviteFriendSchema = Yup.object().shape({
    emailAddress: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const defaultValues = {
    emailAddress: ''
  };

  const methods = useForm({
    resolver: yupResolver(InviteFriendSchema),
    defaultValues
  });

  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;

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

  // user add dialog

  const handleDialogClose = () => {
    setDialogValue({
      emailAddress: '',
      name: {
        first: '',
        last: ''
      }
    });
    setToggleOpen(false);
  };

  // user search dialog

  const handleSelectFriend = (user) => {
    console.log(user);
    setIsError(false);
    setSelectedFriend(user);
  };

  const handleIsSearchOpen = () => {
    if (isSearchValue.length > 2) {
      setIsSearch(true);
    }
  };

  const handleInputChange = (event, newValue) => {
    setIsSearchValue(newValue);
    if (newValue && newValue.length > 2) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  const handleAddFriendSubmit = () => {
    const { _id, name } = selectedFriend;
    const mutate = addFriend;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
    enqueueSnackbar(`"${name.first}" was added successfully!`, {
      variant: 'success'
    });
    handleClose();
  };

  // send the invitation
  const onSubmit = async (data) => {
    try {
      const mutate = sendInvitationEmail;

      const { emailAddress } = data;
      
      mutate({
        variables: {
          emailAddress
        },
        refetchQueries: [{ query: userQuery }]
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      enqueueSnackbar('The email has been successfully sent!', {
        variant: 'success'
      });
      handleClose();
      setToggleOpen(false);
    } catch (error) {
      console.error(error);

      reset();

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
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
            Add a new friend
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">Select the friend you would like to invite</Typography>
          <Box m={2} />

          <Autocomplete
            id="free-solo-dialog"
            sx={{ width: '100% !important' }}
            // value={value}
            open={isSearch}
            onOpen={handleIsSearchOpen}
            onClose={() => setIsSearch(false)}
            inputValue={isSearchValue}
            onInputChange={handleInputChange}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                // timeout to avoid instant validation of the dialog's form.
                setTimeout(() => {
                  setToggleOpen(true);
                  setDialogValue({
                    emailAddress: newValue,
                    name: {
                      first: '',
                      last: ''
                    }
                  });
                  setValue('emailAddress', newValue);
                }, 1000);
              } else if (newValue && newValue.inputValue) {
                setToggleOpen(true);
                setDialogValue({
                  emailAddress: newValue.inputValue,
                  name: {
                    first: '',
                    last: ''
                  }
                });
                setValue('emailAddress', newValue.inputValue);
              } else {
                handleSelectFriend(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  emailAddress: `Send invitation using "${params.inputValue}"`,
                  name: {
                    first: '',
                    last: ''
                  }
                });
              }

              return filtered;
            }}
            options={users}
            getOptionLabel={(option) => {
              // e.g value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.emailAddress;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => (
              <li {...props}>
                <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                  <Typography variant="subtitle2" noWrap>
                    {`${option.name.first} ${option.name.last ? option.name.last : ''}`}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify icon={'codicon:mail'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                      {option.emailAddress}
                    </Typography>
                  </Box>
                </Box>
              </li>
            )}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Search your friend by email" />}
          />

          {/* sub dialog */}

          <Dialog open={toggleOpen} onClose={handleDialogClose}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <DialogContentText>Please, send the invitation to him!</DialogContentText>
                <Box m={2} />
                <RHFTextField autoFocus variant="standard" margin="dense" name="emailAddress" label="Email address" />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                  endIcon={<Iconify icon={'bi:send-plus'} />}
                >
                  Send
                </LoadingButton>
              </DialogActions>
            </FormProvider>
          </Dialog>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleAddFriendSubmit}>
            Add
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
