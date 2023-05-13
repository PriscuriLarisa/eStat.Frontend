import BaseService from "../core/baseService";
import { User, UserDisplayInfo, UserInfo } from "../models/User";
import {Response as IResponse} from "../models/Response" 
import { APIHelper } from "../helpers/apiHelper";

export default class UserService extends BaseService<User>  {
    async GetUserDisplayInfo(userId: string): Promise<UserDisplayInfo> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/${userId}`).then(response => { return response.json(); });
    };

    async GetUserInfo(userId: string): Promise<UserInfo> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/userInfo/${userId}`).then(response => { return response.json(); });
    };

    async UpdateUserInfo(body: UserInfo): Promise<IResponse<UserInfo>> {
        //return fetch(`https://localhost:7145/api/${this._endpoint}/userInfo`).then(response => { return response.json(); });
        return APIHelper.request(`${this._endpoint}/userInfo`, 'PUT', body);
    };
}