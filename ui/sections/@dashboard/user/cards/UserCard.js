import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, Link, Tooltip } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
import stringAvatar from '../../../../utils/stringAvatar';
import { fShortenNumber } from '../../../../utils/formatNumber';

// sections
import FriendListViewModal from '../../../../pages/profile/FriendListViewModal';

// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';
import Iconify from '../../../../components/Iconify';

import { useMutation } from '@apollo/react-hooks';

// queries
import { user as userQuery } from '../../../../_queries/Users.gql';
// mutations
import { addFriend as addFriendMutation, removeFriend as removeFriendMutation } from '../../../../_mutations/Users.gql';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default function UserCard({ user, index }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addFriend] = useMutation(addFriendMutation);
  const [removeFriend] = useMutation(removeFriendMutation);

  const [friendModalOpen, setFriendModalOpen] = useState(false);

  const { _id, name, emailAddress, itchlist, ownlist, wishlist } = user;

  const [toggle, setToggle] = useState(true);

  const handleAddOrRemoveFriend = (status) => {
    const mutate = status ? addFriend : removeFriend;

    mutate({
      variables: {
        _id
      },
      refetchQueries: [{ query: userQuery }]
    });

    enqueueSnackbar(`"${name.first}" was removed successfully!`, {
      variant: 'success'
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
    <Card sx={{ textAlign: 'center' }}>
      <FriendListViewModal isOpen={friendModalOpen} onCloseDialog={() => setFriendModalOpen(false)} user={user} />
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper'
          }}
        />
        <Avatar
          {...stringAvatar(`${name.first} ${name.last}`)}
          style={{ color: 'black' }}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute'
          }}
        />
        <OverlayStyle />
        <Image
          src={`/static/friends-bg/friend-bg-${(index + 1) % 7}-min.jpg`}
          alt={`${name.first} ${name.last}`}
          ratio="16/9"
        />
        <IconButton
          onClick={() => handleAddOrRemoveFriend(!toggle)}
          color="error"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 12 }}
          aria-label="close"
        >
          <Iconify icon="carbon:close" />
        </IconButton>
      </Box>

      <Tooltip title="View Detail" placement="bottom">
        <Link underline="hover" sx={{ cursor: 'pointer', color: 'text.primary' }}>
          <Typography variant="subtitle1" sx={{ mt: 6 }} onClick={() => setFriendModalOpen(true)}>
            {`${name.first} ${name.last ? name.last : ''}`}
          </Typography>
        </Link>
      </Tooltip>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {emailToSecurityCode(emailAddress)}
      </Typography>

      <Stack alignItems="center">
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Itchlist
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber((itchlist && itchlist.length) || 0)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Wishlist
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber((wishlist && wishlist.length) || 0)}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Ownlist
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber((ownlist && ownlist.length) || 0)}</Typography>
        </div>
      </Box>
    </Card>
  );
}
