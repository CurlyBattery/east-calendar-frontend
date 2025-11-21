import type {IUser} from "./user.ts";
import type {IMember} from "./member.ts";

export interface IProject {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt?: Date;
    owner?: IUser;
    projectMembers?: IMember[]
}


