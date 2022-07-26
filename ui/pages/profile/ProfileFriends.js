import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import EmptyContent from '../../components/EmptyContent';
// sections
import FriendSearchModal from './FriendSearchModal';

// utils
import stringAvatar from '../../utils/stringAvatar';

import { useMutation } from '@apollo/react-hooks';

// queries
import { user as userQuery } from '../../_queries/Users.gql';
// mutations
import { addFriend as addFriendMutation, removeFriend as removeFriendMutation } from '../../_mutations/Users.gql';

// ----------------------------------------------------------------------

ProfileFriends.propTypes = {
  users: PropTypes.array,
  friends: PropTypes.array
};

export default function ProfileFriends({ users, friends }) {
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [friendsFromUsers, setFriendsFromUsers] = useState([]);

  useEffect(() => {
    if (users && friends && friends.length > 0) {
      const tmpFriends = friends.map((user) => users.find((uw) => uw._id === user.userId));
      setFriendsFromUsers(tmpFriends);
    }
  }, [friends, users]);

  return (
    <Box sx={{ mt: 5 }}>
      <FriendSearchModal isOpen={friendModalOpen} onCloseDialog={() => setFriendModalOpen(false)} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Your Friends</Typography>
        <Button
          variant="contained"
          onClick={() => setFriendModalOpen(true)}
          startIcon={<Iconify icon={'ant-design:plus-outlined'} />}
        >
          Add friend
        </Button>
      </Box>

      {friendsFromUsers.length > 0 ? (
        <Grid container spacing={3}>
          {friendsFromUsers.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <FollowerCard user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyContent
          title="No added friend"
          sx={{
            '& span.MuiBox-root': { height: 160 }
          }}
        />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  user: PropTypes.object
};

function FollowerCard({ user }) {
  const [addFriend] = useMutation(addFriendMutation);
  const [removeFriend] = useMutation(removeFriendMutation);

  const { _id, name, emailAddress } = user;

  const [toggle, setToggle] = useState(true);

  const handleAddOrRemoveFriend = (status) => {
    const mutate = status ? addFriend : removeFriend;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
    setToggle(status);
  };

  const emailToSecurityCode = (email) => {
    let decodedByDot = '';
    if (email.length > 0) {
      prefixEmail = email.split('@')[0];
      surfixEmail = email.split('@')[1];
      divideByDot = surfixEmail.split('.')[1];
      decodedByDot = `${prefixEmail[0]}${prefixEmail[1]}*****@${surfixEmail[0]}***.**${email[email.length - 1]}`;
    }
    return decodedByDot;
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar {...stringAvatar(`${name.first} ${name.last}`)} style={{ color: 'white' }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {`${name.first} ${name.last ? name.last : ''}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'codicon:mail'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {emailToSecurityCode(emailAddress)}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={() => handleAddOrRemoveFriend(!toggle)}
        variant={toggle ? 'text' : 'outlined'}
        color={toggle ? 'primary' : 'inherit'}
        startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
      >
        {toggle ? 'Added' : 'Add'}
      </Button>
    </Card>
  );
}
