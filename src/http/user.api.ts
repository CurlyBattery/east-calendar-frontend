import {$host} from "./index.ts";
import type {IUser} from "../types/user.ts";

export const getUsers = async () => {
    const { data } = await $host.get<IUser[]>('users');
    return data;
};