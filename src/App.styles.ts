import { mergeStyles } from "@fluentui/react";
import { BORDER_COLOR } from "./library/constants";

export const mainContainerClassname = mergeStyles({
    width: '95.5vw',
    height: '100vh',
    boxSizing: 'border-box',
    padding: '3.4vh 2vw',
    left: '4.5vw',
    position: 'absolute',
    backgroundColor: '#fdfdfd',
    border: `3px solid ${BORDER_COLOR}`
});