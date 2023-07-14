import { IButtonStyles, ITextFieldStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '99%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    display: 'flex',
});

export const productsContainerClassname = mergeStyles({
    width: '70%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
});

export const priceLabel = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '36px',
    textAlign: 'right',
    marginRight: '5%',
    color: "#4B56D2",
    borderBottom: `2px solid ${BORDER_COLOR}`,
    paddingBottom: '10%',
    marginBottom: '5%'
});

export const orderButtonStyles: Partial<IButtonStyles> = {

    root: {
        fontSize: '20px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '0.7s',
        borderRadius: '5px',
        left: '10%',
        padding: '20px 20px',
        width: '60%',
        position: 'relative',
        marginLeft: '7%',
        marginTop: '8%',
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
        transition: '0.7s',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};

export const cellContainer = mergeStyles({
    width: '95%',
    padding: '3% 5%', 
    boxSizing: 'border-box',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const labelClassname = mergeStyles({
    fontFamily: FONT_FAMILY
});

export const textFieldLargeStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '100%',
    },
    fieldGroup: {
        border: 'none',
        backgroundColor: 'transparent',
        borderBottom: `2px solid ${BORDER_COLOR}`,
        "::after": {
            border: 'none',
            borderBottom: `2px solid #4B56D2`
        },
        ":hover": {
            border: 'none',
            borderBottom: `1px solid #4B56D2`
        },
    }
};

export const productsDivContainerClassname = mergeStyles({
    width: '100%',
    height: '83%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    overflowY: 'scroll',
    selectors: {
        '::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
        },

        '::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: `${BORDER_COLOR}`,
            borderRadius: '5px',
        }
    }
});

export const priceContainerClassname = mergeStyles({
    width: '30%',
    height: '65%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '1%',
    paddingLeft: '2%'
});