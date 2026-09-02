"use server";
import axios from "axios";
import {
  ListReservationPayloadInterface,
  SortField,
} from "./reservation.types";

const fetchReservationsApi = async (
  payload: ListReservationPayloadInterface,
) => {
  const sortEntries = Object.entries(payload.sort ?? {});
  const sort =
    sortEntries.length > 0
      ? JSON.stringify(
          sortEntries.map(([fieldname, order]) => ({
            fieldname: fieldname as SortField,
            order,
          })),
        )
      : undefined;

  const categories =
    payload.categories && payload.categories.length > 0
      ? JSON.stringify(payload.categories)
      : undefined;

  const backendUrl =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await axios.get(`${backendUrl}/reservation`, {
    params: {
      limit: payload.limit,
      page: payload.page,
      search: payload.search || undefined,
      categories,
      sort,
    },
  });

  return response.data as {
    reservations: any[];
    total: number;
    limit: number;
    page: number;
  };
};

export { fetchReservationsApi };
