import type {IMember} from "../../../types/member.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface MemberSlice {
    members: IMember[];
    isLoading: boolean;
    error: string
}

const initialState: MemberSlice = {
    members: [],
    isLoading: false,
    error: ''
};

export const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        membersFetching: (state) => {
            state.isLoading = true;
        },
        membersFetchingSuccess: (state, action: PayloadAction<IMember[]>) => {
            state.isLoading = false;
            state.error = '';
            state.members = action.payload;
        },
        membersFetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addMemberStart: (state) => {
            state.isLoading = true;
        },
        addMemberSuccess: (state, action: PayloadAction<IMember>) => {
            state.isLoading = false;
            state.error = '';
            state.members.push(action.payload)
        },
        addMemberError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default memberSlice.reducer;