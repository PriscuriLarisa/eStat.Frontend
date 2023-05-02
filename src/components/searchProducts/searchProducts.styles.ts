import { ITextFieldStyles, mergeStyles } from "@fluentui/react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '99%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: '5px'
});

export const searchContainerClassname = mergeStyles({
    width: '100%',
    height: '15%',
    backgroundColor: '#fdfdfd',
    borderBottom: `2px solid ${BORDER_COLOR}`,
    alignItems: 'center',
});

export const textClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: '#8287c2',
    fontSize: '20px',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '100',
    margin: '0.2%'
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
        margin: 'auto'
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

export const contentContainerClassname = mergeStyles({
    width: '100%',
    height: '82%',
    backgroundColor: '#fdfdfd',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridTemplateRows: '50% 50%'
});

