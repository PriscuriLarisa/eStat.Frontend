import { IButtonStyles, ITextFieldStyles, merge, mergeStyles } from "@fluentui/react";
import { BACKGROUND_COLOR, FONT_FAMILY, PRIMARY_COLOR_BLUE, PRIMARY_COLOR_GREY, PRIMARY_COLOR_WHITE, PRIMARY_COLOR_YELLOW, TEXT_PRIMARY_COLOR } from "../../library/constants";

export const backgroundContainerClassName: string = mergeStyles({
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -10
});

export const loginContainerClassName: string = mergeStyles({
    backgroundColor: BACKGROUND_COLOR,
    height: '100%',
    width: "70%",
    margin: "auto",
    position: 'absolute',
    zIndex: -9
});

export const registerContainerClassName: string = mergeStyles({
    backgroundColor: PRIMARY_COLOR_YELLOW,
    backgroundImage: `linear-gradient(300deg, rgba(71,33,131,1) 0%, rgba(134,105,180,1) 37%, rgba(111,120,212,1) 64%, rgba(75,86,210,1) 100%)`,
    height: '100%',
    width: "30%",
    margin: "auto",
    position: 'absolute',
    left: "70%"
});

export const backgroundImageClassName: string = mergeStyles({
    width: '80%',
    height: '90%',
    top: '35%',
    position: 'absolute',
    opacity: 0.6,
    zIndex: -8
});

export const logoImageClassName: string = mergeStyles({
    width: '11%',
    height: '13%',
    top: '2%',
    left: '2%',
    position: 'absolute',
    opacity: 0.8,
    zIndex: -8
});

export const errorClassName: string = mergeStyles({
    color: 'red',
    fontFamily: FONT_FAMILY,
    position: "relative",
    left: '30%'
});

export const titleClassName: string = mergeStyles({
    color: TEXT_PRIMARY_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: "38px",
    position: "relative",
    left: '35%',
    top: '10%',
    paddingBottom: "30%",
});

export const fieldsContainerClassName: string = mergeStyles({
    width: '30%',
    height: '60%',
    position: 'absolute',
    top: "10%",
    left: "35%"
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        width: "90%",
        margin: "auto",
        fontFamily: FONT_FAMILY,
        fontSize: "20px",
        color: TEXT_PRIMARY_COLOR,
        position: "relative",
        paddingBottom: "15%",
        backgroundColor: 'transparent',
    },
    fieldGroup: {
        backgroundColor: 'transparent',
    },
    field: {
        textAlign: "center",
        fontFamily: FONT_FAMILY,
        fontSize: "20px",
        fontWeight: "600",
    },
    wrapper: {
        selectors: {
            ".ms-Label": {
                fontFamily: FONT_FAMILY,
                fontWeight: "100",
                fontSize: "16px",
            },
            "::after": {
                border: 'none',
                borderBottom: `2px solid #4B56D2`
            },
            ":hover": {
                border: 'none',
                borderBottom: `2px solid #4B56D2`
            },
        }
    }
};

export const loginButtonStyle: Partial<IButtonStyles> = {
    root: {
        margin: "auto",
        width: '40%',
        fontFamily: FONT_FAMILY,
        color: PRIMARY_COLOR_WHITE,
        position: "relative",
        left: "30%",
        top: "10%",
        borderRadius: "4px",
        border: "0px",
        backgroundColor: '#4B56D2',
        fontSize: "16px",
        padding: "15px",
        boxShadow: "0px 8px 8px -4px rgb(0 0 0 / 0.2)"
    },
    rootHovered: {
        backgroundColor: "#472183",
        color: '#fdfdfd',
    }
};

export const secondaryTitleClassName: string = mergeStyles({
    color: PRIMARY_COLOR_WHITE,
    fontFamily: FONT_FAMILY,
    fontSize: "25px",
    position: "relative",
    top: "30%",
    left: "6vw"
});

export const textClassName: string = mergeStyles({
    color: BACKGROUND_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: "18px",
    position: "relative",
    top: "30%",
    left: "40%",
    fontWeight: '100'
});

export const registerButtonStyle: Partial<IButtonStyles> = {
    root: {
        margin: "auto",
        fontFamily: FONT_FAMILY,
        color: TEXT_PRIMARY_COLOR,
        position: "absolute",
        top: "50%",
        left: "34%",
        borderRadius: "4px",
        border: "0px",
        backgroundColor: BACKGROUND_COLOR,
        fontSize: "25px",
        padding: "15px",
        width: "35%",
        height: "6%",
        boxShadow: "0px 8px 8px -4px rgb(0 0 0 / 0.2)"
    },
    rootHovered: {
        backgroundColor: '#472183',
        color: BACKGROUND_COLOR,
    }
};

