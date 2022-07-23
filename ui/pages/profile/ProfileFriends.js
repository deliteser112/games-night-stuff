import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

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
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid key={user._id} item xs={12} md={4}>
            <FollowerCard user={user} friends={friends} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  user: PropTypes.object,
  friends: PropTypes.array
};

function FollowerCard({ user, friends }) {
  const [addFriend] = useMutation(addFriendMutation);
  const [removeFriend] = useMutation(removeFriendMutation);

  const { _id, name, emailAddress } = user;

  const [toggle, setToogle] = useState(false);

  useEffect(() => {
    if (friends && friends.length > 0) {
      const isFriend = friends.find((fw) => fw.userId === _id);
      setToogle(isFriend);
    }
  }, [friends]);

  const handleAddOrRemoveFriend = (status) => {
    const mutate = status ? addFriend : removeFriend;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });
    setToogle(status);
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
            {emailAddress}
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
