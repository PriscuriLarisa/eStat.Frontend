import { IButtonStyles, ISpinButton, ISpinButtonStyles, ITextFieldStyles, LabelBase, mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../../library/constants";
import { IDetailsListStyles, ILabelStyles } from "@fluentui/react";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    display: 'flex'
});

export const productDetailsContainerClassname = mergeStyles({
    width: '60%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    padding: '1%',
});

export const productTitleContainerClassname = mergeStyles({
    width: '100%',
    height: '14%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    padding: '1%',
});

export const productInfoContainerClassname = mergeStyles({
    width: '100%',
    height: '86%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    padding: '1%',
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: '5px',
});

export const productChartsContainerClassname = mergeStyles({
    marginTop: '15%',
    width: '100%',
    height: '89%',
    boxSizing: 'border-box',
});

export const createOffer = mergeStyles({
    marginTop: '10%',
    width: '100%',
    height: '20%',
    boxSizing: 'border-box',
});

export const imageClassName = mergeStyles({
    backgroundColor: '#fdfdfd',
    height: '70%',
    width: '31%',
    margin: 'auto',
    marginTop: '6%',
});

export const productCharacteristicsContainerClassname = mergeStyles({
    width: '100%',
    height: '60%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    padding: '1%',
    borderBottom: `1px solid ${BORDER_COLOR}`,
    display: 'flex'
});

export const characteristicsContainerClassname = mergeStyles({
    width: '100%',
    height: '40%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
    overflowX: 'scroll',
    overflowY: 'scroll',
    marginTop: '5px',
    fontFamily: FONT_FAMILY,
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

export const textClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY
});

export const labelStyles: Partial<ILabelStyles> = {
    root: {
        maxHeight: '100%',
        overflowY: 'scroll',
        width: '100%',
        fontWeight: '100',
        fontFamily: FONT_FAMILY,
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
    },
};

export const infoLabelStyles: Partial<ILabelStyles> = {
    root: {
        maxHeight: '100%',
        overflowY: 'scroll',
        width: '100%',
        fontWeight: '100',
        fontFamily: FONT_FAMILY,
        margin: 'auto',
        position: 'relative',
        left: '10%',
        fontSize: '16px',
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
    },
};

export const titleStyles: Partial<ILabelStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        fontSize: '25px'
    },

};

export const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        overflowY: 'scroll',
        height: '100%',
        position: 'relative',
        overflowX: 'hidden',
        selectors: {
            '::-webkit-scrollbar': {
                width: '6px',
            },

            '::-webkit-scrollbar-track': {
                background: 'transparent'
            },
            '::-webkit-scrollbar-thumb': {
                backgroundColor: `${BORDER_COLOR}`,
                borderRadius: '5px',
            }
        },
        '& [role=grid]': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            height: '100%',
        },
    },
    headerWrapper: {
        pointerEvents: 'none',
        selectors: {
            '.ms-DetailsHeader-cell': {
                borderBottom: '2px solid #7d7d7d',
                fontFamily: FONT_FAMILY,
                color: '#7d7d7d',
                fontSize: '20px',
            },
        }
    },
    contentWrapper: {
        flex: '1 1 auto',
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: FONT_FAMILY,
        selectors: {
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
};

export const addToCartButtonStyles: Partial<IButtonStyles> = {
    icon: {
        color: '#4B56D2',
        fontSize: '23px'
    },
    root: {
        fontSize: '20px',
    }
};

export const orderButtonStyles: Partial<IButtonStyles> = {

    root: {
        fontSize: '20px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '1s',
        borderRadius: '5px',
        left: '10%',
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
        transition: '1s',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};

export const spinnerClassname = mergeStyles({
    marginTop: '20%',
    fontFamily: FONT_FAMILY
});

export const chartsButtonStyles: Partial<IButtonStyles> = {

    root: {
        fontSize: '20px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '1s',
        borderRadius: '5px',
        left: '40%',
        marginTop: '5%',
        borderBottom: `2px solid ${BORDER_COLOR}`
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
        transition: '1s',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};

export const addOfferButtonStyle: Partial<IButtonStyles> = {

    root: {
        fontSize: '20px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        transition: '1s',
        borderRadius: '5px',
        left: '40%',
        borderBottom: `2px solid ${BORDER_COLOR}`
    },
    rootHovered: {
        backgroundImage: 'linear-gradient(90deg, rgba(109,67,175,1) 14%, rgba(55,55,180,1) 47%, rgba(128,134,195,1) 100%)',
        transition: '1s',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: 'transparent'
    }
};

export const infoContainer: string = mergeStyles({
    width: '100%',
    height: '10%',
});

export const secondaryContainer: string = mergeStyles({
    width: '38.5%',
    height: '100%',
});

export const calloutTitleClassname: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '16px',
    margin: '5%',
});

export const calloutBodyContainerClassname: string = mergeStyles({
    margin: '10%',
    marginBottom: '0px'
});

export const calloutContainerClassname: string  = mergeStyles({
    minHeight: '150px',
    maxWidth: '350px',
    width: '350px',
    textAlign: 'center',
    marginTop: '7%'
});

export const quantityDivClassname = mergeStyles({
    display: 'flex',
    marginLeft: '10%',
});

export const priceStyles: Partial<ITextFieldStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        backgroundColor: 'transparent',
        marginLeft: '10%',
        width: '51%',
        color: "#4B56D2",
    },
    wrapper: {
        backgroundColor: 'transparent',
    },
    fieldGroup: {
        backgroundColor: 'transparent',
        borderBottom: `1px solid grey`,
        selectors: {
            "::after" : {
                borderBottom: `2px solid black`
            }
        }
    },
    field: {
        backgroundColor: 'transparent',
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        fontWeight: '600',
        color: "#4B56D2",
    },
};


export const priceLabel = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '14px',
    fontWeight: '100'
});

export const quantitySpinButtonClassname: string  = mergeStyles({
    maxWidth: '30%',
});

export const quantitySpinButtonStyles: Partial<ISpinButtonStyles> = {
    root: {
        maxWidth: '100%',
        border: 'none',
        fontFamily: FONT_FAMILY,
        fontSize: '20px'
    },
    label: {
        fontFamily: FONT_FAMILY,
        fontWeight: '100',
    },
    labelWrapper: {
        minWidth: '40%',
        marginLeft: '10%'
    },
    spinButtonWrapper: {
        maxWidth: '20%',
        border: 'none',
        margin: 'auto',
        selectors: {
            "::after": {
                border: 'none',
                borderBottom: `1px solid #7d7d7d`
            }
        }
    },
    input: {
        fontSize: '16px',
        color: "#4B56D2",
        fontWeight: '600'
    }
};

export const addToCartCalloutButtonStyles: Partial<IButtonStyles> = {
    root: {
        margin: '5%',
        marginLeft: '60%',
        border: 'none',
        fontFamily: FONT_FAMILY,
        color: "#4B56D2",
        padding: 'none'
    },
    rootHovered: {
        fontFamily: FONT_FAMILY,
        color: "#4B56D2",
        fontSize: '16px',
        background: 'transparent',
        selectors: {
            '.ms-Button-label': {
                textDecoration: 'underline'
            }
        }
    },
    label: {
        fontFamily: FONT_FAMILY,
        color: "#4B56D2",
        fontSize: '16px'
    }
    
};