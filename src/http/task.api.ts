import {$host} from "./index.ts";
import type {ITask, ITaskUpdateData} from "../types/task.ts";

export const getMyTasksByProject = async (projectId: string) => {
    const { data } = await $host.get<ITask[]>(`tasks/my/${projectId}`);
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
    const { data } =  await $host.post<ITask>('tasks', {
        title,
        description,
        start,
        end,
        priority,
        projectId,
        assigneeId
    })
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
