import { createSlice } from "@reduxjs/toolkit";
import { ReservationSliceInterface } from "./reservation.types";
import { createReservationService, listReservationService, } from "./reservation.service";
import { enqueueSnackbar } from "notistack";

const initialState: ReservationSliceInterface = {
    limit: 10,
    total: 0,
    page: 0,
    reservations: [],
    loading: false,
}

const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addAsyncThunk(createReservationService, {
            fulfilled(state, _) {
                enqueueSnackbar({
                    variant: "success",
                    message: "Reservation created success"
                })
                state.loading = false
            },
            pending(state, _) {
                state.loading = true
            },
            rejected(state, _) {
                state.loading = false
                enqueueSnackbar({
                    variant: "error",
                    message: "Reservation creation failed"
                })
            }
        });

        builder.addAsyncThunk(listReservationService, {
            fulfilled(state, action) {
                const { payload, reservationDetail } = action.payload;
                state.limit = reservationDetail.limit;
                state.total = reservationDetail.total;
                state.page = reservationDetail.page;
                state.reservations = reservationDetail.reservations;
                state.loading = false;
                state.search = payload.search;
                state.sort = payload.sort;
            },
            pending(state, _) {
                state.loading = true;
            },
            rejected(state, _) {
                state.loading = false;
            }
        });
    },
});

export default reservationSlice.reducer