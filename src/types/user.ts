export interface IUser {
    id: string;
    name: string;
    email: string;
    avatarPath?: string;
    plan?: PlanUser;
    role: RoleUser;
    createdAt?: Date;
}

export enum PlanUser {
    FREE = 'FREE',
    PRO = 'PRO'
}

export enum RoleUser {
    USER,
    ADMIN
}