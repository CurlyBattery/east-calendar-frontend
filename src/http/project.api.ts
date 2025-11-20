import {$host} from "./index.ts";
import {type IMember, type IProject, SubscriptionPlan} from "../types/project.ts";

export const getMyProjects = async () => {
    const { data } = await $host.get<IProject[]>('projects');
    return data;
};

export const getOneProject = async (id: string) => {
    const { data } = await $host.get<IProject>('projects/' + id);
    return data;
};

export const createProject = async (name: string, description: string) => {
    const { data } = await $host.post<IProject>('projects', {
        name,
        description,
    });
    return data;
};

export const addMember = async (projectId: string, userId: string, role: SubscriptionPlan) => {
    const { data } = await $host.post<IMember>(`projects/${projectId}/members`, {
        userId,
        role
    });
    return data;
}