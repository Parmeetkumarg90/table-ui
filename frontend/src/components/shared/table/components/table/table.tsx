"use client";
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
}: EnhancedTableComponentProps<T>) => {
  const refinedRows =
    page !== undefined && rowsPerPage !== undefined
      ? rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      : rows;

  return (
    <Box className={styles.layout}>
      {toolbar}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer
          className={
            showPaginationControl
              ? styles.listContainer
              : styles.autoHeightContainer
          }
        >
          <Table aria-labelledby="tableTitle">
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
                    role="checkbox"
                    tabIndex={-1}
                    key={String(rowKey)}
                    className={index % 2 === 0 ? styles.evenRows : styles.row}
                  >
                    {headCells.map((headCell) => (
                      <TableCell key={String(headCell.id)} align="left">
                        {String(row[headCell.id] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {showPaginationControl && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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
