import { Notification } from "../models/Notification";
import { UserInfo } from "../models/User";

export interface AuthentificationContextModel  {
    User: UserInfo,
    SetUpdatedUser: (newUser: UserInfo) => void,
    UserIsLoading: boolean,
    Notifications: Notification[],
    ReadAllNotifications: () => void,
    FireRefreshNotification: () => void
};