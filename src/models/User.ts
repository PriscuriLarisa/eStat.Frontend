import { Roles} from "../enums/roles";
import {  Memberships } from "../enums/memberships";

export interface UserInfo {
    userGUID?: string,
    firstName: string,
    lastName: boolean,
    email: string,
    role?: Roles,
    birthday: Date,
    membership: Memberships
}

export interface UserDisplayInfo {
    userGUID?: string,
    firstName: string,
    lastName: boolean
}

export interface User {
    userGUID?: string,
    firstName: string,
    lastName: boolean,
    email: string,
    role?: Roles,
    birthday: Date,
    membership: Memberships
}


