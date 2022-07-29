import React, { useState, useEffect } from 'react';
// react-graphql
import { useQuery } from '@apollo/react-hooks';

// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  TableBody,
  TableContainer,
  TablePagination,
  FormControlLabel
} from '@mui/material';
// hooks
import useTable, { emptyRows } from '../../../hooks/useTable';
// components
import Scrollbar from '../../../components/Scrollbar';

import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions
} from '../../../components/table';

// sections
import { GameTableRow, GameTableToolbar } from '../../../sections/@dashboard/game-list';

// queries
import { findGameByKeywords as findGameByKeywordsQuery } from '../../../_queries/Games.gql';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'timeToPlay', label: 'Time to play', align: 'left' },
  { id: 'numberOfPlayers', label: 'Number of players', align: 'left' },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function GameList({ isLoading, gameList, user, onWishList, onItchList, onOwnList }) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage
  } = useTable({
    defaultOrderBy: 'title'
  });

  const [totalGamesCount, setTotalGamesCount] = useState(0);

  const [filteredGames, setFilteredGames] = useState([]);
  const [filter, setFilter] = useState('');

  const [filterName, setFilterName] = useState('');

  const fGBKQ = useQuery(findGameByKeywordsQuery, {
    variables: { keywords: filter }
  }).data;

  useEffect(() => {
    if (filterName === '') {
      setFilter(filterName);
    }
  }, [filterName]);

  useEffect(() => {
    if (gameList.length > 0 && filter === '') {
      setFilteredGames(gameList);
      setTotalGamesCount(gameList.length);
    }
  }, [gameList, filter]);

  useEffect(() => {
    if (fGBKQ && filter !== '') {
      const { findGameByKeywords } = fGBKQ;
      setFilteredGames(findGameByKeywords);
      setTotalGamesCount(findGameByKeywords.length);
    }
  }, [fGBKQ, filter]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterData = () => {
    setFilter(filterName);
  };

  const denseHeight = dense ? 60 : 80;

  return (
    <Card>
      <GameTableToolbar filterName={filterName} onFilterName={handleFilterName} onFilterData={handleFilterData} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={filteredGames.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  filteredGames.map((row) => row._id)
                )
              }
            />
          )}

          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={filteredGames.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  filteredGames.map((row) => row._id)
                )
              }
            />

            <TableBody>
              {filteredGames
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) =>
                  row ? (
                    <GameTableRow
                      key={row._id}
                      user={user}
                      row={row}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                      onOwnList={(status) => onOwnList(status, row._id)}
                      onWishList={(status) => onWishList(status, row._id)}
                      onItchList={(status) => onItchList(status, row._id)}
                    />
                  ) : (
                    !isLoading && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  )
                )}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, filteredGames.length)} />

              <TableNoData isNotFound={totalGamesCount === 0} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGames.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Card>
  );
}
