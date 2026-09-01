"use client"
import { EnhancedTable } from "@/components/shared/table/components/table/table"
import { HeadCell, Order } from "@/components/shared/table/types/table";
import { listUserService } from "@/store/features/user/user.service";
import { SortField } from "@/store/features/user/user.types";
import { useAppDispatch } from "@/store/hook/store";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { UserInterface } from "../../types/user.types";

const UserListTable = () => {
    const userListDetail = useSelector((state: RootState) => state.users)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userListDetail.users.length === 0 && userListDetail.page === 0) {
            dispatch(listUserService({
                limit: userListDetail.limit,
                page: userListDetail.page + 1,
            }));
        }
    }, [userListDetail.users.length, userListDetail.page])

    const columnFields: (keyof UserInterface)[] = [
        "firstname",
        "lastname",
        "age",
        "category",
        "created_at",
        "updated_at",
    ];

    const headCells: HeadCell<UserInterface>[] = columnFields.map((fieldname) => ({
        id: fieldname,
        label: fieldname
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase()),
        order: (userListDetail.sort?.[fieldname as SortField] as Order) ?? "asc",
        canSort: !fieldname.endsWith("at"),
    }));


    return (
        <EnhancedTable headCells={headCells} rows={userListDetail.users??[]} />
    )
}

export { UserListTable }