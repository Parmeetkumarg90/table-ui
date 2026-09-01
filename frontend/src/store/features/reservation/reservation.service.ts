import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CreateReservationPayloadInterface,
  ListReservationPayloadInterface,
  SortField,
} from "./reservation.types";

const createReservationService = createAsyncThunk(
  "create reservation thunk",
  async (payload: CreateReservationPayloadInterface, thunkApi) => {
    const reservationCreateDetail = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`,
      payload,
    );

    if (!reservationCreateDetail.data?.reservation) {
      return thunkApi.rejectWithValue(reservationCreateDetail.data);
    }

    return { reservation: reservationCreateDetail.data.reservation };
  },
);

const listReservationService = createAsyncThunk(
  "list reservation thunk",
  async (payload: ListReservationPayloadInterface, thunkApi) => {
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

    const reservationListDetail = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`,
      {
        params: {
          limit: payload.limit,
          page: payload.page,
          search: payload.search || undefined,
          categories,
          sort,
        },
      },
    );

    if (!reservationListDetail.data?.reservations) {
      return thunkApi.rejectWithValue(reservationListDetail.data);
    }

    return { reservationDetail: reservationListDetail.data, payload };
  },
);

export { createReservationService, listReservationService };
