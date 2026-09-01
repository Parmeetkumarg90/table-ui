import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { EnhancedTableProps } from "../../types/table";
import styles from "./styles.module.css";

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const { onRequestSort, headCells } = props;
  const createSortHandler = (property: keyof T) => {
    return () => {
      onRequestSort(property);
    };
  };

  return (
    <TableHead>
      <TableRow className={styles.tableHeaderRow}>
        {headCells.map((headCell) => (
          <TableCell key={String(headCell["id"])} align={"left"}>
            {headCell.canSort ? (
              <TableSortLabel
                active={headCell.order !== undefined ? true : false}
                direction={headCell.order === "asc" ? "asc" : "desc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export { EnhancedTableHead };
