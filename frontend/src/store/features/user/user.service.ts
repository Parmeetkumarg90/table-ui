import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserPayloadInterface, ListUserPayloadInterface } from "./user.types";
import axios from "axios"

const createUserService = createAsyncThunk("create user thunk", async (payload: CreateUserPayloadInterface, thunkApi) => {
    const userCreateDetail = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, payload);

    if (!userCreateDetail.data?.user) {
        return thunkApi.rejectWithValue(userCreateDetail.data)
    }

    return { user: userCreateDetail.data.user }
});

const listUserService = createAsyncThunk("list user thunk", async (payload: ListUserPayloadInterface, thunkApi) => {
    
    const userListDetail = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        params: payload
    });
    
    if (!userListDetail.data?.users?.length) {
        return thunkApi.rejectWithValue(userListDetail.data)
    }

    return { userDetail: userListDetail.data, payload }
});

export { createUserService, listUserService }