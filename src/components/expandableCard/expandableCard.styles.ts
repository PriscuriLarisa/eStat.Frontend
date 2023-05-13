import { IButtonStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerExpandedClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    backgroundColor: 'transparent',
    height: 'auto',
    width: '80%',
    boxSizing: 'border-box',
    padding: '1px',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '4px',
    marginBottom: '0.5%',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const titleContainerClassname = mergeStyles({
    color: "#53525c",
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    backgroundColor: 'transparent',
    height: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    padding: '1px',
    paddingLeft: '2%',
    //borderRadius: '4px',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
    display: 'flex'
});

export const contentContainerExpandedClassname = mergeStyles({
    wordBreak: 'break-word',
    color: "#53525c",
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    backgroundColor: 'transparent',
    height: '40vh',
    width: '100%',
    boxSizing: 'border-box',
    padding: '1px',
    paddingLeft: '4%',
    paddingRight: '4%',
    transition: '0.5s',
    borderTop: `2px solid ${BORDER_COLOR}`,
    //borderRadius: '4px',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
    overflow: 'scroll',
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

export const contentContainerCollapsedClassname = mergeStyles({
    color: "#53525c",
    wordBreak: 'break-word',
    fontFamily: FONT_FAMILY,
    fontSize: '18px',
    backgroundColor: 'transparent',
    height: '0px',
    width: '100%',
    boxSizing: 'border-box',
    padding: '1px',
    paddingLeft: '2%',
    visibility: 'hidden',
    transition: '0.5s',
    borderTop: `2px solid ${BORDER_COLOR}`,
    //borderRadius: '4px',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
    overflow: 'scroll',
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


export const iconButtonStyles:Partial<IButtonStyles> = {
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
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};