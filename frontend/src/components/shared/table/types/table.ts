export interface HeadCell<T> {
  id: keyof T;
  label: string;
  order?: Order;
  canSort: boolean;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps<T> {
  onRequestSort: (fieldname: keyof T) => void;
  headCells: readonly HeadCell<T>[];
}
