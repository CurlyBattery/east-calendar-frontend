export interface IUser {
    id: string;
    name: string;
    email: string;
    avatarPath?: string;
    plan?: IPlan;
    role: RoleUser;
    createdAt?: Date;
}

export interface IPlan {
    id: string;
    userId: string;
    subscriptionPlan: PlanUser;
    isExpired?: Date;
}

export interface IQRSession {
    id: string;
    token: string;
    userId?: string;
    userAgent: PlanUser;
    expired?: Date;
    status: QrStatus
}

export enum PlanUser {
    FREE = 'FREE',
    PRO = 'PRO'
}

export enum RoleUser {
    USER,
    ADMIN
}

export enum QrStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    REJECT = 'REJECT'
}
