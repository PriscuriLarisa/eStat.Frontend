import BaseService from "../core/baseService";
import { APIHelper } from "../helpers/apiHelper";
import { PRODUCTS_PER_PAGE } from "../library/constants";
import { Product } from "../models/Product";
import {Response as IResponse} from "../models/Response" 
import { SortingCriterias } from "../enums/sortingCriterias";

export default class ProductsService extends BaseService<Product>  {
    async GetProductsByPage(pageNumber: number, sortingCriteria: SortingCriterias, category?: string): Promise<Product[]> {
        if(category)
            return fetch(`https://localhost:7145/api/${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/${category}`).then(response => { return response.json(); });

        return fetch(`https://localhost:7145/api/${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/`).then(response => { return response.json(); });
    }

    async GetProductCategories(): Promise<IResponse<string[]>> {
        return APIHelper.request(`${this._endpoint}/categories`, 'GET');
    }

    async GetProductsByPageAPI(pageNumber: number, sortingCriteria: SortingCriterias, category?: string): Promise<IResponse<Product[]>> {
        if(category)
            return APIHelper.request(`${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/${category}`, 'GET');

        return APIHelper.request(`${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/`, 'GET');
    }

    async GetSearchedProductsByPage(pageNumber: number, sortingCriteria: SortingCriterias, keywords: string): Promise<IResponse<Product[]>> {
        return APIHelper.request(`${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/search/${keywords}`, 'GET');
    }

    async GetNumberOfProductsBySearch(keywords: string): Promise<IResponse<number>> {
        keywords = keywords !== "" ? keywords : 'customSearchTag';
        return APIHelper.request(`${this._endpoint}/search/${keywords}`, 'GET');
    }

    async GetAvgPriceLastSixMonths(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/avgPriceLastSixMonths/${uid}`, 'GET');
    }

    async GetLowestPriceLastSixMonths(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/lowestPriceLastSixMonths/${uid}`, 'GET');
    }

    async GetHighestPriceLastSixMonths(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/highestPriceLastSixMonths/${uid}`, 'GET');
    }

    async GetSellsByHighest(uid: string): Promise<IResponse<number | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/sellsForHighest/${uid}`, 'GET');
    }

    async GetSellsByLowest(uid: string): Promise<IResponse<number | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/sellsForLowest/${uid}`, 'GET');
    }

    async GetSellsByAvg(uid: string): Promise<IResponse<number | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/sellsForAvg/${uid}`, 'GET');
    }

    async GetSellsLast6Months(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/sellsLast6Months/${uid}`, 'GET');
    }

    async GetCurrentAveragePrice(uid: string): Promise<IResponse<any | null>> {
        if(!uid || uid === '00000000-0000-0000-0000-000000000000')
            return new Response("", undefined) as IResponse<null>;
        return APIHelper.request(`${this._endpoint}/currentAveragePrice/${uid}`, 'GET');
    }
}