import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { Purchase } from "../models/Purchase";
import {Response as IResponse} from "../models/Response" 


export default class PurchaseService extends BaseService<Purchase>  {
    async PurchaseItems(shoppingCartGuid: string): Promise<IResponse<Purchase>> {
        return APIHelper.request(`${this._endpoint}/addPurchase/${shoppingCartGuid}`, 'POST');
    };

    async GetPurchases(userUid: string): Promise<IResponse<Purchase[]>> {
        return APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET');
    }
}