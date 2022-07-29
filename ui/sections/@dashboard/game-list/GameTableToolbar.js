import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

GameTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterData: PropTypes.func
};

export default function GameTableToolbar({ filterName, onFilterName, onFilterData }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 3 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search item..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            )
          }}
        />
        {filterName.length > 0 && (
          <Button variant="contained" onClick={onFilterData}>
            <Iconify icon={'eva:search-fill'} sx={{ width: 25, height: 25 }} />
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
