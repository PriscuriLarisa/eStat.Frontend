import { mergeStyles } from "office-ui-fabric-react";
import { BORDER_COLOR, FONT_FAMILY } from "../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
});

export const spinnerClassname = mergeStyles({
    fontFamily: FONT_FAMILY
});

export const chartsContainer = mergeStyles({
    overflow: 'scroll',
    height: '88%',
    width: '100%',
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

export const rowContainer = mergeStyles({
    height: '45%',
    width: '100%',
    display: 'flex',
    marginBottom: '2%'
});

export const radialChartStyle = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
    fontFamily: FONT_FAMILY
};