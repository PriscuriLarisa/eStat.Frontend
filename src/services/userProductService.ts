import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { UserProduct, UserProductCreate } from "../models/UserProduct";
import {Response as IResponse} from "../models/Response" 

export default class UserProductsService extends BaseService<UserProduct>  {
    async GetUserProductsByProduct(productId: string): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/product/${productId}`).then(response => { return response.json(); });
    };

    async GetUserProductsByUser(userId: string): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/user/${userId}`).then(response => { return response.json(); });
    }

    async GetUserProductsByUserInBatches(userId: string, batchNb: number, keyWords: string): Promise<IResponse<UserProduct[]>> {
        return APIHelper.request(`${this._endpoint}/user/${userId}/${batchNb}/${keyWords}`, 'GET');
    }

    async GetByUserProductUid(uid: string): Promise<IResponse<UserProduct | null>> {
        if(!uid)
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/${uid}`, 'GET');
    }

    async GetUserProductAveragePricesLast6Months(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/avg/${uid}`, 'GET');
    }

    async GetMySellsLast6Months(uid: string): Promise<IResponse<number | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/mySellsLast6Months/${uid}`, 'GET');
    }

    async AddNewUserProduct(body: UserProductCreate): Promise<IResponse<UserProductCreate>> {
        return APIHelper.request(`${this._endpoint}`, 'POST', body);
    };
}