import BaseService from "../core/baseService";
import { User, UserDisplayInfo } from "../models/User";

export default class UserService extends BaseService<User>  {
    async GetUserDisplayInfo(userId: string): Promise<UserDisplayInfo> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/${userId}`).then(response => { return response.json(); });
    }
}