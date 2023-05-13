import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { AuthentificationContextModel } from "./authenticationContext.types";
import { ServiceContext, ServiceContextInstance } from "../core/serviceContext";
import { UserInfo } from "../models/User";
import { Roles } from "../enums/roles";
import { Memberships } from "../enums/memberships";

const defaultUser: UserInfo =  {
    userGUID: '00000000-0000-0000-0000-000000000000',
    firstName: 'Richard',
    lastName: 'Gonzalez',
    email: 'Richard.Gonzalez@gmail.com',
    role: Roles.Retailer,
    membership: Memberships.OwnerSecondTier,
    birthday: new Date()
};

const AuthentificationContext: React.Context<AuthentificationContextModel> = createContext<AuthentificationContextModel>({ User: defaultUser, SetUpdatedUser: () => {} });

export const AuthentificationContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [user, setUser] = useState<UserInfo>(defaultUser);
    //const authenticatedUserFetchResult: FetchResult<User> = useFetch(services.AuthentificationService.GetAuthenticatedUser);
    
    const setUpdatedUser = (newUser: UserInfo): void => {
        setUser(newUser);
    };
    
    // useEffect(() => {
    //     if (authenticatedUserFetchResult.errors === "" && !authenticatedUserFetchResult.isLoading && authenticatedUserFetchResult.data?.Data !== undefined) {
    //         setUser(authenticatedUserFetchResult.data.Data);
    //     }
    // }, [authenticatedUserFetchResult])

    return (<AuthentificationContext.Provider value={{ User: user!, SetUpdatedUser: setUpdatedUser}}>{user !== undefined && children}</AuthentificationContext.Provider>);
}

export default AuthentificationContext;