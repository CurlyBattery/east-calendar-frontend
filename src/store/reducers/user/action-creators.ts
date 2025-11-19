import axios from "axios";

import { userSlice } from "./user-slice.ts";
import type {AppDispatch} from "../../store.ts";
import type {IUser} from "../../../types/user.ts";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching());
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
        dispatch(userSlice.actions.usersFetchingSuccess(response.data));
    } catch (e) {
        // @ts-ignore
        dispatch(userSlice.actions.usersFetchingError(e.message));
    }
}
