import { UserProduct } from "./UserProduct";

export interface PurchaseProduct {
    PurchaseProductGUID?: string,
    userproductGUID: boolean,
    product: UserProduct,
    purchaseGUID: string,
    quantity: number,
    price: number
};
