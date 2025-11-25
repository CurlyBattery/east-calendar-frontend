import type {IUser} from "./user.ts";
import type {IProject} from "./project.ts";

export interface ITask {
    id: string;
    title: string;
    description: string;
    projectId: string;
    createdBy: string;
    assigneeId?: string;
    start: Date;
    end: Date;
    status: TaskStatus;
    priority: TaskPriority;
    type: TaskType;
    createdAt?: Date;
    updatedAt?: Date;

    assignee?: IUser;
    creator?: IUser;
    project?: IProject;
}
export type ITaskUpdateData = Partial<Omit<ITask, 'id' | 'projectId' | 'createdAt' | 'creator'>>;
export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    CHECKING = 'CHECKING',
    DONE = 'DONE'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum TaskType {
    PERSONAL = 'PERSONAL',
    TEAM = 'TEAM',
    COMPANY = 'COMPANY'
}