import { IIconProps, IconButton, Label, Panel } from "@fluentui/react"
import { buttonContainerClassname, buttonStyles, imageClassName, mainContainerClassname, productContainerClassname, nameClassname, priceContainerClassname, nameContainerClassName, labelStyles, panelStyles } from "./productCard.styles"
import { IProductCardProps } from "./productCard.types"
import { useEffect, useState } from "react";
import { PanelType } from "office-ui-fabric-react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { PRODUCT_PAGE_PATH } from "../../library/constants";
import { getFormattedJSON } from "../../helpers/stringFormatHelper";
import { ConfirmationMessageBar } from "../confirmationMessageBar/confirmationMessageBar";

const infoIconProps: IIconProps = { iconName: "Info" };

export const ProductCard = (props: IProductCardProps): JSX.Element => {
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
    const [characteristics, setCharacteristics] = useState<object | undefined>();
    const [characteristicsAsString, setCharacteristicsAsString] = useState<string>("");
    const navigate: NavigateFunction = useNavigate();

    const onInfoButtonClick = (): void => {
        setIsPanelOpen(true);
    }
    const dismissPanel = (): void => {
        setIsPanelOpen(false);
    }

    useEffect(() => {
        setFormattedCharacteristics();
    }, []);

    useEffect(() => {
        var s: string | undefined = "";
        s = formatJSONAsString(characteristics, s, 0);        
    }, [characteristics])

    const setFormattedCharacteristics = (): void => {
        setCharacteristics(getFormattedJSON(props.product.characteristics));
    };

    const formatJSONAsString = (obj: object | undefined, s: string, tabs: number): string | undefined => {
        if(obj === undefined) return "";
        for (const [key, value] of Object.entries(obj)) {
            s += '\n';
            for(var i = 0; i < tabs; i++)
                s += "  ";
            
            s += `${key}: `;
            if(value instanceof String || typeof value !== 'object')
            {
                s += `${value}`;
                s += "\n";
            }
            else
            {
                return s += formatJSONAsString(value, s, tabs+1);
            }
        }
        return s;
    };

    const onLabelClick = (): void => {
        navigate(`${PRODUCT_PAGE_PATH}/${props.product.productGUID}`, );
    }

    return (
        <div className={mainContainerClassname}>
            <div className={productContainerClassname} onClick={onLabelClick}>
                <img
                    className={imageClassName}
                    src={props.product.imageLink}
                />
                <Label styles={labelStyles}>{props.product.name}</Label>
                <Label className={priceContainerClassname}>{props.product.basePrice}$</Label>
            </div>
            <div className={buttonContainerClassname}>
                <IconButton iconProps={infoIconProps} styles={buttonStyles} onClick={onInfoButtonClick} />
            </div>
            <Panel
                styles = {panelStyles}
                headerText="Characteristics"
                isOpen={isPanelOpen}
                onDismiss={dismissPanel}
                closeButtonAriaLabel="Close"
                type={PanelType.custom}
                customWidth="650px"
            >
                <div>
                    <Label className={nameClassname}><pre>{JSON.stringify(characteristics, null, 4)}</pre></Label>
                </div>
            </Panel>
        </div>
    )
}