"use client";
import { EnhancedTable } from "@/components/shared/table/components/table/table";
import { HeadCell, Order } from "@/components/shared/table/types/table";
import { SortField } from "@/store/features/reservation/reservation.types";
import { ReservationInterface } from "../../types/reservation.types";
import { UserCategory } from "../../enum/user-category";
import { ReservationEnhancedTableToolbar } from "../reservation-table-header-toolbar/table-header-toolbar";
import { InfiniteScrollWrapper } from "@/components/shared/infinite-scroll/infinite-scroll";
import { useWindowDimension } from "@/features/window/hook/use-dimension";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchReservationsApi } from "@/store/features/reservation/reservation.action";

interface ReservationListTableProps {
  initialReservations: ReservationInterface[];
  total: number;
  page: number;
  limit: number;
  search: string;
  categories: UserCategory[];
  sortField?: SortField;
  sortOrder?: Order;
}

const ReservationListTable = ({
  initialReservations,
  total,
  page,
  limit,
  search,
  categories,
  sortField,
  sortOrder,
}: ReservationListTableProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { windowWidth } = useWindowDimension();
  const doInfiniteScroll = windowWidth < 768;

  const [infiniteReservations, setInfiniteReservations] =
    useState<ReservationInterface[]>(initialReservations);

  useEffect(() => {
    setInfiniteReservations(initialReservations);
  }, [initialReservations]);

  const updateQuery = (
    updates: Record<string, string | number | undefined | null>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onPageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

  const onRowsPerPageChange = (newLimit: number) => {
    updateQuery({ limit: newLimit, page: 1 });
  };

  const onSearch = (value: string) => {
    if (search.trim() === value.trim()) return;
    updateQuery({ search: value.trim() || undefined, page: 1 });
  };

  const onCategoryChange = (newCategories: UserCategory[]) => {
    updateQuery({
      categories:
        newCategories.length > 0 ? newCategories.join(",") : undefined,
      page: 1,
    });
  };

  const handleRequestSort = (fieldname: keyof ReservationInterface) => {
    const isCurrentField = sortField === fieldname;
    let nextOrder: Order | undefined;

    if (!isCurrentField || !sortOrder) {
      nextOrder = "asc";
    } else if (sortOrder === "asc") {
      nextOrder = "desc";
    } else {
      nextOrder = undefined;
    }

    updateQuery({
      sortField: nextOrder ? (fieldname as string) : undefined,
      sortOrder: nextOrder,
      page: 1,
    });
  };

  const fetchMore = async () => {
    if (infiniteReservations.length >= total) return;
    const nextPage = Math.floor(infiniteReservations.length / limit) + 1;
    const sort =
      sortField && sortOrder ? { [sortField]: sortOrder } : undefined;

    const data = await fetchReservationsApi({
      page: nextPage,
      limit,
      search: search || undefined,
      categories: categories.length > 0 ? categories : undefined,
      sort,
    });
    setInfiniteReservations((prev) => [...prev, ...(data.reservations ?? [])]);
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
      order: sortField === fieldname ? sortOrder : undefined,
      canSort: !(fieldname.endsWith("at") || fieldname.endsWith("ategory")),
    }),
  );

  const displayReservations = doInfiniteScroll
    ? infiniteReservations
    : initialReservations;

  const rows = displayReservations.map((reservation) => ({
    ...reservation,
    created_at: new Date(reservation.created_at).toLocaleString(),
    updated_at: new Date(reservation.updated_at).toLocaleString(),
  }));

  return doInfiniteScroll ? (
    <InfiniteScrollWrapper
      fetchMore={fetchMore}
      hasMore={infiniteReservations.length < total}
      totalLength={infiniteReservations.length}
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
            selectedOptions={categories}
            search={search}
          />
        }
        showPaginationControl={false}
        loading={false}
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
          selectedOptions={categories}
          search={search}
        />
      }
      totalRows={total}
      page={Math.max(0, page - 1)}
      rowsPerPage={limit}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      loading={false}
    />
  );
};

export { ReservationListTable };
