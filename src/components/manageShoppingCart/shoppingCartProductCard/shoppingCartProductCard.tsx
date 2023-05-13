import { useContext, useEffect } from "react"
import { TitleCardSmall } from "../../titleCard/titleCardSmall"
import { buttonStyles, imageClassName, infoContainer, labelClassName, mainContainerClassname, pictureContainer, priceLabel, quantityLabel, titleContainer } from "./shoppingCartProductCard.styles"
import { IShoppingCartProductCardProps } from "./shoppingCartProductCard.types"
import { IIconProps, Label } from "office-ui-fabric-react"
import { IconButton } from "@fluentui/react"
import { ServiceContext, ServiceContextInstance } from "../../../core/serviceContext"

const deleteIconProps: IIconProps = { iconName: "Delete" };

export const ShoppingCartProductCard = (props: IShoppingCartProductCardProps): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);

    const onDeleteButtonClicked = (): void => {
        services.ShoppingCartProductsService.Delete(props.product.shoppingCartProductGUID!);
        props.onDeleteButtonClicked(props.product.shoppingCartProductGUID!);
    };

    return (<>
        <div className={mainContainerClassname}>
            <div className={pictureContainer}>
                <img
                    className={imageClassName}
                    src={props.product.userProduct.product.imageLink}
                />
            </div>
            <div className={infoContainer}>
                <div className={titleContainer}>
                    <TitleCardSmall title={props.product.userProduct.product.name!} />
                    <IconButton iconProps={deleteIconProps} styles={buttonStyles} onClick={onDeleteButtonClicked}/>
                </div>
                <Label className={labelClassName}>Retailer: {props.product.userProduct.user.firstName!} {props.product.userProduct.user.lastName!}</Label>
                <Label className={quantityLabel}>Quantity: {props.product.quantity!}</Label>
                <Label className={priceLabel}>{(Number(props.product.userProduct.price!) * Number(props.product.quantity!)).toFixed(2)}$</Label>
            </div>
        </div>
    </>)
}