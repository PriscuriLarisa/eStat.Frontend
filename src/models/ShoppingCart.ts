import { ShoppingCartProduct } from "./ShoppingCartProduct";

export interface ShoppingCart {
    shoppingCartGUID?: string,
    userGUID: string,
    products: ShoppingCartProduct[]
}