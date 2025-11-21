import type {IUser} from "./user.ts";

export enum RoleMember {
    OWNER = 'OWNER',
    MEMBER = 'MEMBER',
    VIEWER = 'VIEWER'
}

export interface IMember {
    id: string;
    projectId?: string;
    userId: string;
    role: RoleMember;
    user?: IUser;
}
