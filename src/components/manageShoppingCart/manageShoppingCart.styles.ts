import { IButtonStyles, mergeStyles } from "office-ui-fabric-react";
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
    paddingBottom: '10%'
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
        marginTop: '10%',
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

export const productsDivContainerClassname = mergeStyles({
    width: '100%',
    height: '90%',
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
    height: '45%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '1%',
    paddingLeft: '2%'
});