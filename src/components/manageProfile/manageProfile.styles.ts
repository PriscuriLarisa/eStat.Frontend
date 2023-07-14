import { IButtonStyles, IDatePickerStyles, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";
import { ITextFieldStyles } from "@fluentui/react";

export const profileInfoContainer = mergeStyles({
    height: '99%',
    width: '30%',
    borderRight: `2px solid ${BORDER_COLOR}`,
    boxSizing: 'border-box',
    padding: '2%',
    paddingLeft: '0px',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const datePickerStyle: Partial<IDatePickerStyles> = {
    root: {
        borderBottom: `2px solid ${BORDER_COLOR}`,
        backgroundColor: 'transparent'
    }
};

export const purchasesContainer = mergeStyles({
    height: '99%',
    width: '70%',
    boxSizing: 'border-box',
    padding: '1%',
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
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const mainContainer = mergeStyles({
    height: '90%',
    width: '100%',
    display: 'flex'
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const cellContainer = mergeStyles({
    height: '100%',
    width: '100%',
    padding: '10% 5%', 
    boxSizing: 'border-box',
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const fieldsContainer = mergeStyles({
    paddingTop: '5%',
    height: '50%',
    width: '100%',
    boxSizing: 'border-box',
    borderTop: `2px solid ${BORDER_COLOR}`,
    fontFamily: FONT_FAMILY,
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: '33% 33% 33%',
    marginBottom: '20%'
    //boxShadow: 'rgba(50, 50, 93, 0.25) 0px 3px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 2px -3px;',
});

export const iconClassname = mergeStyles({
    fontSize: '50px',
    color: '#4B56D2',
    marginLeft: '40%',
    marginTop: '2%',
    marginBottom: '10%',
    position: 'relative'
});

export const imageClassName = mergeStyles({
    backgroundColor: '#fdfdfd',
    top: '5%',
    marginTop: '6%',
    maxHeight: '90%',
    maxWidth: '90%',
    minHeight: '90%',
    minWidth: '90%',
    display: 'flex'
});

export const labelClassname = mergeStyles({
    fontFamily: FONT_FAMILY
});

export const labelThinClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    margin: 'none',
    padding: '0px',
    fontWeight: '100',
});

export const labelThinRightClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    margin: 'none',
    fontWeight: '100',
    padding: '0px',
    textAlign: 'right'
});

export const labelRightClassname = mergeStyles({
    fontFamily: FONT_FAMILY,
    margin: 'none',
    padding: '0px',
    textAlign: 'right',
    fontSize: '18px',
    color: '#4B56D2'
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '80%',
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
    },
    field: {
        fontFamily: FONT_FAMILY
    }
};

export const textFieldReadonlyStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '80%',
        fontFamily: FONT_FAMILY
    },
    fieldGroup: {
        border: 'none',
        backgroundColor: 'transparent',
        fontFamily: FONT_FAMILY,
        borderBottom: `2px solid ${BORDER_COLOR}`,
        "::after": {
            border: 'none',
            borderBottom: `2px solid ${BORDER_COLOR}`,
        },
        ":hover": {
            border: 'none',
            borderBottom: `2px solid ${BORDER_COLOR}`,
        },
    },
    field: {
        fontFamily: FONT_FAMILY
    }
};

export const textFieldLargeStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '200%',
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

export const buttonStyles:Partial<IButtonStyles> = {
    root: {
        height: '60%',
        width: '30%',
        color: "#fdfdfd",
        position: 'relative',
        backgroundColor: '#4B56D2',
        padding: '2.5%',
        border: 'none',
        borderRadius: '3px',
        fontFamily: FONT_FAMILY,
        margin: 'auto',
        left: '33%'
    },
    icon: {
        color: "#4B56D2",
        fontSize: '20px'
    },
    rootHovered: {
        backgroundColor: '#472183',
        color: "#fdfdfd",
    }
};