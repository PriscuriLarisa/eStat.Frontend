import { IButtonStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../../library/constants";
import { ITextFieldStyles } from "@fluentui/react";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '30%',
    backgroundColor: '#fdfdfd',
    // backgroundColor:'red',
    boxSizing: 'border-box',
    borderBottom: `2px solid ${BORDER_COLOR}`,
    margin: 'auto',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    display: 'flex',
});

export const pictureContainer = mergeStyles({
    height: '90%',
    width: '25%'
});

export const infoContainer = mergeStyles({
    height: 'c',
    width: '75%',
    margin: '2%',
    boxSizing: 'border-box',
});


export const labelClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    fontWeight: '100'
});

export const quantityLabel = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    textAlign: 'right'
});

export const priceLabel = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '16px',
});

export const priceClassName = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '16px',
    marginLeft: '1%',
    color: '#472183'
});

export const priceStyles: Partial<ITextFieldStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        width: '14%',
        backgroundColor: 'transparent'
    },
    wrapper: {
        backgroundColor: 'transparent',
    },
    fieldGroup: {
        backgroundColor: 'transparent',
        borderBottom: `2px solid ${BORDER_COLOR}`,
        selectors: {
            "::after" : {
                borderBottom: `2px solid #4B56D2`
            }
        }
    },
    field: {
        backgroundColor: 'transparent',
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        fontWeight: '600',
    },
};

export const titleContainer = mergeStyles({
    display: 'flex'
});

export const quantityDivClassname = mergeStyles({
    display: 'flex'
});

export const buttonStyles:Partial<IButtonStyles> = {
    root: {
        height: '10%',
        width: '15%',
        color: "#fdfdfd",
        position: 'relative',
        marginTop: '2.5%',
        backgroundColor: '#4B56D2',
        padding: '1% 0%',
        border: 'none',
        borderRadius: '3px',
        fontFamily: FONT_FAMILY,
        margin: '2% 0% 0% 4%'
    },
    icon: {
        color: "#4B56D2",
        fontSize: '20px'
    },
    rootHovered: {
        backgroundColor: '#472183',
        color: "#fdfdfd",
    }
};

export const plusMinusButtonStyles:Partial<IButtonStyles> = {
    root: {
        height: 'fit-content',
        width: 'fit-content',
        color: "#fdfdfd",
        position: 'relative',
        backgroundColor: 'transparent',
        padding: '1% 0%',
        border: 'none',
        borderRadius: '3px',
        fontFamily: FONT_FAMILY,
        margin: '0% 1%',
        marginTop: '0.25%',
    },
    icon: {
        color: "#4B56D2",
        fontSize: '15px',
        fontWeight: '900'
    },
    rootHovered: {
        backgroundColor: 'transparent'
    }
};

export const imageClassName = mergeStyles({
    backgroundColor: '#fdfdfd',
    top: '5%',
    marginTop: '6%',
    maxHeight: '90%',
    maxWidth: '90%',
    minHeight: '90%',
    minWidth: '90%',
    display: 'flex'
});
