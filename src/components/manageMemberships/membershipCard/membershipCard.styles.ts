import { IButtonStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '50%',
    alignItems: 'center',
});

export const contentContainerClassname = mergeStyles({
    width: '100%',
    height: '83%',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '3% 10%',
    borderLeft: `1px solid ${BORDER_COLOR}`,
    borderRight: `1px solid ${BORDER_COLOR}`,
    textAlign: 'center',
    position: 'relative'
});

export const textClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    padding: '0px',
    margin: '2%'
});

export const priceLabelClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    fontWeight: '100',
    fontStyle: 'italic',
    position: 'absolute',
    left: '50%',
    bottom: '28%',
    paddingTop: '5%',
    borderTop: `2px solid ${BORDER_COLOR}`,
    width: '90%',
    boxSizing: 'border-box',
    transform: 'translate(-50%, 10%)',
});

export const priceClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '28px',
    color: '#4B56D2',
    position: 'absolute',
    left: '50%',
    bottom: '12%',
    transform: 'translate(-50%, -50%)',
});

export const titleClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: '#4B56D2',
    textDecoration: 'underline',
    fontSize: '26px',
    marginBottom: '7%'
});


export const buttonStyles: Partial<IButtonStyles> = {

    root: {
        width: '22%',
        padding: '3.5% 2%',
        fontSize: '16px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '0.7s',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
        transition: '0.7s',
        color: 'white',
        border: 'none',
        textDecoration: 'underline'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    },
    textContainer: {
        textDecoration: 'underlined'
    }
};

export const secondaryButtonStyles: Partial<IButtonStyles> = {

    root: {
        width: '22%',
        padding: '3.5% 2%',
        fontSize: '16px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '0.7s',
        borderRadius: '4px',
        //backgroundColor: 'transparent',
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#53525c',
        backgroundImage: 'linear-gradient(90deg, rgba(81,88,172,0.364670868347339) 0%, rgba(106,75,154,0.39548319327731096) 46%, rgba(127,133,196,0.4150910364145658) 100%)',
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(81,88,172,0.364670868347339) 0%, rgba(106,75,154,0.3310574229691877) 46%, rgba(127,133,196,0.3310574229691877) 100%)',
        transition: '0.7s',
        color: '#53525c',
        border: 'none',
        textDecoration: 'underline'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    },
    textContainer: {
        textDecoration: 'underlined',
        color: '#53525c',
    }
};