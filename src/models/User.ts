import { Roles} from "../enums/roles";
import {  Memberships } from "../enums/memberships";

export interface UserInfo {
    userGUID: string,
    firstName: string,
    lastName: string,
    email: string,
    role?: Roles,
    birthday: Date,
    membership: Memberships
}

export interface UserDisplayInfo {
    userGUID?: string,
    firstName: string,
    lastName: string
};

export interface UserCreate {
    email?: string,
    password: string,
    role: Roles
};

export interface UserLogin {
    email: string,
    password: string
};

export interface User {
    userGUID?: string,
    firstName: string,
    lastName: boolean,
    email: string,
    role?: Roles,
    birthday: Date,
    membership: Memberships
}


