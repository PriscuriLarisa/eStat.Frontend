import { IButtonStyles, LabelBase, mergeStyles } from "office-ui-fabric-react";
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
    width: '100%',
    height: '90%',
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

export const infoContainer: string = mergeStyles({
    width: '100%',
    height: '10%',
});

export const secondaryContainer: string = mergeStyles({
    width: '38.5%',
    height: '100%',
});
