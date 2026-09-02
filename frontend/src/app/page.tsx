import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import { ReservationListTable } from "@/features/reservation/components/reservation-list-table/reservation-list-table";
import { ReservationNavbar } from "@/features/reservation/components/reservation-navbar/reservation-navbar";
import { fetchReservationsApi } from "@/store/features/reservation/reservation.action";
import { UserCategory } from "@/features/reservation/enum/user-category";
import { SortField } from "@/store/features/reservation/reservation.types";
import { Order } from "@/components/shared/table/types/table";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;

  if (!searchParams?.page || !searchParams?.limit) {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) => {
        if (typeof val === "string") {
          params.set(key, val);
        } else if (Array.isArray(val)) {
          params.set(key, val.join(","));
        }
      });
    }
    if (!params.has("page")) params.set("page", "1");
    if (!params.has("limit")) params.set("limit", "10");

    redirect(`/?${params.toString()}`);
  }

  const page = parseInt(searchParams.page as string, 10);
  const limit = parseInt(searchParams.limit as string, 10);
  const search = (searchParams.search as string) || "";
  const categoriesParam = (searchParams.categories as string) || "";
  const categories = categoriesParam
    ? (categoriesParam.split(",").filter(Boolean) as UserCategory[])
    : [];
  const sortField = (searchParams.sortField as SortField) || undefined;
  const sortOrder = (searchParams.sortOrder as Order) || undefined;

  const sort = sortField && sortOrder ? { [sortField]: sortOrder } : undefined;

  const data = await fetchReservationsApi({
    page,
    limit,
    search: search || undefined,
    categories: categories.length > 0 ? categories : undefined,
    sort,
  }).catch((err) => {
    console.error("[Page SSR Error]:", err?.message || err);
    return {
      reservations: [],
      total: 0,
      limit,
      page,
    };
  });

  return (
    <Card className={styles.layout}>
      <ReservationNavbar />
      <ReservationListTable
        initialReservations={data.reservations ?? []}
        total={data.total ?? 0}
        page={page}
        limit={limit}
        search={search}
        categories={categories}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </Card>
  );
}
