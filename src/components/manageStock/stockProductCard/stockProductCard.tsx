import { useContext, useEffect, useState } from "react"
import { TitleCardSmall } from "../../titleCard/titleCardSmall"
import { DefaultButton, IIconProps, Label, TextField } from "office-ui-fabric-react"
import { IconButton } from "@fluentui/react"
import { ServiceContext, ServiceContextInstance } from "../../../core/serviceContext"
import { IStockProductCardProps } from "./stockProductCard.types"
import { pictureContainer, imageClassName, infoContainer, titleContainer, buttonStyles, quantityLabel, priceLabel, mainContainerClassname, quantityDivClassname, plusMinusButtonStyles, priceClassName, priceStyles } from "./stockProductCard.styles"
import { PriceChangeCreate } from "../../../models/PriceChange"

const deleteIconProps: IIconProps = { iconName: "Delete" };
const minusIconProps: IIconProps = { iconName: "Remove" };
const plusIconProps: IIconProps = { iconName: "Add" };

export const StockProductCard = (props: IStockProductCardProps): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [quantity, setQuantity] = useState<number>(props.product.quantity);
    const [oldPrice, setOldPrice] = useState<number>(props.product.price);
    const [price, setPrice] = useState<number>(props.product.price);
    const [displaySaveChanges, setDisplaySaveChanges] = useState<boolean>(false);

    useEffect(() => {
        setPrice(props.product.price);
        setOldPrice(props.product.price);
        setQuantity(props.product.quantity);
    }, [props.product]);

    const onPlusButtonClicked = (): void => {
        setDisplaySaveChanges(true);
        setQuantity(quantity + 1);
    };

    const onMinusButtonClicked = (): void => {
        setDisplaySaveChanges(true);
        setQuantity(quantity - 1);
    };

    const onPriceChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setPrice(Number(newValue));
        setDisplaySaveChanges(true);
    };

    const onSaveButtonClicked = (): void => {
        props.product.quantity = quantity;
        props.product.price = price;
        services.UserProductService.Update(props.product);
        if(price !== oldPrice) {
            var priceChange: PriceChangeCreate = {
                userProductGUID: props.product.userProductGUID!,
                productGUID: props.product.product.productGUID!,
                fromPrice: oldPrice,
                toPrice: price
            };
    
            setOldPrice(price);
            services.PriceChangeService.CreatePriceChange(priceChange);
        }
        setDisplaySaveChanges(false);
    };

    return (<>
        <div className={mainContainerClassname}>
            <div className={pictureContainer}>
                <img
                    className={imageClassName}
                    src={props.product.product.imageLink}
                />
            </div>
            <div className={infoContainer}>
                <div className={titleContainer}>
                    <div style={{ width: '80%' }}>
                        <TitleCardSmall title={props.product.product.name!} />
                    </div>
                    {displaySaveChanges && <DefaultButton styles={buttonStyles} onClick={onSaveButtonClicked} >Save changes</DefaultButton>}
                </div>
                <div className={quantityDivClassname}>
                    <Label className={quantityLabel}>Quantity: </Label>
                    <IconButton iconProps={minusIconProps} styles={plusMinusButtonStyles} onClick={onMinusButtonClicked} />
                    <Label className={quantityLabel}>{quantity}</Label>
                    <IconButton iconProps={plusIconProps} styles={plusMinusButtonStyles} onClick={onPlusButtonClicked} />
                </div>
                <div className={quantityDivClassname}>
                    <Label className={priceLabel}>Price per item:</Label>
                    <TextField defaultValue={`${Number(props.product.price!).toFixed(2)}`} value={price.toString()} borderless styles={priceStyles} onChange={onPriceChange}/>
                </div>
            </div>
        </div>
    </>)
}