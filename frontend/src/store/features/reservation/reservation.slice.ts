import { createSlice } from "@reduxjs/toolkit";
import { ReservationSliceInterface } from "./reservation.types";
import {
  createReservationService,
  listReservationService,
} from "./reservation.service";
import { enqueueSnackbar } from "notistack";

const initialState: ReservationSliceInterface = {
  limit: 10,
  total: 0,
  page: 0,
  reservations: [],
  loading: false,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addAsyncThunk(createReservationService, {
      fulfilled(state, _) {
        enqueueSnackbar({
          variant: "success",
          message: "Reservation created success",
        });
        state.loading = false;
      },
      pending(state, _) {
        state.loading = true;
      },
      rejected(state, _) {
        state.loading = false;
        enqueueSnackbar({
          variant: "error",
          message: "Reservation creation failed",
        });
      },
    });

    builder.addAsyncThunk(listReservationService, {
      fulfilled(state, action) {
        const { payload, reservationDetail } = action.payload;
        const isSearchSame =
          JSON.stringify(state.search) === JSON.stringify(payload.search);
        const isSortSame =
          JSON.stringify(state.sort) === JSON.stringify(payload.sort);
        const isCategoriesSame =
          JSON.stringify(state.categories) ===
          JSON.stringify(payload.categories);

        state.search = payload.search;
        state.sort = payload.sort;
        state.categories = payload.categories;
        state.limit = reservationDetail.limit;
        state.total = reservationDetail.total;
        state.page = reservationDetail.page;
        state.reservations =
          isSearchSame &&
          isSortSame &&
          isCategoriesSame &&
          reservationDetail.page !== 1
            ? [...state.reservations, ...reservationDetail.reservations]
            : reservationDetail.reservations;
        state.loading = false;
      },
      pending(state, _) {
        state.loading = true;
      },
      rejected(state, _) {
        state.loading = false;
      },
    });
  },
});

export default reservationSlice.reducer;
