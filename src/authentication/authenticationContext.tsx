import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { AuthentificationContextModel } from "./authenticationContext.types";
import { ServiceContext, ServiceContextInstance } from "../core/serviceContext";
import { UserInfo } from "../models/User";
import { Roles } from "../enums/roles";
import { Memberships } from "../enums/memberships";
import { useFetch } from "../hooks/useFetch";
import { IFetchResult } from "../hooks/useFetch.types";
import { Notification } from "../models/Notification";
import { read } from "fs";

const defaultUser: UserInfo = {
    userGUID: '00000000-0000-0000-0000-000000000000',
    firstName: '',
    lastName: '',
    email: '',
    role: Roles.Purchaser,
    membership: Memberships.NoMembership,
    birthday: new Date()
};

const AuthentificationContext: React.Context<AuthentificationContextModel> = createContext<AuthentificationContextModel>({
    User: defaultUser,
    SetUpdatedUser: () => { },
    UserIsLoading: true,
    Notifications: [],
    ReadAllNotifications: () => { },
    FireRefreshNotification: () => { }
});

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<UserInfo>(defaultUser);
    const [userIsLoading, setUserIsLoading] = useState<boolean>(true);
    const [refreshNotification, setRefreshNotification] = useState<boolean>(true);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const authenticatedUserFetchResult: IFetchResult<UserInfo> = useFetch(() => services.AuthenticationService.GetAuthenticatedUser(), []);
    const notificationsFetchResult: IFetchResult<Notification[]> = useFetch(() => services.NotificationService.GetByUser(user.userGUID), [user.userGUID, refreshNotification.toString()]);

    const setUpdatedUser = (newUser: UserInfo): void => {
        setUser(newUser);
    };

    const fireRefreshNotification = (): void => {
        setRefreshNotification(prev => !prev);
    };

    const readAllNotifications = (): void => {
        var newNotifications = notifications.map(n => ({ ...n, read: true }));
        setNotifications(newNotifications);
    };

    useEffect(() => {
        if (!authenticatedUserFetchResult.isLoading)
            setUserIsLoading(false);
        if (authenticatedUserFetchResult.errors === "" && !authenticatedUserFetchResult.isLoading && authenticatedUserFetchResult.data?.Data !== undefined) {
            setUser(authenticatedUserFetchResult.data.Data);
        }
    }, [authenticatedUserFetchResult])

    useEffect(() => {
        if (user.userGUID === '00000000-0000-0000-0000-000000000000' || userIsLoading)
            return;
        if (!notificationsFetchResult.isLoading)
            setUserIsLoading(false);
        if (notificationsFetchResult.errors === "" && !notificationsFetchResult.isLoading && notificationsFetchResult.data?.Data !== undefined) {
            setNotifications(notificationsFetchResult.data.Data);
        }
    }, [notificationsFetchResult])

    return (<AuthentificationContext.Provider value={{ User: user!, SetUpdatedUser: setUpdatedUser, UserIsLoading: userIsLoading, Notifications: notifications, ReadAllNotifications: readAllNotifications, FireRefreshNotification: fireRefreshNotification }}>{user !== undefined && children}</AuthentificationContext.Provider>);
}

export default AuthentificationContext;