import { UserInfo } from "../models/User";

export interface AuthentificationContextModel  {
    User: UserInfo,
    SetUpdatedUser: (newUser: UserInfo) => void,
};