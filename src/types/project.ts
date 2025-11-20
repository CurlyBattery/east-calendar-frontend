import type {IUser} from "./user.ts";

export interface IProject {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt?: Date;
    owner?: IUser;
}

// @ts-ignore
export enum RoleMember {
    OWNER,
    MEMBER,
    VIEWER
}

export interface IMember {
    id: string;
    projectId?: string;
    userId: string;
    role: RoleMember;
}

