import { Product } from "./Product";
import { UserProduct } from "./UserProduct";

export interface PriceChangeCreate {
    userProductGUID: string;
    productGUID: string;
    fromPrice: number;
    toPrice: number;
};

export interface PriceChange {
    priceChangeGUID: string,
    userProductGUID: string;
    productGUID: string;
    fromPrice: number;
    toPrice: number;
    date: Date,
    product: Product,
    userProduct: UserProduct
}