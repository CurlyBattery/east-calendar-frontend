import {$host} from "./index.ts";
import type {ITask, ITaskUpdateData} from "../types/task.ts";

export const getTasksByProject = async (projectId: string, text?: string) => {
    const url = !!text ? `tasks/my/${projectId}?text=${text}` : `tasks/my/${projectId}`
    const { data } = await $host.get<ITask[]>(url);
    return data;
};

export const getMyTasks = async (text?: string) => {
    const url = !!text ? `tasks/my?text=${text}` : `tasks/my`
    const { data } = await $host.get<ITask[]>(url);
    return data;
};

export const getOneTask = async (id: string) => {
    const { data } = await $host.get<ITask>('tasks/' + id);
    return data;
};

export const createTask = async (
    title: string,
    description: string,
    start: string,
    end: string,
    priority: string,
    projectId: string,
    assigneeId: string,
) => {
    const request = assigneeId !== '' ? {
        title,
        description,
        start,
        end,
        priority,
        projectId,
        assigneeId
    } : {
        title,
        description,
        start,
        end,
        priority,
        projectId,
    };
    const { data } =  await $host.post<ITask>('tasks', request)
    return data;
};

export const updateTask = async (
    taskId: string,
    taskUpdateData: ITaskUpdateData
) => {
    console.log(taskUpdateData)
    const { data } =  await $host.patch<ITask>(`tasks/${taskId}`, taskUpdateData)
    return data;
};
