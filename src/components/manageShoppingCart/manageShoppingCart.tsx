import { useContext, useEffect, useState } from "react";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { useFetch } from "../../hooks/useFetch";
import { IFetchResult } from "../../hooks/useFetch.types";
import { ShoppingCart } from "../../models/ShoppingCart";
import { cellContainer, labelClassname, mainContainerClassname, orderButtonStyles, priceContainerClassname, priceLabel, productsContainerClassname, productsDivContainerClassname, textFieldLargeStyles } from "./manageShoppingCart.styles";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import AuthentificationContext from "../../authentication/authenticationContext";
import { ShoppingCartProductCard } from "./shoppingCartProductCard/shoppingCartProductCard";
import { TitleCard } from "../titleCard/titleCard";
import { DefaultButton, Label, TextField } from "office-ui-fabric-react";
import { TitleCardSmall } from "../titleCard/titleCardSmall";
import { ConfirmationMessageBar } from "../confirmationMessageBar/confirmationMessageBar";
import { TitleCardMedium } from "../titleCard/titleCardMedium";
import { BORDER_COLOR } from "../../library/constants";

export const ManageShoppingCart = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const [shoppingCart, setShoppingcart] = useState<ShoppingCart>();
    const [isShoppingCartLoaded, setIsShoppingCartLoaded] = useState<boolean>(false);
    const shoppingCartData: IFetchResult<ShoppingCart> = useFetch<ShoppingCart>(() => services.ShoppingCartService.GetShoppingCartByUser(authenticationContext.User.userGUID!), [authenticationContext.User.userGUID!]);
    const [displayMessageBar, setDisplayMessageBar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (shoppingCartData.isLoading) {
            return;
        }
        if (shoppingCartData.errors !== '' ||
            shoppingCartData.data === null ||
            shoppingCartData.data?.Error !== undefined ||
            shoppingCartData.data?.Data === undefined) {
            return;
        }
        setShoppingcart(shoppingCartData.data.Data);
        setIsShoppingCartLoaded(true);
    }, [shoppingCartData]);

    const onDeleteButtonClicked = (productGuid: string) => {
        let newShoppingCart = Object.assign({}, shoppingCart!);
        newShoppingCart.products = newShoppingCart?.products.filter(p => p.shoppingCartProductGUID !== productGuid);
        setShoppingcart(newShoppingCart);
        setMessage("Item deleted from shopping cart.");
        setTimeout(() => {
            setDisplayMessageBar(true);
        }, 500);
    }

    const productsInCart: JSX.Element[] = shoppingCart?.products.map(product => {
        return (
            <ShoppingCartProductCard product={product} onDeleteButtonClicked={onDeleteButtonClicked} />
        )
    })!;

    const computeTotalPrice = (): Number => {
        const values = shoppingCart?.products.map(p => (Number(p.userProduct.price) * Number(p.quantity)));
        let result = values!.reduce((a, b) => {
            return a + b;
        });

        return Number(result.toFixed(2));
    };

    const onPurchaseItemsClicked = (): void => {
        if(address === '') {
            setErrorMessage("Addres cannot be left empty.")
            return;
        }
        services.PurchaseService.PurchaseItemsWithAddress(shoppingCart?.shoppingCartGUID!, address);
        setMessage("Items successfully purchased.");
        setTimeout(() => {
            let newShoppingCart = Object.assign({}, shoppingCart!);
            newShoppingCart.products = [];
            setShoppingcart(newShoppingCart);
            setDisplayMessageBar(true);
        }, 500);
    }

    const onMessageClosed = (): void => {
        setDisplayMessageBar(false);
    };

    const onAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setAddress(newValue!);
        if (newValue === '') {
            setErrorMessage("Addres cannot be left empty.")
            return;
        }
        setErrorMessage("");
    };

    return (
        <>
            <div className={mainContainerClassname}>
                <div className={productsContainerClassname}>
                    <TitleCard title="My Cart" />
                    {shoppingCart?.products!.length! == 0 && <TitleCardSmall title="You have no products in the cart" />}
                    {isShoppingCartLoaded && <div className={productsDivContainerClassname}>
                        {isShoppingCartLoaded && productsInCart}
                    </div>
                    }
                </div>
                {isShoppingCartLoaded &&
                    <>
                        {shoppingCart?.products!.length! > 0 &&
                            <div className={priceContainerClassname}>
                                <>
                                    <TitleCard title="Total price" />
                                    <Label className={priceLabel}>{computeTotalPrice().toString()}$</Label>
                                    <div style={{borderBottom: `2px solid ${BORDER_COLOR}`, marginRight: '5%'}}>
                                        <TitleCardMedium title="Order details" />
                                        <div className={cellContainer}>
                                            <Label className={labelClassname}>Address</Label>
                                            <TextField multiline rows={2} value={address} styles={textFieldLargeStyles} onChange={onAddressChange} errorMessage={errorMessage} />
                                        </div>
                                    </div>
                                    <DefaultButton text="Purchase items »" styles={orderButtonStyles} onClick={onPurchaseItemsClicked} />
                                </>
                            </div>
                        }
                    </>}
                <ConfirmationMessageBar message={message} display={displayMessageBar} onMessageClosed={onMessageClosed} />
            </div>
        </>
    );
}