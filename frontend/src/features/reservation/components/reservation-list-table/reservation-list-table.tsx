"use client";
import { EnhancedTable } from "@/components/shared/table/components/table/table";
import { HeadCell, Order } from "@/components/shared/table/types/table";
import { listReservationService } from "@/store/features/reservation/reservation.service";
import {
  ListReservationPayloadInterface,
  SortField,
} from "@/store/features/reservation/reservation.types";
import { useAppDispatch } from "@/store/hook/store";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReservationInterface } from "../../types/reservation.types";
import { UserCategory } from "../../enum/user-category";
import { ReservationEnhancedTableToolbar } from "../reservation-table-header-toolbar/table-header-toolbar";
import { InfiniteScrollWrapper } from "@/components/shared/infinite-scroll/infinite-scroll";
import { useWindowDimension } from "@/features/window/hook/use-dimension";

const ReservationListTable = () => {
  const reservationListDetail = useSelector(
    (state: RootState) => state.reservation,
  );
  const dispatch = useAppDispatch();
  const { windowWidth } = useWindowDimension();
  const doInfiniteScroll = windowWidth < 768;

  useEffect(() => {
    if (
      reservationListDetail.reservations.length === 0 &&
      reservationListDetail.page === 0
    ) {
      const { reservations, total, loading, ...previousFilters } =
        reservationListDetail;
      dispatch(
        listReservationService({
          ...previousFilters,
          limit: reservationListDetail.limit || 10,
          page: 1,
        }),
      );
    }
  }, [reservationListDetail.reservations.length, reservationListDetail.page]);

  const onPageChange = (newPage: number) => {
    if (reservationListDetail.loading) {
      return;
    }
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;
    dispatch(
      listReservationService({
        ...previousFilters,
        limit: reservationListDetail.limit,
        page: newPage,
      }),
    );
  };

  const onRowsPerPageChange = (newLimit: number) => {
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;
    dispatch(
      listReservationService({
        ...previousFilters,
        limit: newLimit,
        page: 1,
      }),
    );
  };

  const columnFields: (keyof ReservationInterface)[] = [
    "firstname",
    "lastname",
    "age",
    "category",
    "created_at",
    "updated_at",
  ];

  const headCells: HeadCell<ReservationInterface>[] = columnFields.map(
    (fieldname) => ({
      id: fieldname,
      label: fieldname
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      order:
        (reservationListDetail.sort?.[fieldname as SortField] as Order) ??
        undefined,
      canSort: !(fieldname.endsWith("at") || fieldname.endsWith("ategory")),
    }),
  );

  const rows = (reservationListDetail.reservations ?? []).map(
    (reservation) => ({
      ...reservation,
      created_at: new Date(reservation.created_at).toLocaleString(),
      updated_at: new Date(reservation.updated_at).toLocaleString(),
    }),
  );

  const handleRequestSort = (fieldname: keyof ReservationInterface) => {
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;

    const currentSorting = previousFilters.sort?.[fieldname as SortField];

    let sort = {
      ...previousFilters.sort,
    };

    if (currentSorting === undefined) {
      sort[fieldname as SortField] = "asc";
    } else if (currentSorting === "asc") {
      sort[fieldname as SortField] = "desc";
    } else {
      delete sort[fieldname as SortField];
    }

    const filter: ListReservationPayloadInterface = {
      ...previousFilters,
      sort,
    };
    dispatch(listReservationService(filter));
  };

  const onSearch = (value: string) => {
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;
    if (previousFilters.search?.trim() ?? "" === value.trim()) {
      return;
    }

    const filter: ListReservationPayloadInterface = {
      ...previousFilters,
      search: value || undefined,
      page: 1,
    };

    dispatch(listReservationService(filter));
  };

  const onCategoryChange = (categories: UserCategory[]) => {
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;
    const filter: ListReservationPayloadInterface = {
      ...previousFilters,
      categories,
      page: 1,
    };

    dispatch(listReservationService(filter));
  };

  const fetchMore = () => {
    if (
      reservationListDetail.loading ||
      reservationListDetail.reservations.length >= reservationListDetail.total
    ) {
      return;
    }
    const { reservations, total, loading, ...previousFilters } =
      reservationListDetail;
    dispatch(
      listReservationService({
        ...previousFilters,
        limit: reservationListDetail.limit || 10,
        page: reservationListDetail.page + 1,
      }),
    );
  };

  return doInfiniteScroll ? (
    <InfiniteScrollWrapper
      fetchMore={fetchMore}
      hasMore={
        reservationListDetail.reservations.length < reservationListDetail.total
      }
      totalLength={reservationListDetail.reservations.length}
      loading={false}
    >
      <EnhancedTable
        headCells={headCells}
        rows={rows}
        handleRequestSort={handleRequestSort}
        toolbar={
          <ReservationEnhancedTableToolbar
            onOptionSelect={onCategoryChange}
            onSearch={onSearch}
            selectedOptions={
              reservationListDetail.categories?.length
                ? reservationListDetail.categories
                : []
            }
          />
        }
        showPaginationControl={false}
        loading={reservationListDetail.loading}
      />
    </InfiniteScrollWrapper>
  ) : (
    <EnhancedTable
      headCells={headCells}
      rows={rows}
      handleRequestSort={handleRequestSort}
      toolbar={
        <ReservationEnhancedTableToolbar
          onOptionSelect={onCategoryChange}
          onSearch={onSearch}
          selectedOptions={
            reservationListDetail.categories?.length
              ? reservationListDetail.categories
              : []
          }
        />
      }
      totalRows={reservationListDetail.total}
      page={Math.max(0, reservationListDetail.page - 1)}
      rowsPerPage={reservationListDetail.limit || 10}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      loading={reservationListDetail.loading}
    />
  );
};

export { ReservationListTable };
