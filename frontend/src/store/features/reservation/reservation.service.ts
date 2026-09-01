import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateReservationPayloadInterface, ListReservationPayloadInterface } from "./reservation.types"

const createReservationService = createAsyncThunk("create reservation thunk", async (payload: CreateReservationPayloadInterface, thunkApi) => {
    const reservationCreateDetail = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, payload);

    if (!reservationCreateDetail.data?.reservation) {
        return thunkApi.rejectWithValue(reservationCreateDetail.data)
    }

    return { reservation: reservationCreateDetail.data.reservation }
});

const listReservationService = createAsyncThunk("list reservation thunk", async (payload: ListReservationPayloadInterface, thunkApi) => {

    const reservationListDetail = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
        params: payload
    });

    if (!reservationListDetail.data?.reservations?.length) {
        return thunkApi.rejectWithValue(reservationListDetail.data)
    }

    return { reservationDetail: reservationListDetail.data, payload }
});

export { createReservationService, listReservationService }