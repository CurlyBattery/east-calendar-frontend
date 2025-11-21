import type {IUser} from "./user.ts";

export interface IProject {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt?: Date;
    owner?: IUser;
}


