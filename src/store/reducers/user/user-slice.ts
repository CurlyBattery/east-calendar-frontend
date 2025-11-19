import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

import type {IUser} from "../../../types/user.ts";

interface UserSlice {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserSlice = {
    users: [],
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersFetching: (state) => {
            state.isLoading = true;
        },
        usersFetchingSuccess: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
        usersFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})

export default userSlice.reducer;