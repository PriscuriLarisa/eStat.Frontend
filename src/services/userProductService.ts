import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { UserProduct } from "../models/UserProduct";
import {Response as IResponse} from "../models/Response" 

export default class UserProductsService extends BaseService<UserProduct>  {
    async GetUserProductsByProduct(productId: string): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/product/${productId}`).then(response => { return response.json(); });
    };

    async GetUserProductsByUser(userId: string): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/user/${userId}`).then(response => { return response.json(); });
    }

    async GetUserProductsByUserInBatches(userId: string, batchNb: number): Promise<IResponse<UserProduct[]>> {
        return APIHelper.request(`${this._endpoint}/user/${userId}/${batchNb}`, 'GET');
    }
}