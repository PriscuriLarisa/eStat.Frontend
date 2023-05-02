import { IButtonStyles, mergeStyles } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '5%',
    backgroundColor: '#fdfdfd',
    textAlign: 'center',
    marginTop: '5px'
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: "#4B56D2",
        height: '100%',
        widt: 'auto',
    },
    rootHovered: {
        backgroundColor: 'transparent'
    },
    icon: {
        fontSize: '15px',
        fontWeight: '100'
    },
    rootDisabled: {
        backgroundColor: 'transparent'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};

export const labelClassName = mergeStyles({
    width: 'auto',
    height: '100%',
    backgroundColor: '#fdfdfd',
    textAlign: 'center',
    fontSize: '20px',
    fontFamily: FONT_FAMILY,
    color: "#4B56D2",
    margin: '0.6%',
    fontWeight: '600'
});
