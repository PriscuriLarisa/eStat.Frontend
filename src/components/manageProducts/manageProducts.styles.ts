import { mergeStyles } from "@fluentui/react";
import { FONT_FAMILY } from "../../library/constants";

export const mainContainerClassname = mergeStyles({
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
    boxSizing: 'border-box',
});

export const contentContainerClassname = mergeStyles({
    width: '99%',
    height: '84%',
    backgroundColor: '#fdfdfd',
    border: '2px solid #f0f0f0',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gridTemplateRows: '50% 50%'
});

export const spinnerClassname = mergeStyles({
    marginTop: '20%',
    fontFamily: FONT_FAMILY
});
