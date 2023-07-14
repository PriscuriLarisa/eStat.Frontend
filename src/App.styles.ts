import { mergeStyles } from "@fluentui/react";
import { BORDER_COLOR, FONT_FAMILY } from "./library/constants";
import { IPanelStyles, ISpinnerStyles } from "office-ui-fabric-react";

export const mainContainerClassname = mergeStyles({
    width: '95.5vw',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '2vh 2vw 3.4vh 2vw',
    left: '4.5vw',
    position: 'absolute',
    backgroundColor: '#fdfdfd',
    border: `3px solid ${BORDER_COLOR}`,
});

export const spinnerClassname = mergeStyles({
    marginTop: '20%',
    fontFamily: FONT_FAMILY
});

export const spinnerStyles: Partial<ISpinnerStyles> = {
    label: {
        fontFamily: FONT_FAMILY
    },
    
};
