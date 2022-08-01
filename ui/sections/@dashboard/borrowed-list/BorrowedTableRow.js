import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, TableRow, TableCell, Typography, Stack, Avatar } from '@mui/material';
// components
import Label from '../../../components/Label';
// utils
import stringAvatar from '../../../utils/stringAvatar';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

BorrowedTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onShowReturnModal: PropTypes.func
};

export default function BorrowedTableRow({ row, selected }) {
  const { _id, title, thumbnail, minPlaytime, maxPlaytime, minPlayers, maxPlayers, name } = row;

  return (
    <TableRow hover selected={selected}>
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
    </TableRow>
  );
}
