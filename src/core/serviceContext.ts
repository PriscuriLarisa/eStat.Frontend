import React from "react";
import ProductsService from "../services/productService";
import UserProductsService from "../services/userProductService";
import UserService from "../services/userService";
import ShoppingCartService from "../services/shoppingCartService";
import ShoppingCartProductsService from "../services/shoppingCartProductsService";
import PurchaseService from "../services/purchaseService";
import AuthenticationService from "../services/authenticationService";
import SearchService from "../services/searchService";
import NotificationService from "../services/notificationsServices";
import PriceChangeService from "../services/priceChangeService";
import PricePredictionService from "../services/priceRecommendationService";

export class ServiceContext {
    private _productsService?: ProductsService;
    private _userProductsService?: UserProductsService;
    private _userService?: UserService;
    private _shoppingCartService?: ShoppingCartService;
    private _shoppingCartProductsService?: ShoppingCartProductsService;
    private _purchasesService? : PurchaseService;
    private _authenticationService? : AuthenticationService;
    private _searchService? : SearchService;
    private _notificiationService? : NotificationService;
    private _priceChangeService? : PriceChangeService;
    private _pricePredictionService? : PricePredictionService;

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

    get AuthenticationService(): AuthenticationService {
        if (this._authenticationService == null) {
            this._authenticationService = new AuthenticationService('Authentication');
        }
        return this._authenticationService;
    };

    get SearchService(): SearchService {
        if (this._searchService == null) {
            this._searchService = new SearchService('Searches');
        }
        return this._searchService;
    };

    get NotificationService(): NotificationService {
        if (this._notificiationService == null) {
            this._notificiationService = new NotificationService('Notifications');
        }
        return this._notificiationService;
    };

    get PriceChangeService(): PriceChangeService {
        if (this._priceChangeService == null) {
            this._priceChangeService = new PriceChangeService('PriceChanges');
        }
        return this._priceChangeService;
    };

    get PricePredictionService(): PricePredictionService {
        if (this._pricePredictionService == null) {
            this._pricePredictionService = new PricePredictionService('PricePredictions');
        }
        return this._pricePredictionService;
    };
};

export const ServiceContextInstance = React.createContext(new ServiceContext());