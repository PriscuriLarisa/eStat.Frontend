import { IButtonStyles, ITextFieldStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '80%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    // backgroundColor:'red',
    boxSizing: 'border-box',
    margin: 'auto',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    //overflowX: 'hidden'
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '30%',
        textAlign: 'center',
        backgroundColor: '#fdfdfd',
        boxSizing: 'border-box',
        padding: '2px',
        borderBottom: '2px solid #4B56D2',
        fontFamily: FONT_FAMILY,
        margin: 'auto',
        marginBottom: '2%'
    },
    icon: {
        color: '#4B56D2',
        fontWeight: '900',
        fontSize: '20px'
    },
    field: {
        fontFamily: FONT_FAMILY,
        fontSize: '17px',
        color: '#472183'
    },
};

export const productsContainerClassname = mergeStyles({
    width: '98%',
    height: '79%',
    //backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //backgroundColor: 'red',
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

export const productsDivContainerClassname = mergeStyles({
    width: '100%',
    height: '90%',
    //backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    //border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    overflowY: 'scroll',
    backgroundColor: 'blue',
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

export const buttonStyles:Partial<IButtonStyles> = {
    root: {
        height: '5%',
        width: '10%',
        color: "#4B56D2",
        position: 'relative',
        marginTop: '1%',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '3px',
        fontFamily: FONT_FAMILY,
        marginLeft: '40%'
    },
    icon: {
        color: "#4B56D2",
        fontSize: '20px'
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: "#4B56D2",
        textDecoration: 'underline'
    }
};