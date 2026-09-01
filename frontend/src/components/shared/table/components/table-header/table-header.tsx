import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { EnhancedTableProps } from "../../types/table";
import styles from "./styles.module.css"

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
    const { order, orderBy, onRequestSort, headCells } =
        props;
    const createSortHandler =
        (property: keyof T) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow className={styles.tableHeaderRow}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={String(headCell["id"])}
                        align={'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            // bgcolor:"red"
                        }}
                    >
                        {headCell.canSort ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
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

export { EnhancedTableHead }