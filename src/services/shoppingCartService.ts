import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { ShoppingCart } from "../models/ShoppingCart";
import {Response as IResponse} from "../models/Response" 
import { ShoppingCartProductAdd } from "../models/ShoppingCartProduct";

export default class ShoppingCartService extends BaseService<ShoppingCart>  {
    async GetShoppingCartByUser(userUid: string): Promise<IResponse<ShoppingCart>> {
        return APIHelper.request(`${this._endpoint}/user/${userUid}`, 'GET');
    };

    async AddUserProductToCart(body: ShoppingCartProductAdd): Promise<IResponse<ShoppingCartProductAdd>> {
        return APIHelper.request(`${this._endpoint}/addItemToCart`, 'PUT', body);
    };
}