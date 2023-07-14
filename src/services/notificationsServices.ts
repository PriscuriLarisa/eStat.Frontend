import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import {Response as IResponse} from "../models/Response" 
import { Notification } from "../models/Notification";

export default class NotificationService extends BaseService<Notification>  {
    async GetByUser(userUid: string): Promise<IResponse<Notification[]>> {
        return APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET');
    };

    async ReadAllNotifications(userUid: string): Promise<IResponse<Notification>> {
        return APIHelper.request(`${this._endpoint}/user/${userUid}/readAll`, 'PUT');
    };
}