import React from "react";
import ProductsService from "../services/productService";
import UserProductsService from "../services/userProductService";
import UserService from "../services/userService";

export class ServiceContext {
    private _productsService?: ProductsService;
    private _userProductsService?: UserProductsService;
    private _userService?: UserService;

    get ProductsService(): ProductsService {
        if (this._productsService == null) {
            this._productsService = new ProductsService('Products');
        }
        return this._productsService;
    };

    get UserProductService(): UserProductsService {
        if (this._userProductsService == null) {
            this._userProductsService = new UserProductsService('UserProducts');
        }
        return this._userProductsService;
    };

    get UserService(): UserService {
        if (this._userService == null) {
            this._userService = new UserService('Users');
        }
        return this._userService;
    };
};

export const ServiceContextInstance = React.createContext(new ServiceContext());