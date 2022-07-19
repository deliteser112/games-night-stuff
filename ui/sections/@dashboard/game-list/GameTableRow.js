import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, TableRow, Checkbox, TableCell, Typography, MenuItem, Stack, Avatar, Chip, Tooltip } from '@mui/material';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
// utils
import stringAvatar from '../../../utils/stringAvatar';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

GameTableRow.propTypes = {
  user: PropTypes.object,
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,

  onWishList: PropTypes.func,
  onOwnList: PropTypes.func,
  onItchList: PropTypes.func
};

export default function GameTableRow({ user, row, selected, onWishList, onOwnList, onItchList, onSelectRow }) {
  const [wishListStatus, setWishListStatus] = useState(false);
  const [itchListStatus, setItchListStatus] = useState(false);
  const [ownListStatus, setOwnListStatus] = useState(false);

  const { _id, title, thumbnail, minPlaytime, maxPlaytime, minPlayers, maxPlayers } = row;

  useEffect(() => {
    if (user) {
      const { wishlist, itchlist, ownlist } = user;
      if (wishlist) {
        const wishStatus = wishlist.find((wl) => wl === _id);
        setWishListStatus(wishStatus);
      }

      if (itchlist) {
        const itchStatus = itchlist.find((wl) => wl === _id);
        setItchListStatus(itchStatus);
      }

      if (ownlist) {
        const ownStatus = ownlist.find((wl) => wl === _id);
        setOwnListStatus(ownStatus);
      }
    }
  }, [user]);

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar variant="square" {...stringAvatar(`${title} ' '`)} alt={title} src={thumbnail} />
          <Link
            underline="hover"
            variant="subtitle2"
            component={RouterLink}
            color="text.secondary"
            to={`${PATH_DASHBOARD.games}/${_id}`}
          >
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Link>
          {wishListStatus && (
            <Tooltip title="Added to WishList" placement="top">
              <Chip label="Wish" size="small" color="error" />
            </Tooltip>
          )}
          {itchListStatus && (
            <Tooltip title="Added to ItchList" placement="top">
              <Chip label="Itch" size="small" color="primary" />
            </Tooltip>
          )}

          {ownListStatus && (
            <Tooltip title="Added to OwnList" placement="top">
              <Chip label="Own" size="small" color="warning" />
            </Tooltip>
          )}
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Label
          variant="ghost"
          color={(Number(maxPlaytime) > 100 && 'warning') || (Number(maxPlaytime) > 40 && 'success') || 'primary'}
        >
          {`${minPlaytime} ~ ${maxPlaytime} mins`}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label
          variant="ghost"
          color={(Number(maxPlayers) > 10 && 'warning') || (Number(maxPlayers) > 5 && 'success') || 'primary'}
        >
          {`${minPlayers} ~ ${maxPlayers} people`}
        </Label>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                disabled={!!ownListStatus}
                onClick={() => {
                  onWishList(!wishListStatus);
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'cil:heart'} />
                {wishListStatus ? 'Remove From WishList' : 'Add to WishList'}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onItchList(!itchListStatus);
                  handleCloseMenu();
                }}
                sx={{ color: 'primary.main' }}
              >
                <Iconify icon={'ic:sharp-travel-explore'} />
                {itchListStatus ? 'Remove From ItchList' : 'Add to ItchList'}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onOwnList(!ownListStatus);
                  handleCloseMenu();
                }}
                sx={{ color: 'warning.main' }}
              >
                <Iconify icon={'bi:person-check'} />
                {ownListStatus ? 'Remove From OwnList' : 'Add to OwnList'}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
