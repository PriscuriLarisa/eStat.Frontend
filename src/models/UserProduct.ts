import { Product } from "./Product";
import { UserDisplayInfo, UserInfo } from "./User";

export interface UserProduct {
    userProductGUID?: string,
    userGUID: string,
    category: string,
    name?: string,
    user: UserDisplayInfo,
    imageLink: string,
    price: number,
    quantity: number,
    product: Product
}