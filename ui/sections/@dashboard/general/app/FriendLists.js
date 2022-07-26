import React from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Card, Stack, Button, Avatar, Tooltip, Typography, CardHeader, IconButton } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// utils
import stringAvatar from '../../../../utils/stringAvatar';

// ----------------------------------------------------------------------

FriendLists.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  onViewAll: PropTypes.func
};

export default function FriendLists({ title, subheader, list, onViewAll, ...other }) {
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
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Tooltip title="Add Friends">
            <IconButton color="primary" size="large">
              <Iconify icon={'eva:plus-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        }
      />
      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map((friend) => (
          <Stack direction="row" alignItems="center" key={friend._id}>
            <Avatar {...stringAvatar(`${friend.name.first} ${friend.name.last}`)} style={{ color: 'white' }} />

            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {`${friend.name.first} ${friend.name.last}`}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {emailToSecurityCode(friend.emailAddress)}
              </Typography>
            </Box>

            <Tooltip title={`Contact to ${friend.name.first} ${friend.name.last}`} >
              <IconButton size="small">
                <Iconify icon={'bi:send-check'} width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}

        <Button variant="outlined" size="large" color="inherit" onClick={onViewAll}>
          View All
        </Button>
      </Stack>
    </Card>
  );
}
