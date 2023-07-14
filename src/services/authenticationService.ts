import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { AuthenticatedUser } from "../models/AuthenticatedUser";
import {Response as IResponse} from "../models/Response" 
import { UserInfo, UserLogin } from "../models/User";

export default class AuthenticationService extends BaseService<AuthenticatedUser>  {
    async Login(user: UserLogin): Promise<IResponse<UserLogin>> {
        return APIHelper.request(`${this._endpoint}/login`, 'POST', user);
    };

    async Logout(): Promise<IResponse<string>> {
        return APIHelper.request(`${this._endpoint}/logout`, 'POST');
    };

    async GetAuthenticatedUser(): Promise<IResponse<UserInfo>> {
        return APIHelper.request(`${this._endpoint}/authenticatedUser`, 'GET');
    };
}