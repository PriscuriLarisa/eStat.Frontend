import React from "react";
import ProductsService from "../services/productService";
import UserProductsService from "../services/userProductService";
import UserService from "../services/userService";
import ShoppingCartService from "../services/shoppingCartService";
import ShoppingCartProductsService from "../services/shoppingCartProductsService";
import PurchaseService from "../services/purchaseService";

export class ServiceContext {
    private _productsService?: ProductsService;
    private _userProductsService?: UserProductsService;
    private _userService?: UserService;
    private _shoppingCartService?: ShoppingCartService;
    private _shoppingCartProductsService?: ShoppingCartProductsService;
    private _purchasesService? : PurchaseService;

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

    get ShoppingCartService(): ShoppingCartService {
        if (this._shoppingCartService == null) {
            this._shoppingCartService = new ShoppingCartService('ShoppingCart');
        }
        return this._shoppingCartService;
    };

    get ShoppingCartProductsService(): ShoppingCartProductsService {
        if (this._shoppingCartProductsService == null) {
            this._shoppingCartProductsService = new ShoppingCartProductsService('ShoppingCartProducts');
        }
        return this._shoppingCartProductsService;
    };

    get PurchaseService(): PurchaseService {
        if (this._purchasesService == null) {
            this._purchasesService = new PurchaseService('Purchases');
        }
        return this._purchasesService;
    };
};

export const ServiceContextInstance = React.createContext(new ServiceContext());