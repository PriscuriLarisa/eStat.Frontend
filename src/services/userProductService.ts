import BaseService from "../core/baseService";
import { UserProduct } from "../models/UserProduct";

export default class UserProductsService extends BaseService<UserProduct>  {
    async GetUserProductsByProduct(productId: string): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/product/${productId}`).then(response => { return response.json(); });
    };

    async GetUserProductsByUser(): Promise<UserProduct[]> {
        return fetch(`https://localhost:7145/api/${this._endpoint}/page`).then(response => { return response.json(); });
    }
}