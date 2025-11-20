export interface IUser {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    plan?: PlanUser;
    role: RoleUser;
    createdAt?: Date;
}

// @ts-ignore
export enum PlanUser {
    FREE,
    PRO
}

// @ts-ignore
export enum RoleUser {
    USER,
    ADMIN
}