import { IButtonStyles, mergeStyles } from "@fluentui/react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";
import { ILabelStyles, IPanelStyles } from "office-ui-fabric-react";

export const mainContainerClassname = mergeStyles({
    backgroundColor: '#fdfdfd',
    paddingTop: '3%',
    paddingBottom: '8%',
    boxSizing: 'border-box',
    display: 'flex',
    maxHeight: '100%',
    maxWidth: '100%'
});

export const productContainerClassname = mergeStyles({
    backgroundColor: '#fdfdfd',
    height: '100%',
    width: '75%',
    padding: '5% 5%',
    boxSizing: 'border-box',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
    margin: 'auto',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
    selectors: {
        ":hover" : {
            height: '104%',
            width: '85%',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;'
        }
    }
});

export const imageClassName = mergeStyles({
    backgroundColor: '#fdfdfd',
    maxHeight: '55%',
    maxWidth: '100%',
    minHeight: '55%',
    minWidth: '80%',
    margin: 'auto',
    display: 'flex'
});

export const nameContainerClassName = mergeStyles({
    backgroundColor: '#fdfdfd',
    maxWidth: '100%',
    wordWrap: 'break-word'
});

export const buttonContainerClassname = mergeStyles({
    width: '20%',
    height: '100%',
    textAlign: 'center',
});

export const nameClassname = mergeStyles({
    marginTop: '3%',
    fontFamily: FONT_FAMILY,
    color: "#4B56D2",
    fontSize: '15px',
    paddingBottom: 'none',
    overflow: 'hidden',
    wordWrap: 'break-word'
});

export const priceContainerClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: "#4B56D2",
    fontSize: '18px',
    textAlign: 'right',
    marginRight: '5%',
    alignSelf: 'flex-end'
});

export const labelStyles: Partial<ILabelStyles> = {
    root: {
        marginTop: '3%',
        fontFamily: FONT_FAMILY,
        color: "#4B56D2",
        fontSize: '15px',
        paddingBottom: 'none',
        overflow: 'hidden',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        textOverflow: 'ellipsis',
        height: '31%',
        display: 'flex'
    },
    
}

export const buttonStyles: Partial<IButtonStyles> = {
    root: {
        top: '40%',
        color: '#82C3EC',
        fontSize: '20px',
        height: 'auto',
        width: 'auto'
    },
    icon: {
        fontSize: '25px',
    },
    rootHovered: {
        backgroundColor: 'transparent'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    },
};

export const panelStyles: Partial<IPanelStyles> = {
    headerText: {
        fontFamily: FONT_FAMILY,
    }
};
