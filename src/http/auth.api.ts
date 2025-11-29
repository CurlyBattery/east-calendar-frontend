import {$host} from "./index.ts";
import type {IDevice, QrStatus} from "../types/user.ts";

export const register = async (
    email: string,
    password: string,
    name: string,
    file: File
) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    if(file) {
        formData.append('file', file);
    }

    const { data } = await $host.post('auth/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
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
};

export const me = async () => {
    const { data } = await $host.get('auth');
    return data;
};

export const refresh = async () => {
    const { data } = await $host.post('auth/refresh', {});
    return data;
};

export const getQr = async () => {
    const response = await $host.get('auth/qr', { responseType: 'blob' });

    const token = response.headers['x-qr-session-token'];
    console.log(token)

    return {
        qrCode: response.data,
        token
    };
};

export const checkStatusQr = async (token: string) => {
    const {data} = await $host.get(`auth/qr/check?token=${token}`);

    return data;
};

export const qrConfirm = async (sessionId: string, status: QrStatus) => {
    console.log(sessionId, status)
    const {data} = await $host.post(`auth/qr/confirm`, {
            sessionId,
            status
    });

    return data;
};

export const getAllDevices = async () => {
    const { data } = await $host.get<IDevice[]>('auth/devices');
    return data;
};
