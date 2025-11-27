import {$host} from "./index.ts";

export const createPayment = async () => {
    const { data } = await $host.post('payment');
    return data;
};

export const checkPayment = async () => {
    const { data } = await $host.get('payment');
    return data;
};