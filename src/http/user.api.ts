import {$host} from "./index.ts";
import type {IUser, UpdateUserDto} from "../types/user.ts";

export const getUsers = async () => {
    const { data } = await $host.get<IUser[]>('users');
    return data;
};

export const updateUser = async (updateUserDto: UpdateUserDto) => {
    const { data } = await $host.patch('users', updateUserDto);
    return data;
};

export const deleteUser = async () => {
    const { data } = await $host.delete('users');
    return data;
};