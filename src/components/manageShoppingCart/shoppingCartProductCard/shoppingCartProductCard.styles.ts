import { IButtonStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../../library/constants";
import { IButtonGridStyleProps } from "@fluentui/react";

export const mainContainerClassname = mergeStyles({
    width: '90%',
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
    fontSize: '16px',
    textAlign: 'right'
});

export const priceLabel = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    textAlign: 'right'
});

export const titleContainer = mergeStyles({
    display: 'flex'
});

export const buttonStyles:Partial<IButtonStyles> = {
    root: {
        height: 'fit-content',
        width: 'fit-content',
        color: "#4B56D2",
        position: 'relative',
        top: '15%',
        left: '2%',
        marginTop: '2.5%',
        backgroundColor: 'transparent'
    },
    icon: {
        color: "#4B56D2",
        fontSize: '20px'
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
