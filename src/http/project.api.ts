import {$host} from "./index.ts";
import { type IProject} from "../types/project.ts";

export const getMyProjects = async (text?: string) => {
    const url = !!text ? `projects?text=${text}` : 'projects'
    const { data } = await $host.get<IProject[]>(url);
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

