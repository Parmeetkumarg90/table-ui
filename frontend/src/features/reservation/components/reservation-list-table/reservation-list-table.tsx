"use client"
import { EnhancedTable } from "@/components/shared/table/components/table/table"
import { HeadCell, Order } from "@/components/shared/table/types/table";
import { listReservationService } from "@/store/features/reservation/reservation.service";
import { SortField } from "@/store/features/reservation/reservation.types";
import { useAppDispatch } from "@/store/hook/store";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { ReservationInterface } from "../../types/reservation.types";

const ReservationListTable = () => {
    const reservationListDetail = useSelector((state: RootState) => state.reservation)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (reservationListDetail.reservations.length === 0 && reservationListDetail.page === 0) {
            dispatch(listReservationService({
                limit: reservationListDetail.limit,
                page: reservationListDetail.page + 1,
            }));
        }
    }, [reservationListDetail.reservations.length, reservationListDetail.page])

    const columnFields: (keyof ReservationInterface)[] = [
        "firstname",
        "lastname",
        "age",
        "category",
        "created_at",
        "updated_at",
    ];

    const headCells: HeadCell<ReservationInterface>[] = columnFields.map((fieldname) => ({
        id: fieldname,
        label: fieldname
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase()),
        order: (reservationListDetail.sort?.[fieldname as SortField] as Order) ?? "asc",
        canSort: !fieldname.endsWith("at"),
    }));

    return (
        <EnhancedTable headCells={headCells} rows={reservationListDetail.reservations ?? []} />
    )
}

export { ReservationListTable }