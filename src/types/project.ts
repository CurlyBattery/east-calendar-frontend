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
export enum SubscriptionPlan {
    FREE,
    PRO
}

export interface IMember {
    id: string;
    userId: string;
    role: SubscriptionPlan;
}

