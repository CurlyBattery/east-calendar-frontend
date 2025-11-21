import { userSlice } from "./user.slice.ts";
import type {AppDispatch} from "../../store.ts";
import {getUsers} from "../../../http/user.api.ts";

export const fetchUsersAcrion = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching());
        const data = await getUsers();
        dispatch(userSlice.actions.usersFetchingSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(userSlice.actions.usersFetchingError(e.message));
    }
}
