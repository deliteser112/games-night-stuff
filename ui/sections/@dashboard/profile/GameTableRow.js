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

GameTableRow.propTypes = {
  row: PropTypes.object
};

export default function GameTableRow({ row }) {
  const { _id, title, thumbnail } = row;

  return (
    <TableRow hover>
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
    </TableRow>
  );
}
