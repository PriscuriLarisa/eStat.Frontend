import { INavStyles, mergeStyles } from "@fluentui/react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";

export const navStyles: Partial<INavStyles> = {
    root: {
        width: '4.5vw',
        height: "100vh",
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto',
        fontSize: '10px',
        fontFamily: FONT_FAMILY,
        transition: '0.5s',
        backgroundColor: '#fdfdfd',
        zIndex: '10',
        selectors: {
            ':hover': {
                width: '13vw',
                transition: '0.5s',
                selectors: {
                    ".ms-Nav-chevronButton": {
                        color: "#82C3EC",
                        transition: '0.5s',
                        height: '6vh',
                        pointerEvents: 'none',
                    },
                }
            },
            ".ms-Icon": {
                fontSize: '2vw',
                margin: '1vw',
                color: "#4B56D2",
            },
            ".ms-Nav-chevron": {
                color: 'transparent',
                marginLeft: '20px',
                textAlign: 'right',
                transition: '0.5s',
            },
            ".ms-Nav-chevronButton": {
                transition: '0.5s',
            },
            '::-webkit-scrollbar': {
                width: '6px',
            },
            '::-webkit-scrollbar-track': {
                background: 'transparent'
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: `${BORDER_COLOR}`,
                borderRadius: '5px',
            },
            '.ms-DetailsRow-cell': {
                fontFamily: FONT_FAMILY,
            },
        }
    },
    navItems: {
        fontSize: '30px',
        fontFamily: FONT_FAMILY,
        transition: '0.5s',
        color: "#4B56D2",
    },
    linkText: {
        fontSize: '17px',
        fontFamily: FONT_FAMILY,
        color: "#4B56D2",
        transition: '0.5s'
    },
    chevronButton: {
        fontFamily: FONT_FAMILY,
        color: 'transparent',
        transition: '0.5s',
        height: '0px'
    },
};

export const logoImageClassName: string = mergeStyles({
    width: '4vw',
    height: '7vh',
    top: '1vh',
    left: '0.25vw',
    position: 'absolute',
    opacity: 0.8,
    zIndex: -8
});

