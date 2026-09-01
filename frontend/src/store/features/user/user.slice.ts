import { createSlice } from "@reduxjs/toolkit";
import { UserSliceInterface } from "./user.types";
import { createUserService, listUserService } from "./user.service";

const initialState: UserSliceInterface = {
    limit: 0, page: 0, total: 0,
    users: [],
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addAsyncThunk(createUserService, {
            fulfilled(state, action) { },
            pending(state, action) { },
            rejected(state, action) { }
        });

        builder.addAsyncThunk(listUserService, {
            fulfilled(state, action) { },
            pending(state, action) { },
            rejected(state, action) { }
        });
    },
});

export default userSlice.reducer