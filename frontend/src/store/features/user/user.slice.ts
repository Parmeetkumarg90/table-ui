import { createSlice } from "@reduxjs/toolkit";
import { UserSliceInterface } from "./user.types";
import { createUserService, listUserService } from "./user.service";
import { enqueueSnackbar } from "notistack";

const initialState: UserSliceInterface = {
    limit: 10,
    total: 0,
    page: 0,
    users: [],
    loading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addAsyncThunk(createUserService, {
            fulfilled(state, _) {
                enqueueSnackbar({
                    variant: "success",
                    message: "User created success"
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
                    message: "User creation failed"
                })
            }
        });

        builder.addAsyncThunk(listUserService, {
            fulfilled(state, action) {
                const { payload, userDetail } = action.payload;
                state.limit = userDetail.limit;
                state.total = userDetail.total;
                state.page = userDetail.page;
                state.users = userDetail.users;
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

export default userSlice.reducer