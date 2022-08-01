import React, { useState, useEffect } from 'react';

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
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'timeToPlay', label: 'Time to play', align: 'left' },
  { id: 'numberOfPlayers', label: 'Number of players', align: 'right' }
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

  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState('');

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    if (filterName === '') {
      setFilter(filterName);
    }
  }, [filterName]);

  useEffect(() => {
    if (gameList.length) {
      setTableData(gameList);
    }
  }, [gameList]);

  const handleFilterData = () => {
    setPage(0);
    setFilter(filterName);
  }

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filter
  });

  const denseHeight = dense ? 60 : 80;
  const isNotFound = (!dataFiltered.length && !!filter) || (!isLoading && !dataFiltered.length);

  return (
    <Card>
      <GameTableToolbar filterName={filterName} onFilterName={handleFilterName} onFilterData={handleFilterData} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
            />
          )}

          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
            />

            <TableBody>
              {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
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
                    !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  )
                )}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataFiltered.length}
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

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filter }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filter) {
    tableData = tableData.filter((item) => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  return tableData;
}
