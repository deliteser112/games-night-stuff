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

LoanedTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onShowReturnModal: PropTypes.func
};

export default function LoanedTableRow({ row, selected, onSelectRow, onShowReturnModal }) {
  const { _id, title, thumbnail, minPlaytime, maxPlaytime, minPlayers, maxPlayers, name } = row;

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
      <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar {...stringAvatar(`${name.first} ${name.last}`)} style={{ color: 'white' }} />
          <Typography variant="subtitle2" noWrap>
            {`${name.first} ${name.last ? name.last : ''}`}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  onShowReturnModal();
                }}
                sx={{ color: 'warning.main' }}
              >
                <Iconify icon={'icon-park-outline:back'} />
                Return this game
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
