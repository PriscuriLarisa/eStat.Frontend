import { UserProduct } from "./UserProduct";

export interface ShoppingCartProduct {
    shoppingCartProductGUID?: string,
    shoppingCartGUID: string,
    userproductGUID: boolean,
    userProduct: UserProduct,
    quantity: number,
};

export interface ShoppingCartProductAdd {
    shoppingCartGUID: string,
    userProductGUID: string,
    quantity: number
};