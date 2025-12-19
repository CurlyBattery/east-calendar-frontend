import {$host} from "./index.ts";
import {type IMember, RoleMember} from "../types/member.ts";

export const getMembers = async (projectId: string) => {
    const { data } = await $host.get<IMember[]>(`projects/${projectId}/members`);
    return data;
};

export const addMember = async (projectId: string, userId: string, role: RoleMember) => {
    const { data } = await $host.post<IMember>(`projects/${projectId}/members`, {
        userId,
        role
    });
    return data;
};

export const removeMember = async (projectId: string, memberId: string) => {
    const { data } = await $host.delete<IMember>(`projects/${projectId}/members`, {
        data: {
            memberId
        }
    });
    return data;
};