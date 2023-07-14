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

export interface UserProductCreate {
    userProductGUID?: string,
    userGUID: string,
    price: number,
    quantity: number,
    productGUID: string
}