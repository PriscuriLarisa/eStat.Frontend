import { AuthentificationContextModel } from "../authentication/authenticationContext.types";

export const isUserInfoLoaded = ( authenticationContext: AuthentificationContextModel): boolean => {
    return authenticationContext.User.userGUID !== '00000000-0000-0000-0000-000000000000';
}