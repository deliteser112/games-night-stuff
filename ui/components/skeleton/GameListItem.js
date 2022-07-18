import React from 'react';
// @mui
import { Stack, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function GameListItem() {
  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 1 }}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Skeleton variant="rectangle" width={40} height={40} />
        <Skeleton variant="text" sx={{ width: 330, height: 22 }} />
      </Stack>
      <Skeleton variant="text" sx={{ width: 90, height: 22 }} />
      <Skeleton variant="text" sx={{ width: 90, height: 22, marginLeft: 5 }} />
      <Skeleton variant="circular" width={40} height={40} sx={{ margin: 2 }} />
    </Stack>
  );
}
