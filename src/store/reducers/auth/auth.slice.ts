import type {IUser} from "../../../types/user.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean;
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
    isLoading: true,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = null;
            state.isAuth = true;
            state.user = action.payload;
        },
        loginError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoading = false;
            state.error = null;
            state.isAuth = false;
            state.user = null;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = null;
            state.isAuth = true;
            state.user = action.payload;
        }
    }
});

export default authSlice.reducer;