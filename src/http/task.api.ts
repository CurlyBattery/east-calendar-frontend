import {$host} from "./index.ts";
import type {ITask} from "../types/task.ts";

export const getMyTasksByProject = async (projectId: string) => {
    const { data } = await $host.get<ITask[]>(`tasks/my/${projectId}`);
    return data;
};

export const createTask = async (
    title: string,
    description: string,
    start: string,
    end: string,
    priority: string,
    projectId: string,
) => {
    const { data } =  await $host.post<ITask>('tasks', {
        title,
        description,
        start,
        end,
        priority,
        projectId
    })
    return data;

}