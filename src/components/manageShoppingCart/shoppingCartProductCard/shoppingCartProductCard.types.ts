import { ShoppingCartProduct } from "../../../models/ShoppingCartProduct"

export interface IShoppingCartProductCardProps {
    product: ShoppingCartProduct;
    onDeleteButtonClicked: (uid: string) => void;
}