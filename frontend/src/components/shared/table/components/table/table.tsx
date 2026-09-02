import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./styles.module.css";
import { HeadCell } from "../../types/table";
import { EnhancedTableHead } from "../table-header/table-header";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Typography from "@mui/material/Typography";

interface EnhancedTableComponentProps<T> {
  headCells: HeadCell<T>[];
  rows: T[];
  toolbar?: React.ReactNode;
  handleRequestSort: (fieldname: keyof T) => void;
  totalRows?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  showPaginationControl?: boolean;
  loading: boolean;
}

const EnhancedTable = <T,>({
  headCells,
  rows,
  toolbar,
  handleRequestSort,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  showPaginationControl = true,
  loading = false,
}: EnhancedTableComponentProps<T>) => {
  const refinedRows =
    rows.length > (rowsPerPage ?? 0) &&
    page !== undefined &&
    rowsPerPage !== undefined
      ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      : rows;

  return (
    <Box className={styles.layout}>
      {toolbar}
      <Paper className={styles.tablePaper}>
        <TableContainer
          className={
            showPaginationControl
              ? styles.listContainer
              : styles.autoHeightContainer
          }
        >
          <Table aria-labelledby="tableTitle" className={styles.table}>
            <EnhancedTableHead
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {refinedRows.map((row, index) => {
                const rowKey = (row as any)?.uuid ?? (row as any)?.id ?? index;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={String(rowKey)}
                    className={index % 2 === 0 ? styles.evenRows : styles.row}
                  >
                    {headCells.map((headCell) => {
                      const cellValue = String(row[headCell.id] ?? "");
                      return (
                        <TableCell
                          key={String(headCell.id)}
                          align="left"
                          className={styles.cell}
                        >
                          <Tooltip
                            title={cellValue.replace(/\b\w/g, (c) =>
                              c.toUpperCase(),
                            )}
                            arrow
                            placement="top"
                          >
                            <span className={styles.cellText}>{cellValue}</span>
                          </Tooltip>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {(loading || refinedRows.length === 0) && (
            <Box
              className={
                refinedRows.length > 0
                  ? styles.loaderBox
                  : styles.fullHeightLoader
              }
            >
              {loading && <CircularProgress />}
              {!loading && refinedRows.length === 0 && (
                <Box className={styles.noReservationContainer}>
                  <Image
                    src={"/reservations/no-reservation.png"}
                    alt="No reservations"
                    width={400}
                    height={400}
                    loading="eager"
                  />
                  <Typography>
                    No results found. Try changing your filters.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </TableContainer>
        {showPaginationControl && (
          <TablePagination
            className={styles.pagination}
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={totalRows ?? 0}
            rowsPerPage={rowsPerPage ?? 0}
            page={page ?? 0}
            onPageChange={(_, newPage) => onPageChange?.(newPage + 1)}
            onRowsPerPageChange={(event) =>
              onRowsPerPageChange?.(parseInt(event.target.value, 10))
            }
          />
        )}
      </Paper>
    </Box>
  );
};

export { EnhancedTable };
