import {$host} from "./index.ts";

export const register = async (
    email: string,
    password: string,
    name: string,
    avatarUrl: string
) => {
    const { data } = await $host.post('auth/register',
        {
            email,
            password,
            name,
            avatarUrl
        });
    return data;
}

export const loginned = async (email: string, password: string) => {
    const { data } = await $host.post('auth/login',
        {
            email,
            password
        });
    return data;
}

export const logouted = async () => {
    const { data } = await $host.post('auth/logout', {});
    return data;
}

export const me = async () => {
    const { data } = await $host.get('auth');
    return data;
}

export const refresh = async () => {
    const { data } = await $host.post('auth/refresh', {});
    return data;
}