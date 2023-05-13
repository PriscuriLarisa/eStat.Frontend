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

    async GetSearchedProductsByPage(pageNumber: number, sortingCriteria: SortingCriterias, keywords: string): Promise<IResponse<Product[]>> {
        return APIHelper.request(`${this._endpoint}/page/${pageNumber}/${PRODUCTS_PER_PAGE}/${sortingCriteria}/search/${keywords}`, 'GET');
    }

    async GetNumberOfProductsBySearch(keywords: string): Promise<IResponse<number>> {
        keywords = keywords !== "" ? keywords : 'customSearchTag';
        return APIHelper.request(`${this._endpoint}/search/${keywords}`, 'GET');
    }
}