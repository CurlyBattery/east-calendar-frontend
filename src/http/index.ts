import axios from "axios";
import {refresh} from "./auth.api.ts";
import {store} from '../store/store.ts';
import {authSlice} from "../store/reducers/auth/auth.slice.ts";


const $host = axios.create({
    baseURL: 'http://79.174.77.240/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedRequestsQueue: ((token: string) => void)[] = [];

$host.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        const currentIsAuth = store.getState().auth.isAuth;

        if(error.response.status === 401 && !originalRequest._isRetry) {
            if(!currentIsAuth) {
                console.info('401, но пользователь уже разлогинен. Прекращаем попытки refresh.')
                return Promise.reject(error);
            }

            if(isRefreshing) {
                return new Promise((resolve) => {
                    failedRequestsQueue.push(() => {
                        resolve($host(originalRequest));
                    });
                });
            }

            originalRequest._isRetry = true;
            isRefreshing = true;

            try {
                const response = await refresh();

                isRefreshing = false;

                failedRequestsQueue.forEach(callback => callback(response));
                failedRequestsQueue = [];

                return $host(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                store.dispatch(authSlice.actions.logout());

                console.error('Refresh token failed, logging out');

                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
)

export { $host };
