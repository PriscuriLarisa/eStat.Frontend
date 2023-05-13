import { PurchaseProduct } from "./PurchaseProduct";
import { UserDisplayInfo } from "./User";

export interface Purchase {
    purchaseGUID?: string,
    userGuid: string,
    user: UserDisplayInfo,
    date: Date,
    products: PurchaseProduct[],
};
