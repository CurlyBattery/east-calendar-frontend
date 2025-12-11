import type {AppDispatch} from "../../store.ts";
import {authSlice} from "./auth.slice.ts";
import {loginned, logouted, me, register} from "../../../http/auth.api.ts";
import {checkPayment} from "../../../http/payment.api.ts";
import {deleteUser} from "../../../http/user.api.ts";

export const registerAction = (
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    file: File
) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginStart());
        const data = await register(email, password, confirmPassword, name, file)
        dispatch(authSlice.actions.loginSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(authSlice.actions.loginError(e?.response?.data?.errors?.map(e => e.message).join(', ')) || '');
    }
}

export const loginAction = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginStart());
        console.log(email, password)
        const data = await loginned(email, password);
        dispatch(authSlice.actions.loginSuccess(data));
    } catch (e) {
        // @ts-ignore
        dispatch(authSlice.actions.loginError(e?.response?.data?.errors?.map(e => e.message).join(', ')) || '');
    }
};

export const meAction = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginStart());
        const data = await me();
        dispatch(authSlice.actions.setUser(data));
    } catch (e) {
        dispatch(authSlice.actions.logout())
    }
}

export const logoutAction = () => async (dispatch: AppDispatch) => {
    try {
        await logouted();
        dispatch(authSlice.actions.logout());
    } catch (e) {
        // @ts-ignore
        console.log(e.message)
    }
};

export const deleteLogoutAction = () => async (dispatch: AppDispatch) => {
    try {
        await deleteUser();
        dispatch(authSlice.actions.logout());
    } catch (e) {
        // @ts-ignore
        console.log(e.message)
    }
};

export const checkPayloadAction = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.loginStart());
        const data = await checkPayment();
        if(data.status === 'succeeded') {
            dispatch(authSlice.actions.setUser(data.user));
        }
    } catch (e) {
        // @ts-ignore
        dispatch(authSlice.actions.loginError(e.message));
    }
};
