export interface HeadCell<T> {
    id: keyof T;
    label: string;
    order: Order;
    canSort: boolean
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps<T> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    order: Order;
    orderBy: keyof T;
    headCells: readonly HeadCell<T>[]
}

export interface EnhancedTableToolbarProps {
}