import { APIHelper } from "../helpers/apiHelper";
import { Response } from "../models/Response";

abstract class BaseService<T> {

    constructor(protected readonly _endpoint: string)  {
    }

    async GetAll(): Promise<Response<T[]>> {
        return await APIHelper.request(`${this._endpoint}`, 'GET')
    }

    async GetByUid(uid: string): Promise<Response<T>> {
        return await APIHelper.request(`${this._endpoint}/${uid}`, 'GET')
    }

    async Add(body: T): Promise<Response<T>> {
        return await APIHelper.request(`${this._endpoint}`, 'POST', body)
    }

    async Delete(uid: string): Promise<Response<T>> {
        return await APIHelper.request(`${this._endpoint}/${uid}`, 'DELETE')
    }

    async DeleteByUids(uids: string): Promise<Response<T>> {
        const stringUids = encodeURIComponent(uids);
        return await APIHelper.request(`${this._endpoint}/deleteByUids/${stringUids}`, 'DELETE')
    }

    async Update(body: T): Promise<Response<T>> {
        return await APIHelper.request(`${this._endpoint}`, 'PUT', body)
    }
}

export default BaseService