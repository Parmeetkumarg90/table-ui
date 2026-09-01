import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateUserPayloadInterface, ListUserPayloadInterface } from "./user.types";

const createUserService = createAsyncThunk("create user thunk", async (payload: CreateUserPayloadInterface, thunkApi) => {
    return
});

const listUserService = createAsyncThunk("list user thunk", async (payload: ListUserPayloadInterface, thunkApi) => {
    return
});

export { createUserService, listUserService }