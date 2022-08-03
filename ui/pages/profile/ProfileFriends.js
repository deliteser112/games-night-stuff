import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Button, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import EmptyContent from '../../components/EmptyContent';
// sections
import FriendSearchModal from './FriendSearchModal';
import { UserCard } from '../../sections/@dashboard/user/cards';
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
          {friendsFromUsers.map((user, index) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard user={user} index={index} />
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
