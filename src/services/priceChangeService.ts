import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { PriceChange, PriceChangeCreate } from "../models/PriceChange";
import {Response as IResponse} from "../models/Response" 


export default class PriceChangeService extends BaseService<PriceChange>  {
    async CreatePriceChange(priceChanceCreate: PriceChangeCreate): Promise<IResponse<PriceChangeCreate>> {
        return APIHelper.request(`${this._endpoint}`, 'POST', priceChanceCreate);
    };
}